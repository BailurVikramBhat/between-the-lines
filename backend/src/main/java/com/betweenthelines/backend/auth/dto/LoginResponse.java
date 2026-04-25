package com.betweenthelines.backend.auth.dto;

public record LoginResponse(String accessToken, String tokenType, Long expiresInSeconds) {
}
