package com.esprit.backend.Repositories;

import com.esprit.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findByUsername(String username);
    boolean existsByUsername(String username);
}