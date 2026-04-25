CREATE TABLE institution (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    librarian_email VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_institution_slug UNIQUE (slug),
    CONSTRAINT uq_institution_librarian_email UNIQUE (librarian_email)
);
