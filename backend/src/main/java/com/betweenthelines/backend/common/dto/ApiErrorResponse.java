package com.betweenthelines.backend.common.dto;

import java.time.OffsetDateTime;
import java.util.Map;

public record ApiErrorResponse(boolean success, int status, String error, String message, String path, OffsetDateTime timestamp, Map<String, String> fieldErrors) {
    public static ApiErrorResponse of(int status, String error, String message, String path) {
        return new ApiErrorResponse(false, status, error, message, path, OffsetDateTime.now(), null);
    }
    public static ApiErrorResponse validationError(int status, String error, String message, String path, Map<String, String> fieldErrors) {
        return new ApiErrorResponse(false, status, error, message, path, OffsetDateTime.now(), fieldErrors);
    }
}
