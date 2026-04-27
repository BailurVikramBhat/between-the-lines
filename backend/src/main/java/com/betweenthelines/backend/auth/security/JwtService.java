package com.betweenthelines.backend.auth.security;

import com.betweenthelines.backend.librarian.entity.Librarian;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.time.Instant;
import java.util.UUID;

@Service
public class JwtService {
    private final JwtConfig jwtConfig;

    public JwtService(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String generateToken(Librarian librarian) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(jwtConfig.getExpirationSeconds());
        return Jwts.builder()
                .subject(librarian.getId().toString())
                .issuer(jwtConfig.getIssuer())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .claim("email", librarian.getEmail())
                .claim("tenantId", librarian.getInstitution().getId())
                .claim("tenantSlug", librarian.getInstitution().getSlug())
                .signWith(getSigningKey())
                .compact();

    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes());
    }

    public Claims parseAndValidate(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        try {
            return Jwts.parser()
                    .verifyWith((SecretKey) getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
    public UUID extractSubjectAsUuid(Claims claims) {
        try {
            return UUID.fromString(claims.getSubject());
        } catch (IllegalArgumentException | NullPointerException e) {
            return null;
        }
    }
}

