package com.betweenthelines.backend.auth.service;

import com.betweenthelines.backend.auth.dto.LoginRequest;
import com.betweenthelines.backend.auth.dto.LoginResponse;
import com.betweenthelines.backend.common.exception.InvalidCredentialsException;
import com.betweenthelines.backend.common.utils.HelperUtils;
import com.betweenthelines.backend.librarian.entity.Librarian;
import com.betweenthelines.backend.librarian.repository.LibrarianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final LibrarianRepository librarianRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(LibrarianRepository librarianRepository, PasswordEncoder bCryptPasswordEncoder) {
        this.librarianRepository = librarianRepository;
        this.passwordEncoder = bCryptPasswordEncoder;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        String email = HelperUtils.normalizeEmail(loginRequest.email());
        String rawPassword = loginRequest.password();
        log.error("successfully normalized email: {}", email);
        Librarian librarian = librarianRepository.findByEmail(email).orElseThrow(() -> new InvalidCredentialsException("Invalid Credentials."));
        if(!passwordEncoder.matches(rawPassword, librarian.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid Credentials.");
        }
        return new LoginResponse("temp_access_token", "Bearer", 604800L);
    }

}
