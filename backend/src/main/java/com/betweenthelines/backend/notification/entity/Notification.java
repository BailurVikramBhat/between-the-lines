package com.betweenthelines.backend.notification.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "recipient_id", nullable = false)
    private UUID recipientId;
    @Column(name = "notification_type", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    @Column(name = "title", nullable = false, length = 120)
    private String title;
    @Column(name = "description", nullable = false, length = 1000)
    private String description;
    @Column(name = "primary_action_label", length = 80)
    private String primaryActionLabel;
    @Column(name = "primary_action_url")
    private String primaryActionUrl;
    @Column(name = "read_at")
    private LocalDateTime readAt;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public Notification(UUID recipientId, NotificationType type, String title, String description, String primaryActionLabel, String primaryActionUrl) {
        this.recipientId = recipientId;
        this.type = type;
        this.title = title;
        this.description = description;
        this.primaryActionLabel = primaryActionLabel;
        this.primaryActionUrl = primaryActionUrl;
    }

    protected Notification() {

    }

    public UUID getId() {
        return id;
    }

    public UUID getRecipientId() {
        return recipientId;
    }

    public NotificationType getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getPrimaryActionLabel() {
        return primaryActionLabel;
    }

    public String getPrimaryActionUrl() {
        return primaryActionUrl;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrimaryActionLabel(String primaryActionLabel) {
        this.primaryActionLabel = primaryActionLabel;
    }

    public void setPrimaryActionUrl(String primaryActionUrl) {
        this.primaryActionUrl = primaryActionUrl;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}
