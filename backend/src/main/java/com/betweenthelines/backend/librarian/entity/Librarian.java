package com.betweenthelines.backend.librarian.entity;

import com.betweenthelines.backend.institution.entity.Institution;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "librarian", uniqueConstraints = {
        @UniqueConstraint(name = "UqLibrarianTenantEmail", columnNames = {"tenant_id", "email"})
})
public class Librarian {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Institution institution;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "is_temp_password", nullable = false)
    private Boolean isTempPassword;

    @Column(name = "totp_secret")
    private String totpSecret;

    @Column(name = "totp_enabled", nullable = false)
    private Boolean totpEnabled;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected Librarian() {
    }

    public Librarian(Institution institution, String email, String passwordHash, String fullName, Boolean isTempPassword, String totpSecret, Boolean totpEnabled) {
        this.institution = institution;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.isTempPassword = isTempPassword;
        this.totpSecret = totpSecret;
        this.totpEnabled = totpEnabled;
    }

    public UUID getId() {
        return id;
    }

    public Institution getInstitution() {
        return institution;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getFullName() {
        return fullName;
    }

    public Boolean getTempPassword() {
        return isTempPassword;
    }

    public String getTotpSecret() {
        return totpSecret;
    }

    public Boolean getTotpEnabled() {
        return totpEnabled;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setTempPassword(Boolean tempPassword) {
        isTempPassword = tempPassword;
    }

    public void setTotpSecret(String totpSecret) {
        this.totpSecret = totpSecret;
    }

    public void setTotpEnabled(Boolean totpEnabled) {
        this.totpEnabled = totpEnabled;
    }
}
