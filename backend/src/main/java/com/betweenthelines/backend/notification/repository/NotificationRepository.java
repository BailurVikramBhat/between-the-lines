package com.betweenthelines.backend.notification.repository;

import com.betweenthelines.backend.notification.entity.Notification;
import com.betweenthelines.backend.notification.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findByRecipientIdAndDeletedAtIsNullOrderByCreatedAtDesc(UUID recipientId);
    long countByRecipientIdAndReadAtIsNullAndDeletedAtIsNull(UUID recipientId);
    Optional<Notification> findByIdAndRecipientIdAndDeletedAtIsNull(UUID id, UUID recipientId);
    boolean existsByRecipientIdAndTypeAndReadAtIsNullAndDeletedAtIsNull(UUID recipientId, NotificationType type);

}
