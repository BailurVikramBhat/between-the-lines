package com.betweenthelines.backend.common.utils;

import org.springframework.util.StringUtils;

import java.util.Locale;

public class HelperUtils {
    public static String normalizeEmail(String email) {
        if(!StringUtils.hasText(email)) {
            throw new IllegalArgumentException("Email is required.");
        }
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
