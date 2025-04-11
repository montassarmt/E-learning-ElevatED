package com.example.elearning.repositories;

import com.example.elearning.entities.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // Page<Feedback> findAll(Pageable pageable);
}
