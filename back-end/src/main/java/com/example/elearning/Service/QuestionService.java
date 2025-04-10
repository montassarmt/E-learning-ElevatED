package com.example.elearning.Service;

import com.example.elearning.Entity.Answer;
import com.example.elearning.Entity.Question;
import com.example.elearning.Entity.Test;
import com.example.elearning.Entity.TestType;
import com.example.elearning.Repository.QuestionRepository;
import com.example.elearning.Repository.TestRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
    public Question createQuestion(Question question) {
        if (question.getTest() == null || question.getTest().getId() == 0) {
            throw new RuntimeException("Test ID must be provided");
        }

        Test test = testRepository.findById(question.getTest().getId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        question.setTest(test);

        if (test.getType() == TestType.QUIZ) {
            if (question.getAnswers() == null || question.getAnswers().size() != 4) {
                throw new RuntimeException("QUIZ must have exactly 4 answers");
            }

            long correctCount = question.getAnswers().stream().filter(Answer::isCorrect).count();
            if (correctCount != 1) {
                throw new RuntimeException("QUIZ must have exactly one correct answer");
            }

            for (Answer answer : question.getAnswers()) {
                answer.setQuestion(question);
            }
        } else if (test.getType() == TestType.EXAMEN) {
            // No predefined answers allowed for EXAMEN
            if (question.getAnswers() != null && !question.getAnswers().isEmpty()) {
                throw new RuntimeException("EXAMEN questions should not have predefined answers");
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
