package com.betweenthelines.backend.notification.controller;

import com.betweenthelines.backend.common.dto.ApiResponse;
import com.betweenthelines.backend.librarian.entity.Librarian;
import com.betweenthelines.backend.notification.dto.NotificationResponse;
import com.betweenthelines.backend.notification.dto.UnreadNotificationCountResponse;
import com.betweenthelines.backend.notification.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getAllNotifications(@AuthenticationPrincipal Librarian librarian) {
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("All notifications fetched successfully", notificationService.allNotificationsOf(librarian.getId())));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<UnreadNotificationCountResponse>> getUnreadCount(@AuthenticationPrincipal Librarian librarian) {
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("Unread notification count fetched successfully", notificationService.countUnreadNotificationsOf(librarian.getId())));
    }

    @PostMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<Void>> markNotificationAsRead(@AuthenticationPrincipal Librarian librarian, @PathVariable UUID notificationId) {
        notificationService.markNotificationOfUserAsRead(librarian.getId(), notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("Notification marked as read successfully"));
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<ApiResponse<Void>> markNotificationAsDeleted(@AuthenticationPrincipal Librarian librarian, @PathVariable UUID notificationId) {
        notificationService.deleteNotificationOfUser(librarian.getId(), notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("Notification deleted successfully"));
    }

}
