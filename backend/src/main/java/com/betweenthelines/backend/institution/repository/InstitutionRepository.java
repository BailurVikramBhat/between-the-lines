package com.betweenthelines.backend.institution.repository;

import com.betweenthelines.backend.institution.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, UUID> {
}
