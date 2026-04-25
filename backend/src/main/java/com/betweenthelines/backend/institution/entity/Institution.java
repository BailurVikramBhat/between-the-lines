package com.betweenthelines.backend.institution.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "institution", uniqueConstraints = {
        @UniqueConstraint(name = "UqInstitutionSlug", columnNames = {"slug"}),
        @UniqueConstraint(name="UqInstitutionLibrarianEmail", columnNames = {"librarian_email"})
})
public class Institution {
    @Id
    @Column(name="id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="slug", nullable = false)
    private String slug;

    @Column(name="librarian_email", nullable = false)
    private String librarianEmail;

    @Column(name="address")
    private String address;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected  Institution() {
    }

    public Institution(String name, String slug, String librarianEmail, String address) {
        this.name =name;
        this.slug=slug;
        this.librarianEmail=librarianEmail;
        this.address=address;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getLibrarianEmail() {
        return librarianEmail;
    }

    public void setLibrarianEmail(String librarianEmail) {
        this.librarianEmail = librarianEmail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
