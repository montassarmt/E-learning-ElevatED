package com.example.elearning.Controllers;

import com.example.elearning.Entity.Answer;
import com.example.elearning.Service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable int questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }

    @PostMapping
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) {
        Answer createdAnswer = answerService.createAnswer(answer);
        return ResponseEntity.ok(createdAnswer);
    }

    @DeleteMapping("/{id}")
    public void deleteAnswer(@PathVariable int id) {
        answerService.deleteAnswer(id);
    }

    @PutMapping("/{id}")
    public Answer updateAnswer(@PathVariable int id, @RequestBody Answer answerDetails) {
        return answerService.updateAnswer(id, answerDetails);
    }
}