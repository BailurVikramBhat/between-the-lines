package com.betweenthelines.backend.auth.security;

import com.betweenthelines.backend.librarian.entity.Librarian;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.time.Instant;

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
                .signWith(getSigningKey(jwtConfig.getSecret()))
                .compact();

    }
    private Key getSigningKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
