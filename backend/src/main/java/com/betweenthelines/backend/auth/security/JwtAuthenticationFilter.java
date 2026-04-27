package com.betweenthelines.backend.auth.security;

import com.betweenthelines.backend.librarian.repository.LibrarianRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final LibrarianRepository librarianRepository;
    private static final String BEARER_PREFIX = "Bearer ";

    public JwtAuthenticationFilter(JwtService jwtService, LibrarianRepository librarianRepository) {
        this.jwtService = jwtService;
        this.librarianRepository = librarianRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (null == authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(BEARER_PREFIX.length()).trim();

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }
        Claims claims = jwtService.parseAndValidate(token);
        if(claims == null) {
            filterChain.doFilter(request, response);
            return;
        }
        UUID subjectId = jwtService.extractSubjectAsUuid(claims);
        if (subjectId == null) {
            filterChain.doFilter(request, response);
            return;
        }
        librarianRepository.findById(subjectId).ifPresent(librarian -> {
            var authenticationToken = new UsernamePasswordAuthenticationToken(librarian, null, Collections.emptyList());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        });
        filterChain.doFilter(request, response);



    }
}

