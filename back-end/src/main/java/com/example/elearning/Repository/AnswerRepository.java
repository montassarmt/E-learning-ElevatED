package com.example.elearning.Repository;

import com.example.elearning.Entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByQuestionId(int questionId);

    Optional<Answer> findByQuestionIdAndIsCorrect(int questionId, boolean isCorrect);
}