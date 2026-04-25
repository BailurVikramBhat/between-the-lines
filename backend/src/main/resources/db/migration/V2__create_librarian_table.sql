CREATE TABLE librarian (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_temp_password BOOLEAN NOT NULL DEFAULT FALSE,
    totp_secret VARCHAR(255),
    totp_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_librarian_tenant
        FOREIGN KEY (tenant_id) REFERENCES institution (id),
    CONSTRAINT uq_librarian_tenant_email UNIQUE (tenant_id, email)
);
