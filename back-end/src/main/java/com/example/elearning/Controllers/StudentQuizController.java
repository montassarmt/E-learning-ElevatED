package com.example.elearning.Controllers;

import com.example.elearning.DTO.QuizResultDTO;
import com.example.elearning.DTO.QuizSubmissionDTO;
import com.example.elearning.Entity.Answer;
import com.example.elearning.Entity.Question;
import com.example.elearning.Entity.Test;
import com.example.elearning.Entity.TestType;
import com.example.elearning.Service.QuestionService;
import com.example.elearning.Service.QuizEvaluationService;
import com.example.elearning.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/quizzes")
public class StudentQuizController {

    @Autowired
    private TestService testService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizEvaluationService quizEvaluationService;


    @GetMapping
    public ResponseEntity<List<Test>> getAvailableQuizzes() {
        List<Test> quizzes = testService.getTestsByType(TestType.QUIZ);
        return ResponseEntity.ok(quizzes);
    }


    @GetMapping("/{quizId}")
    public ResponseEntity<Test> getQuizWithQuestions(@PathVariable int quizId) {
        Test quiz = testService.getTestById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // Get questions for this quiz
        List<Question> questions = questionService.getQuestionsByTestId(quizId);
        quiz.setQuestions(questions);

        // For security, don't expose correct answers to student
        for (Question question : questions) {
            for (Answer answer : question.getAnswers()) {
                answer.setCorrect(false); // Hide correct answer information
            }
        }

        return ResponseEntity.ok(quiz);
    }

    // Submit quiz answers and get results
    @PostMapping("/{quizId}/submit")
    public ResponseEntity<QuizResultDTO> submitQuiz(
            @PathVariable int quizId,
            @RequestBody QuizSubmissionDTO submission) {

        // Verify the submission is for the correct quiz
        if (submission.getTestId() != quizId) {
            throw new RuntimeException("Quiz ID mismatch");
        }

        // Evaluate the quiz
        QuizResultDTO result = quizEvaluationService.evaluateQuiz(submission, 0);

        return ResponseEntity.ok(result);
    }
}