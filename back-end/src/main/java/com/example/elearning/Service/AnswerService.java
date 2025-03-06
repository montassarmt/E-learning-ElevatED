package com.example.elearning.Service;

import com.example.elearning.Entity.Answer;
import com.example.elearning.Repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    @Autowired
    private AnswerRepository answerRepository;

    public List<Answer> getAnswersByQuestionId(int questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswer(int id) {
        answerRepository.deleteById(id);
    }

    public Answer updateAnswer(int id, Answer answerDetails) {
        Answer answer = answerRepository.findById(id).orElseThrow(() -> new RuntimeException("Answer not found"));
        answer.setText(answerDetails.getText());
        answer.setCorrect(answerDetails.isCorrect());
        return answerRepository.save(answer);
    }
}