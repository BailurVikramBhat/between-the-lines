package com.betweenthelines.backend.notification.service;

import com.betweenthelines.backend.common.exception.BadRequestException;
import com.betweenthelines.backend.notification.config.NotificationTextConfig;
import com.betweenthelines.backend.notification.dto.NotificationResponse;
import com.betweenthelines.backend.notification.dto.UnreadNotificationCountResponse;
import com.betweenthelines.backend.notification.entity.Notification;
import com.betweenthelines.backend.notification.entity.NotificationType;
import com.betweenthelines.backend.notification.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(final NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationResponse> allNotificationsOf(final UUID recipientId) {
        return notificationRepository.findByRecipientIdAndDeletedAtIsNullOrderByCreatedAtDesc(recipientId).stream().map(this::toResponse).toList();
    }

    public UnreadNotificationCountResponse countUnreadNotificationsOf(final UUID recipientId) {
        return new UnreadNotificationCountResponse(notificationRepository.countByRecipientIdAndReadAtIsNullAndDeletedAtIsNull(recipientId));
    }

    @Transactional
    public NotificationResponse markNotificationOfUserAsRead(final UUID recipientId, final UUID notificationId) {
        Notification notification = getNotificationFor(recipientId, notificationId);
        if (notification.getReadAt() == null) {
            notification.setReadAt(LocalDateTime.now());
        }
        notificationRepository.save(notification);
        return toResponse(notification);
    }

    @Transactional
    public void deleteNotificationOfUser(final UUID recipientId, final UUID notificationId) {
        Notification notification = getNotificationFor(recipientId, notificationId);
        if (notification.getDeletedAt() == null) {
            notification.setDeletedAt(LocalDateTime.now());
        }
        notificationRepository.save(notification);
    }

    private NotificationResponse toResponse(final Notification notification) {
        return new NotificationResponse(notification.getId(), notification.getType().getLabel(), notification.getTitle(), notification.getDescription(), notification.getPrimaryActionLabel(), notification.getPrimaryActionUrl(), notification.getReadAt() != null, notification.getCreatedAt());
    }

    private Notification getNotificationFor(final UUID recipientId, final UUID notificationId) {
        return notificationRepository.findByIdAndRecipientIdAndDeletedAtIsNull(notificationId, recipientId).orElseThrow(() -> new BadRequestException("Notification not found for the user"));
    }

    @Transactional
    public void createNotificationFor(final UUID recipientId, final NotificationType type, final NotificationTextConfig.Template details) {
        if (!notificationRepository.existsByRecipientIdAndTypeAndReadAtIsNullAndDeletedAtIsNull(recipientId, type)) {
            Notification notification = new Notification(recipientId, type, details.getTitle(), details.getDescription(), details.getPrimaryActionLabel(), details.getPrimaryActionUrl());
            notificationRepository.save(notification);
        }

    }
}
