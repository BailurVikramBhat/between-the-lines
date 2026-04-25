package com.betweenthelines.backend.common.dto;

import java.time.LocalDateTime;

public record ApiResponse(String message, LocalDateTime timestamp, String path) {
}
