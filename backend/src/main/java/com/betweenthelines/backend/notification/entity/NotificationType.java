package com.betweenthelines.backend.notification.entity;

public enum NotificationType {
    ENABLE_TOTP("Two-Factor Authentication");
    private final String label;
    NotificationType(String label) {
        this.label = label;
    }
    public String getLabel() {
        return this.label;
    }

}
