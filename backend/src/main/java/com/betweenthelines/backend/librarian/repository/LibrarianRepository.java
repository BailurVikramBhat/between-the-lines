package com.betweenthelines.backend.librarian.repository;

import com.betweenthelines.backend.librarian.entity.Librarian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LibrarianRepository extends JpaRepository<Librarian, UUID> {
    Optional<Librarian> findByEmail(String email);
}
