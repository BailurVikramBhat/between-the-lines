package com.betweenthelines.backend.auth.service;

import com.betweenthelines.backend.auth.dto.*;
import com.betweenthelines.backend.auth.security.JwtConfig;
import com.betweenthelines.backend.auth.security.JwtService;
import com.betweenthelines.backend.common.exception.BadRequestException;
import com.betweenthelines.backend.common.exception.InvalidCredentialsException;
import com.betweenthelines.backend.common.utils.HelperUtils;
import com.betweenthelines.backend.librarian.entity.Librarian;
import com.betweenthelines.backend.librarian.repository.LibrarianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final LibrarianRepository librarianRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JwtConfig jwtConfig;

    public AuthService(LibrarianRepository librarianRepository, PasswordEncoder bCryptPasswordEncoder, JwtService jwtService, JwtConfig jwtConfig) {
        this.librarianRepository = librarianRepository;
        this.passwordEncoder = bCryptPasswordEncoder;
        this.jwtService = jwtService;
        this.jwtConfig = jwtConfig;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        String email = HelperUtils.normalizeEmail(loginRequest.email());
        String rawPassword = loginRequest.password();
        Librarian librarian = librarianRepository.findByEmail(email).orElseThrow(() -> new InvalidCredentialsException("Invalid Credentials."));
        if(!passwordEncoder.matches(rawPassword, librarian.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid Credentials.");
        }
        String token = jwtService.generateToken(librarian);
        return new LoginResponse(token, "Bearer", jwtConfig.getExpirationSeconds());
    }


    public MeResponse meProfile(final Librarian librarian) {
        return new MeResponse(librarian.getId(), librarian.getEmail(), librarian.getFullName(), librarian.getInstitution().getId(), librarian.getInstitution().getSlug(), librarian.getTotpEnabled(), librarian.getTempPassword());
    }
    @Transactional
    public UpdatePasswordResponse updatePassword(final Librarian librarian, UpdatePasswordRequest request) {
        if(!librarian.getTempPassword()) {
            throw new BadRequestException("You do not have enough permissions to reset the password. Please raise a request from the settings page.");
        }
        if(!passwordEncoder.matches(request.password(), librarian.getPasswordHash())) {
            throw new InvalidCredentialsException("Existing password does not match");
        }
        if(passwordEncoder.matches(request.newPassword(), librarian.getPasswordHash())) {
            throw new BadRequestException("New password cannot be same as existing password.");
        }

        librarian.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        librarian.setTempPassword(false);
        librarianRepository.save(librarian);
        return new UpdatePasswordResponse("Password changed successfully! Any further changes require Institution approval. Please raise a request from the settings page if needed.");
    }
}
