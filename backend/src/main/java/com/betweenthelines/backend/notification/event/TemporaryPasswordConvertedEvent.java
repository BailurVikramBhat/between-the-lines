package com.betweenthelines.backend.notification.event;

import java.time.Instant;
import java.util.UUID;

public class TemporaryPasswordConvertedEvent {
    private final UUID userId;
    private final boolean totpEnabled;
    private final Instant occurredAt;

    public TemporaryPasswordConvertedEvent(UUID userId, boolean totpEnabled) {
        this.userId = userId;
        this.totpEnabled = totpEnabled;
        this.occurredAt = Instant.now();
    }

    public boolean isTotpEnabled() {
        return totpEnabled;
    }

    public UUID getUserId() {
        return userId;
    }
    public Instant getOccurredAt() {
        return occurredAt;
    }
}
