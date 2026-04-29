package com.betweenthelines.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdatePasswordRequest(@NotBlank String password, @NotBlank @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
        message = "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character"
) String newPassword) {
}
