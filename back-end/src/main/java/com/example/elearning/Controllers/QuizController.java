package com.example.elearning.Controllers;

import com.example.elearning.DTO.QuizResultDTO;
import com.example.elearning.DTO.QuizSubmissionDTO;
import com.example.elearning.Service.QuizEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizEvaluationService quizEvaluationService;

    @PostMapping("/submit")
    public QuizResultDTO submitQuiz(@RequestBody QuizSubmissionDTO submission,
                                    @RequestParam(required = false) Long timeTaken) {
        // Convert milliseconds to seconds if needed
        long timeTakenInSeconds = timeTaken != null ? timeTaken / 1000 : 0;
        return quizEvaluationService.evaluateQuiz(submission, timeTakenInSeconds);
    }
}