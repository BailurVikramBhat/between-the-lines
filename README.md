# Between the Lines

Between the Lines is a library management system in active Sprint 1 development. The current `sprint1/release` branch contains the authentication bootstrap, forced temporary-password update flow, and in-app notification support for enabling TOTP.

This README describes what is implemented in the repository today, not the full product roadmap.

For the broader MVP/product specification, see [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md).

## Current Functionality

### Backend

- Spring Boot API under `/api/v1`.
- PostgreSQL persistence with Flyway migrations.
- Seeded development institution and librarian account.
- JWT login for the seeded librarian.
- Authenticated current-user profile lookup.
- Authenticated temporary-password update flow.
- Notification persistence and APIs.
- Automatic TOTP reminder notification after a temporary password is converted to a permanent password when `totpEnabled` is false.
- Soft delete support for notifications.
- Mark-as-read support for notifications.

### Frontend

- React + TypeScript + Vite app.
- MUI-based login screen.
- JWT token storage in `localStorage`.
- Auth bootstrap through `/auth/me`.
- Public-route and protected-route guards.
- Forced password update dialog when the authenticated user has `isTempPassword=true`.
- Dashboard shell with top navigation, search field, help icon, avatar menu, and logout confirmation.
- Notification bell with unread count.
- Right-side notification drawer with loading, error, empty, and notification states.
- TOTP notification card with title, description, primary CTA, and dismiss action.
- Placeholder pages for request access and forgot password.

## Tech Stack

- Backend: Java 25, Spring Boot 4.0.6, Spring Security, Spring Data JPA, Flyway, PostgreSQL
- Frontend: React 19, TypeScript, Vite, MUI, Tailwind CSS
- Auth: JWT bearer token
- Database: PostgreSQL 17 via Docker Compose

## Local Setup

### 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts PostgreSQL on `localhost:5432` with:

- Database: `between_the_lines`
- User: `btl_user`
- Password: `btl_password`

### 2. Start the backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

On startup, Flyway applies the schema migrations and seeds the development institution/librarian.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The frontend expects:

```text
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Development Seed Data

The seed migration creates:

- Institution: `SDM's College`
- Tenant slug: `sdm-college`
- Librarian email: `librarian@sdm.edu.in`
- Librarian display name: `College Librarian`
- `totpEnabled`: `false`

The seeded librarian is not marked as a temporary-password user in the current migration:

```text
is_temp_password=false
```

To manually exercise the forced password-update and TOTP-notification flow, set that database field to `true` for the seeded librarian before logging in.

## Implemented API Endpoints

Base path:

```text
/api/v1
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | No | Login with email and password. Returns a JWT access token. |
| GET | `/auth/me` | Yes | Return the authenticated librarian profile. |
| POST | `/auth/update-password` | Yes | Convert a temporary password to a permanent password. |

### Notifications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/notifications` | Yes | List notifications for the authenticated librarian, newest first. |
| GET | `/notifications/unread-count` | Yes | Return unread notification count. |
| POST | `/notifications/{notificationId}/read` | Yes | Mark a notification as read. |
| DELETE | `/notifications/{notificationId}` | Yes | Soft-delete a notification. |

## Frontend Routes

| Route | Status | Description |
|---|---|---|
| `/` | Implemented | Redirects to `/login`. |
| `/login` | Implemented | Login screen. Redirects authenticated users to `/dashboard`. |
| `/dashboard` | Implemented | Protected dashboard shell. Shows forced password dialog when required. |
| `/request-access` | Placeholder | Static placeholder page. |
| `/forgot-password` | Placeholder | Static placeholder page. |
| `/settings/security` | Not implemented | Notification CTA target reserved for the future Settings/TOTP ticket. |

## Notification Flow

1. A librarian logs in.
2. The frontend fetches `/auth/me`.
3. If `isTempPassword=true`, the dashboard shows the forced password update dialog.
4. The librarian submits a new permanent password through `/auth/update-password`.
5. The backend updates the password and clears `is_temp_password`.
6. The backend publishes a temporary-password-converted event.
7. If `totpEnabled=false`, the notification listener creates an `ENABLE_TOTP` notification.
8. The dashboard notification bell shows the unread count from `/notifications/unread-count`.
9. The notification drawer fetches `/notifications`.
10. Dismiss marks the notification as read through `/notifications/{notificationId}/read`.
11. The primary CTA navigates to `/settings/security`, which is intentionally deferred to the Settings/TOTP work.

## Database Migrations

Current Flyway migrations:

| Migration | Description |
|---|---|
| `V1__create_institution_table.sql` | Creates the `institution` table. |
| `V2__create_librarian_table.sql` | Creates the `librarian` table. |
| `V3__seed_dev_institution_and_librarian.sql` | Seeds the development institution and librarian. |
| `V4__create_notification_table.sql` | Creates the `notifications` table and indexes. |

## Backend Structure

```text
backend/src/main/java/com/betweenthelines/backend/
├── auth/
│   ├── controller/
│   ├── dto/
│   ├── security/
│   └── service/
├── common/
│   ├── config/
│   ├── dto/
│   ├── exception/
│   └── utils/
├── institution/
│   ├── entity/
│   └── repository/
├── librarian/
│   ├── entity/
│   └── repository/
└── notification/
    ├── config/
    ├── controller/
    ├── dto/
    ├── entity/
    ├── event/
    ├── repository/
    └── service/
```

## Frontend Structure

```text
frontend/src/
├── assets/
├── components/static/
├── context/
├── hooks/
├── pages/
├── services/
├── styles/
├── theme/
├── types/
└── utils/
```

## Not Implemented Yet

- Settings/TOTP setup page.
- Request access workflow.
- Forgot password workflow.
- Refresh-token flow.
- Logout API/session invalidation.
- Book, catalog, member, loan, fine, report, and email workflows.
- Public catalog browsing.
- TOTP verification for sensitive actions.
- Tests for notification and auth flows.

## Verification Commands

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
npm run build
```

## Conflict Check

Before this README update, the working tree was on `sprint1/release`, and `git ls-files -u` returned no unmerged paths. No active merge conflicts were present.
