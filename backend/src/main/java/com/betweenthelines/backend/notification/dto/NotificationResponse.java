package com.betweenthelines.backend.notification.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record NotificationResponse(UUID id, String categoryLabel, String title, String description,
                                   String primaryActionLabel, String primaryActionUrl, boolean read,
                                   LocalDateTime createdAt) {
}
