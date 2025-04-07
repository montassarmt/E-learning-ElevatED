package com.example.elearning.Controllers;

import com.example.elearning.Entity.Question;
import com.example.elearning.Service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("/test/{testId}")
    public List<Question> getQuestionsByTestId(@PathVariable int testId) {
        return questionService.getQuestionsByTestId(testId);
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) {
        try {
            Question createdQuestion = questionService.createQuestion(question);
            return ResponseEntity.ok(createdQuestion);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable int id) {
        questionService.deleteQuestion(id);
    }

    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable int id, @RequestBody Question questionDetails) {
        return questionService.updateQuestion(id, questionDetails);
    }
}