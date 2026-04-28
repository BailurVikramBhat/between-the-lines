package com.betweenthelines.backend.auth.dto;

import java.util.UUID;

public record MeResponse(UUID id, String email, String fullName, UUID tenantId, String tenantSlug, boolean totpEnabled, boolean isTempPassword) {

}
