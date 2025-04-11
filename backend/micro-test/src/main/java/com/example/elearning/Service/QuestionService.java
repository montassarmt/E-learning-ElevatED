package com.example.elearning.Service;

import com.example.elearning.Entity.Answer;
import com.example.elearning.Entity.Question;
import com.example.elearning.Entity.Test;
import com.example.elearning.Repository.QuestionRepository;
import com.example.elearning.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TestRepository testRepository;

    public List<Question> getQuestionsByTestId(int testId) {
        return questionRepository.findByTestId(testId);
    }

    public Question createQuestion(Question question) {
        if (question.getTest() == null || question.getTest().getId() == 0) {
            throw new RuntimeException("Test ID must be provided");
        }

        Test test = testRepository.findById(question.getTest().getId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        question.setTest(test);

        if (question.getAnswers() != null) {
            for (Answer answer : question.getAnswers()) {
                answer.setQuestion(question);
            }
        }

        return questionRepository.save(question);
    }

    public void deleteQuestion(int id) {
        questionRepository.deleteById(id);
    }

    public Question updateQuestion(int id, Question questionDetails) {
        Question question = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        question.setText(questionDetails.getText());
        return questionRepository.save(question);
    }
}