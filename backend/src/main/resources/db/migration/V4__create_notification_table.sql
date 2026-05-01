CREATE TABLE notifications
(
    id                   UUID PRIMARY KEY,
    recipient_id         UUID          NOT NULL,
    notification_type    VARCHAR(50)   NOT NULL,
    title                VARCHAR(120)  NOT NULL,
    description          VARCHAR(1000) NOT NULL,
    primary_action_label VARCHAR(80),
    primary_action_url   VARCHAR(255),
    read_at              TIMESTAMP,
    created_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at           TIMESTAMP,
    CONSTRAINT fk_notification_librarian FOREIGN KEY (recipient_id) REFERENCES librarian (id)
);
CREATE INDEX idx_notifications_recipient_deleted
    ON notifications (recipient_id, deleted_at);

CREATE INDEX idx_notifications_recipient_read_deleted
    ON notifications (recipient_id, read_at, deleted_at);

CREATE INDEX idx_notifications_recipient_type_read_deleted
    ON notifications (recipient_id, notification_type, read_at, deleted_at);