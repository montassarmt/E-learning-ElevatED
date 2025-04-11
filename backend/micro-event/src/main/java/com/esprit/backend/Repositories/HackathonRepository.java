package com.esprit.backend.Repositories;

import com.esprit.backend.Entities.Hackathon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HackathonRepository extends JpaRepository<Hackathon, Long> {}