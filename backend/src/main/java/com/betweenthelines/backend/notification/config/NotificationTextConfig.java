package com.betweenthelines.backend.notification.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "app.notification")
public class NotificationTextConfig {
    public static class Template {
        private String title;
        private String description;
        private String primaryActionLabel;
        private String primaryActionUrl;

        public Template() {

        }

        public Template(String title, String description, String primaryActionLabel, String primaryActionUrl) {
            this.title = title;
            this.description = description;
            this.primaryActionLabel = primaryActionLabel;
            this.primaryActionUrl = primaryActionUrl;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getPrimaryActionLabel() {
            return primaryActionLabel;
        }

        public void setPrimaryActionLabel(String primaryActionLabel) {
            this.primaryActionLabel = primaryActionLabel;
        }

        public String getPrimaryActionUrl() {
            return primaryActionUrl;
        }

        public void setPrimaryActionUrl(String primaryActionUrl) {
            this.primaryActionUrl = primaryActionUrl;
        }
    }
    private Map<String, Template> messages;

    public Map<String, Template> getMessages() {
        return messages;
    }

    public void setMessages(Map<String, Template> messages) {
        this.messages = messages;
    }
}
