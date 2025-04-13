package com.esprit.backend.Repositories;

import com.esprit.backend.Entities.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByUserEmail(String email);
    boolean existsByUserEmailAndHackathonId(String email, Long hackathonId);

    Participation findByUserEmailAndHackathonId(String userEmail, Long hackathonId);
}