INSERT INTO institution (
    id,
    name,
    slug,
    librarian_email,
    address
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'SDM''s College',
    'sdm-college',
    'librarian@sdm.edu.in',
    'Udupi, Karnataka'
);

INSERT INTO librarian (
    id,
    tenant_id,
    email,
    password_hash,
    full_name,
    is_temp_password,
    totp_secret,
    totp_enabled
) VALUES (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'librarian@sdm.edu.in',
    '$2a$10$LTjKFy5IZuOiEwof8SgevusvFCFDKjA4tg0mKKKF2jYgA5S7yEOJy',
    'College Librarian',
    FALSE,
    NULL,
    FALSE
);
