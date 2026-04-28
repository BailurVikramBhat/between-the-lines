package com.betweenthelines.backend.librarian.repository;

import com.betweenthelines.backend.librarian.entity.Librarian;
import org.jspecify.annotations.NullMarked;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LibrarianRepository extends JpaRepository<Librarian, UUID> {
    @EntityGraph(attributePaths = "institution")
    Optional<Librarian> findByEmail(String email);

    @NullMarked
    @EntityGraph(attributePaths = "institution")
    Optional<Librarian> findById(UUID id);
}
