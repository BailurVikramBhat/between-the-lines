# Between the Lines — Project Specification (MVP)

Version 1.0 · April 2026

---

## Current Implementation Notes

- The current login page is email-only. Librarian ID is no longer accepted on the frontend login form.
- The login screen supports browser autofill for email and current password.
- The frontend implementation is currently MUI-based for the login page.
- Request-access and registration flows remain separate from the login flow.

---

## Backend Local Setup

1. Start PostgreSQL with Docker:

```bash
docker compose up -d
```

2. Start the Spring Boot backend:

```bash
cd backend
mvn spring-boot:run
```

3. On startup:
- Spring Boot connects to PostgreSQL at `localhost:5432`
- Flyway applies the schema migrations
- One development institution and one librarian are seeded

4. Development login credentials:
- Email: `librarian@stjosephs.edu.in`
- Password: `Password@123`

---

## 1. System Overview

Between the Lines is a multi-tenant library management system deployed as a single instance serving all client institutions (colleges, public libraries). Each institution (tenant) operates within an isolated data boundary under one shared deployment.

**Tech Stack**

- Backend: Java 25, Spring Boot 4.0.6, PostgreSQL
- Frontend: React, TypeScript, MUI, Tailwind CSS
- Auth: JWT + Email OTP + TOTP (Google Authenticator)

**Core Principles**

- One deployment, many institutions
- One librarian account per institution (shared credentials allowed, no concurrent session restrictions)
- Anonymous public catalog access (no login required to browse)
- Every physical book copy is uniquely identifiable

---

## 2. Tenancy Model

Each institution is a tenant. All data is scoped to a `tenant_id`. The librarian email is seeded into the database during onboarding (manual setup by the deployment team).

```
Institution
+-- id (UUID)
+-- name
+-- slug (URL-friendly identifier, e.g., "st-josephs-college")
+-- librarian_email (seeded, e.g., "librarian@stjosephs.edu.in")
+-- address
+-- created_at
+-- updated_at
```

Tenant resolution: subdomain-based (`stjosephs.betweenthelines.com`) or path-based (`/t/stjosephs/`). Decision deferred to implementation, but the data model supports both.

---

## 3. Authentication & Authorization

### 3.1 Roles

| Role | Auth Required | Capabilities |
|---|---|---|
| Anonymous | No | Browse catalog, search books, view availability |
| Librarian | Yes | Full CRUD on books, loans, members, reports, settings |

### 3.2 Librarian Registration Flow

This is a one-time onboarding process.

```
Step 1: Librarian enters email on registration page
Step 2: Backend checks if email matches the seeded librarian_email for any tenant
        ? No match: "Email not recognized" error
        ? Match: Send 6-digit OTP to that email (expires in 10 minutes)
Step 3: Librarian enters OTP
        ? Invalid/expired: error with resend option
        ? Valid: Backend generates a temporary password, sends it to the same email
Step 4: Librarian enters the temporary password on login screen
        ? Backend validates and forces password change screen
Step 5: Librarian sets permanent password (min 8 chars, 1 uppercase, 1 number, 1 special)
Step 6: Redirect to login page. Librarian logs in with new credentials.
```

### 3.3 Login Flow

Standard email + password login. Returns a JWT access token (short-lived, 15 min) and a refresh token (7 days, stored in httpOnly cookie).

### 3.4 TOTP (Profile Updates Only — MVP)

When a librarian attempts to update their profile (email, password, name), they must verify via TOTP (Google Authenticator / Authy). TOTP setup happens during first profile visit post-registration: QR code is displayed, librarian scans and confirms with a code. Future: TOTP will extend to login as well.

### 3.5 Password Reset

Standard forgot-password flow: enter email ? OTP sent ? verify OTP ? set new password. Same validation rules as registration.

---

## 4. Data Model

### 4.1 Book (title-level metadata)

Represents a book title, not a physical copy.

```
Book
+-- id (UUID)
+-- tenant_id (FK ? Institution)
+-- title
+-- isbn (nullable, not all books have ISBN)
+-- publisher
+-- edition (nullable)
+-- year_published
+-- genre (ENUM: FICTION, NON_FICTION, SCIENCE, TECHNOLOGY, HISTORY,
¦          PHILOSOPHY, BIOGRAPHY, REFERENCE, PERIODICAL, OTHER)
+-- language (default: "English")
+-- page_count (nullable)
+-- cover_image_url (nullable)
+-- price (BigDecimal — used for compensation calculation)
+-- total_copies (derived: count of BookCopy where status ? REMOVED)
+-- available_copies (derived: count of BookCopy where status = AVAILABLE)
+-- created_at
+-- updated_at
```

### 4.2 BookCopy (physical copy)

Every physical book in the library. Two copies of the same title = two BookCopy rows.

```
BookCopy
+-- id (UUID)
+-- book_id (FK ? Book)
+-- tenant_id (FK ? Institution)
+-- internal_label (unique per tenant, e.g., "BTL-00001")
¦   +-- Auto-generated sequential label, globally unique within the tenant
+-- location_floor (String, e.g., "2")
+-- location_aisle (String, e.g., "A")
+-- location_rack (String, e.g., "3")
+-- location_shelf (String, e.g., "12")
+-- condition (ENUM: NEW, GOOD, FAIR, POOR, DAMAGED)
+-- status (ENUM: AVAILABLE, ON_LOAN, RESERVED, REMOVED)
+-- acquired_date
+-- created_at
+-- updated_at
```

**Label format:** `BTL-00001`, `BTL-00002`, etc. Auto-incremented per tenant. Labels are printed as small sticker-ready outputs (barcode + human-readable ID). One label per physical copy.

### 4.3 Member

A person who borrows books. Created by the librarian. Not a system user (no login).

```
Member
+-- id (UUID)
+-- tenant_id (FK ? Institution)
+-- full_name
+-- email (unique per tenant, verified via OTP)
+-- email_verified (boolean, default false)
+-- phone (nullable)
+-- institution_id_number (student/faculty ID, nullable)
+-- id_type (ENUM: STUDENT, FACULTY, STAFF, EXTERNAL)
+-- status (ENUM: ACTIVE, SUSPENDED, BANNED)
+-- suspension_count (int, default 0)
¦   +-- When this reaches 3, status auto-transitions to BANNED
+-- active_loans (derived: count of Loan where status = ACTIVE)
+-- created_at
+-- updated_at
```

**Email verification flow:** When librarian creates a member, an OTP is sent to the member's email immediately. The member reads the OTP to the librarian, who enters it. Only verified members can have books loaned to them.

**Status rules:**

- SUSPENDED: Temporary. Member cannot borrow new books. Existing loans remain active. Librarian can unsuspend.
- BANNED: Permanent. Triggered automatically when `suspension_count` reaches 3. All outstanding fines must be settled before ban is finalized. Same email and institution ID cannot be reused for a new account. Existing loans must be returned.

### 4.4 Loan

Tracks a book copy being borrowed by a member.

```
Loan
+-- id (UUID)
+-- tenant_id (FK ? Institution)
+-- book_copy_id (FK ? BookCopy)
+-- member_id (FK ? Member)
+-- checked_out_at (timestamp — timer starts here)
+-- due_at (checked_out_at + 72 hours)
+-- returned_at (nullable — null means still on loan)
+-- status (ENUM: ACTIVE, RETURNED, OVERDUE, REJECTED)
¦   +-- REJECTED: Book returned in unacceptable condition
+-- condition_at_checkout (ENUM: same as BookCopy.condition)
+-- condition_at_return (ENUM: nullable, set when returned)
+-- created_at
+-- updated_at
```

**Business rules:**

- A member can have a maximum of 3 ACTIVE loans at any time.
- When a loan is created, BookCopy.status transitions from AVAILABLE to ON_LOAN.
- When a loan is returned, BookCopy.status transitions back to AVAILABLE (or to DAMAGED if condition degraded).
- Overdue detection: a scheduled job runs periodically and transitions ACTIVE loans past `due_at` to OVERDUE status.

### 4.5 Fine

Tracks monetary charges for overdue or damaged books.

```
Fine
+-- id (UUID)
+-- tenant_id (FK ? Institution)
+-- loan_id (FK ? Loan)
+-- member_id (FK ? Member)
+-- type (ENUM: OVERDUE, DAMAGE, FULL_REPLACEMENT)
+-- amount (BigDecimal)
¦   +-- OVERDUE: $1.00 × number of days past due_at
¦   +-- DAMAGE: partial book price (set manually by librarian)
¦   +-- FULL_REPLACEMENT: Book.price
+-- status (ENUM: UNPAID, PAID)
+-- paid_at (nullable)
+-- notes (nullable — librarian can add context)
+-- created_at
+-- updated_at
```

Cash is collected in person by the librarian. The system only tracks paid/unpaid status, not payment method.

### 4.6 Librarian

```
Librarian
+-- id (UUID)
+-- tenant_id (FK ? Institution)
+-- email (matches Institution.librarian_email)
+-- password_hash
+-- full_name
+-- is_temp_password (boolean)
+-- totp_secret (nullable — set on first TOTP setup)
+-- totp_enabled (boolean, default false)
+-- created_at
+-- updated_at
```

---

## 5. API Design (REST)

Base path: `/api/v1`

### 5.1 Auth

```
POST   /auth/register              Register (email check + send OTP)
POST   /auth/verify-otp            Verify OTP (returns temp password via email)
POST   /auth/login                 Login (email + password ? JWT)
POST   /auth/refresh               Refresh access token
POST   /auth/forgot-password       Send reset OTP
POST   /auth/reset-password        Set new password with OTP
POST   /auth/change-password       Change from temp ? permanent password (authed)
POST   /auth/logout                Invalidate refresh token
```

### 5.2 Librarian Profile

```
GET    /profile                    Get librarian profile
PUT    /profile                    Update profile (requires TOTP verification)
POST   /profile/totp/setup         Generate TOTP QR code
POST   /profile/totp/verify        Confirm TOTP setup with code
```

### 5.3 Books

```
GET    /books                      List/search books (paginated, public)
GET    /books/:id                  Book details + copies + loan history (public)
POST   /books                      Create book (authed)
PUT    /books/:id                  Update book metadata (authed)
DELETE /books/:id                  Soft-delete book (authed)
```

**Search query params:** `?q=&genre=&language=&year=&available=true&page=0&size=20&sort=title,asc`

### 5.4 Book Copies

```
POST   /books/:bookId/copies              Add copies (authed)
PUT    /books/:bookId/copies/:copyId      Update copy (location, condition) (authed)
DELETE /books/:bookId/copies/:copyId      Remove copy from circulation (authed)
GET    /books/:bookId/copies/:copyId/label Generate printable label (authed)
POST   /books/:bookId/copies/labels       Batch generate labels for selected copies (authed)
```

### 5.5 Members

```
GET    /members                    List/search members (authed, paginated)
GET    /members/:id                Member details + active loans + fine history (authed)
POST   /members                    Create member (authed, triggers OTP to member email)
POST   /members/:id/verify-email   Verify member email with OTP (authed)
PUT    /members/:id                Update member details (authed)
POST   /members/:id/suspend        Suspend member (authed)
POST   /members/:id/unsuspend      Unsuspend member (authed)
POST   /members/:id/ban            Ban member (authed, requires all fines settled)
```

### 5.6 Loans

```
GET    /loans                      List loans (authed, filterable by status/member/book)
GET    /loans/:id                  Loan details (authed)
POST   /loans                      Create loan (authed)
POST   /loans/:id/return           Return book (authed, includes condition assessment)
POST   /loans/:id/reject           Reject return (authed, triggers compensation fine)
```

### 5.7 Fines

```
GET    /fines                      List fines (authed, filterable by status/member)
POST   /fines/:id/mark-paid        Mark fine as paid (authed)
```

### 5.8 Reports

```
GET    /reports/daily-summary      Today's loans, returns, overdue count, fines collected
GET    /reports/overdue            All currently overdue loans with member contact info
GET    /reports/popular-books      Most borrowed books (configurable time range)
GET    /reports/member-activity    Member borrowing stats (configurable time range)
GET    /reports/fine-summary       Fines issued vs collected (configurable time range)
```

### 5.9 Catalog (Public, No Auth)

```
GET    /catalog/books              Search/browse books (paginated)
GET    /catalog/books/:id          Book details + availability count (no member/loan data)
```

---

## 6. Scheduled Jobs

| Job | Schedule | Description |
|---|---|---|
| Overdue checker | Every hour | Transitions ACTIVE loans past `due_at` to OVERDUE, creates/updates OVERDUE fine |
| Reminder emails | Daily at 8 AM (tenant timezone) | Sends reminder to members whose loan is due within 24 hours |
| Fine calculator | Every hour (with overdue checker) | Recalculates OVERDUE fine amount based on current days overdue |

---

## 7. Email Notifications

| Trigger | Recipient | Content |
|---|---|---|
| Librarian registration OTP | Librarian | 6-digit OTP, 10 min expiry |
| Temporary password | Librarian | Auto-generated password |
| Password reset OTP | Librarian | 6-digit OTP, 10 min expiry |
| Member email verification | Member | 6-digit OTP |
| Loan created | Member | Book title, due date/time, library contact |
| Due in 24 hours (auto) | Member | Reminder with book title and return deadline |
| Overdue notice | Member | Book title, days overdue, fine amount so far |
| Suspension notice | Member | Reason, instruction to return pending items |
| Ban notice | Member | Permanent ban, settle fines, return all books |
| Manual reminder (button) | Member | Librarian-triggered, customizable message |

---

## 8. Frontend Pages

### 8.1 Public (No Auth)

| Page | Route | Description |
|---|---|---|
| Catalog | `/catalog` | Search and browse books, see availability count and location |
| Book Detail (public) | `/catalog/:id` | Full book metadata, number of copies available (no loan data) |

### 8.2 Auth

| Page | Route | Description |
|---|---|---|
| Register | `/register` | Email entry ? OTP verification |
| Login | `/login` | Email + password |
| Change Password | `/change-password` | Temp ? permanent password (forced redirect) |

### 8.3 Librarian Dashboard (Authed)

All behind sidebar navigation.

| Page | Route | Description |
|---|---|---|
| Dashboard | `/dashboard` | Today's summary: active loans, overdue count, books available, recent activity |
| Books | `/books` | Table of all books with search, filter by genre/language/availability, add book button |
| Book Detail | `/books/:id` | Full metadata, editable. Copies table below: label, location, condition, status. Add copies, print labels. Loan history tab. |
| Members | `/members` | Table of all members. Status badges (Active/Suspended/Banned). Search by name/email/ID. |
| Member Detail | `/members/:id` | Profile info, active loans, fine history, suspend/unsuspend/ban buttons, contact button |
| Loans | `/loans` | Table: all loans, filterable by status (Active/Overdue/Returned/Rejected). Due date countdown visible. "Send Reminder" button on rows due within 24 hours. |
| Create Loan | `/loans/new` | Select member (search) ? select book (search) ? confirm. Validates: member verified, not suspended/banned, under 3 loan cap, copy available. |
| Fines | `/fines` | Table: all fines, filterable by paid/unpaid. Mark paid button. |
| Reports | `/reports` | Sub-tabs for each report type. Date range pickers where applicable. |
| Profile | `/profile` | Librarian details, TOTP setup, password change. |

### 8.4 Key UI Components

**Book Detail Page — Copies Table Columns:**
Internal Label | Floor | Aisle | Rack | Shelf | Condition | Status | Actions (Edit, Print Label)

**Loans Table Columns:**
Book Title | Copy Label | Member Name | Checked Out | Due At | Time Remaining/Overdue By | Status | Actions (Return, Reject, Send Reminder)

The "Send Reminder" action is visible when the loan is due within 24 hours or is overdue.

**Member Detail — Active Loans Table:**
Book Title | Copy Label | Checked Out | Due At | Status | Fine (if any) | Contact Member

---

## 9. Label Printing

Each physical book copy gets a printed label containing:

- Internal label ID (e.g., `BTL-00001`)
- Barcode (Code 128 format, encoding the internal label ID)
- Book title (truncated to fit)
- Institution name

**Label dimensions:** 50mm × 25mm (standard small label printer size). Output format: PDF, laid out in a grid (3 columns × 10 rows per A4 page) for bulk printing, or single label for individual prints.

---

## 10. MVP Scope Summary

**In scope:**

- Multi-tenant data isolation
- Librarian registration (OTP ? temp password ? permanent password)
- JWT auth with refresh tokens
- TOTP for profile updates
- Full book CRUD with copy-level management
- Location tracking (floor/aisle/rack/shelf)
- Unique label generation and printing
- Member registration with email OTP verification
- Loan management (create, return, reject)
- 3-book cap per member
- 72-hour loan period with $1/day overdue fines
- Fine tracking (paid/unpaid)
- Suspend/unsuspend/ban (3 strikes auto-ban)
- Condition tracking at checkout and return
- Email notifications (OTP, loan, reminders, overdue, suspension, ban)
- Public catalog browsing (anonymous)
- 5 basic reports
- Scheduled overdue checking and reminder emails

**Out of scope (future):**

- Barcode scanning at checkout
- Author management as separate entity
- TOTP on login
- Reservation system (hold books)
- Multi-librarian role separation
- Payment gateway integration
- Mobile app
- Book cover image upload
- Advanced analytics
- Audit log

---

## 11. Project Structure

### Backend (Spring Boot)

```
src/main/java/com/btl/
+-- config/
¦   +-- SecurityConfig.java
¦   +-- JwtConfig.java
¦   +-- TenantConfig.java
+-- auth/
¦   +-- controller/
¦   +-- service/
¦   +-- dto/
¦   +-- entity/ (Librarian, OtpToken, RefreshToken)
+-- book/
¦   +-- controller/
¦   +-- service/
¦   +-- dto/
¦   +-- entity/ (Book, BookCopy)
¦   +-- repository/
+-- member/
¦   +-- controller/
¦   +-- service/
¦   +-- dto/
¦   +-- entity/ (Member)
¦   +-- repository/
+-- loan/
¦   +-- controller/
¦   +-- service/
¦   +-- dto/
¦   +-- entity/ (Loan)
¦   +-- repository/
+-- fine/
¦   +-- controller/
¦   +-- service/
¦   +-- dto/
¦   +-- entity/ (Fine)
¦   +-- repository/
+-- report/
¦   +-- controller/
¦   +-- service/
+-- notification/
¦   +-- service/ (EmailService)
¦   +-- template/
+-- scheduler/
¦   +-- OverdueCheckScheduler.java
¦   +-- ReminderScheduler.java
¦   +-- FineCalculatorScheduler.java
+-- catalog/
¦   +-- controller/ (public endpoints)
¦   +-- service/
+-- tenant/
¦   +-- entity/ (Institution)
¦   +-- resolver/ (TenantResolver)
¦   +-- repository/
+-- common/
    +-- exception/
    +-- dto/ (PageResponse, ErrorResponse)
    +-- util/
```

### Frontend (React)

```
src/
+-- theme/
¦   +-- theme.ts
+-- types/
¦   +-- auth.ts
¦   +-- book.ts
¦   +-- member.ts
¦   +-- loan.ts
¦   +-- fine.ts
+-- services/
¦   +-- authService.ts
¦   +-- bookService.ts
¦   +-- memberService.ts
¦   +-- loanService.ts
¦   +-- fineService.ts
¦   +-- reportService.ts
+-- hooks/
¦   +-- useLogin.ts
¦   +-- useRegister.ts
¦   +-- useBooks.ts
¦   +-- useMembers.ts
¦   +-- useLoans.ts
¦   +-- useFines.ts
+-- pages/
¦   +-- auth/
¦   ¦   +-- LoginPage.tsx
¦   ¦   +-- RegisterPage.tsx
¦   ¦   +-- ChangePasswordPage.tsx
¦   +-- catalog/
¦   ¦   +-- CatalogPage.tsx
¦   ¦   +-- CatalogBookDetailPage.tsx
¦   +-- dashboard/
¦   ¦   +-- DashboardPage.tsx
¦   +-- books/
¦   ¦   +-- BooksPage.tsx
¦   ¦   +-- BookDetailPage.tsx
¦   +-- members/
¦   ¦   +-- MembersPage.tsx
¦   ¦   +-- MemberDetailPage.tsx
¦   +-- loans/
¦   ¦   +-- LoansPage.tsx
¦   ¦   +-- CreateLoanPage.tsx
¦   +-- fines/
¦   ¦   +-- FinesPage.tsx
¦   +-- reports/
¦   ¦   +-- ReportsPage.tsx
¦   +-- profile/
¦       +-- ProfilePage.tsx
+-- components/
¦   +-- layout/
¦   ¦   +-- Sidebar.tsx
¦   ¦   +-- AppHeader.tsx
¦   ¦   +-- DashboardLayout.tsx
¦   +-- common/
¦   ¦   +-- StatusChip.tsx
¦   ¦   +-- SearchBar.tsx
¦   ¦   +-- ConfirmDialog.tsx
¦   ¦   +-- DataTable.tsx
¦   +-- book/
¦       +-- CopiesTable.tsx
¦       +-- LoanHistoryTable.tsx
+-- App.tsx
+-- main.tsx
```

---

## 12. Database Migration Order

Flyway migrations in sequence:

```
V1__create_institution_table.sql
V2__create_librarian_table.sql
V3__create_book_table.sql
V4__create_book_copy_table.sql
V5__create_member_table.sql
V6__create_loan_table.sql
V7__create_fine_table.sql
V8__create_otp_token_table.sql
V9__create_refresh_token_table.sql
V10__seed_institution_and_librarian_email.sql
```
