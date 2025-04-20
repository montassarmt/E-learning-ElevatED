package com.esprit.backend.Repositories;

import com.esprit.backend.Entities.Soumission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SoumissionRepository extends JpaRepository<Soumission, Long> {
    List<Soumission> findByHackathonIdAndUserId(Long hackathonId, Long userId);

    List<Soumission> findByHackathonId(Long hackathonId);

    boolean existsByUserIdAndHackathonId(Long userId, Long hackathonId);

    int countByUserId(Long userId);

    List<Soumission> findByEmail(String email);
}