package com.betweenthelines.backend.common.utils;

import org.springframework.util.StringUtils;

import java.util.Locale;

public class HelperUtils {
    public static String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
