package com.betweenthelines.backend.notification.event;

import com.betweenthelines.backend.notification.config.NotificationTextConfig;
import com.betweenthelines.backend.notification.entity.NotificationType;
import com.betweenthelines.backend.notification.service.NotificationService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class TemporaryPasswordConvertedNotificationListener {
    private final NotificationTextConfig textConfig;
    private final NotificationService notificationService;

    public TemporaryPasswordConvertedNotificationListener(final NotificationTextConfig textConfig, final NotificationService notificationService) {
        this.textConfig = textConfig;
        this.notificationService = notificationService;
    }

    @EventListener
    public void onTemporaryPasswordConverted(TemporaryPasswordConvertedEvent event) {
        if (!event.isTotpEnabled()) {
            NotificationTextConfig.Template detail = textConfig.getMessages().get("enable-totp");
            notificationService.createNotificationFor(event.getUserId(), NotificationType.ENABLE_TOTP, detail);
        }

    }
}
