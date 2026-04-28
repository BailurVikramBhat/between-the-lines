package com.betweenthelines.backend.auth.controller;

import com.betweenthelines.backend.auth.dto.LoginRequest;
import com.betweenthelines.backend.auth.dto.LoginResponse;
import com.betweenthelines.backend.auth.dto.MeResponse;
import com.betweenthelines.backend.auth.service.AuthService;
import com.betweenthelines.backend.common.dto.ApiResponse;
import com.betweenthelines.backend.librarian.entity.Librarian;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Login Successful", authService.login(request)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<MeResponse>> me(@AuthenticationPrincipal Librarian librarian) {
        return ResponseEntity.ok(ApiResponse.success("Current user fetched successfully", authService.meProfile(librarian)));
    }



}
