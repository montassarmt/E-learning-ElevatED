package com.example.elearning.Service;

import com.example.elearning.DTO.QuizResultDTO;
import com.example.elearning.DTO.QuizSubmissionDTO;
import com.example.elearning.DTO.StudentAnswerDTO;
import com.example.elearning.Entity.Answer;
import com.example.elearning.Entity.Question;
import com.example.elearning.Entity.Test;
import com.example.elearning.Repository.AnswerRepository;
import com.example.elearning.Repository.QuestionRepository;
import com.example.elearning.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizEvaluationService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public QuizResultDTO evaluateQuiz(QuizSubmissionDTO submission, long timeTakenInSeconds) {
        Optional<Test> testOptional = testRepository.findById(submission.getTestId());
        if (testOptional.isEmpty()) {
            throw new RuntimeException("Test not found");
        }

        Test test = testOptional.get();
        List<Question> questions = questionRepository.findByTestId(test.getId());

        int score = 0;
        int totalQuestions = questions.size();

        for (StudentAnswerDTO studentAnswer : submission.getAnswers()) {
            Optional<Question> questionOptional = questionRepository.findById(studentAnswer.getQuestionId());
            if (questionOptional.isEmpty()) {
                continue; // or throw exception
            }

            Question question = questionOptional.get();
            Optional<Answer> correctAnswerOptional = answerRepository.findByQuestionIdAndIsCorrect(question.getId(), true);

            if (correctAnswerOptional.isPresent()) {
                Answer correctAnswer = correctAnswerOptional.get();
                if (correctAnswer.getId() == studentAnswer.getAnswerId()) {
                    score++;
                }
            }
        }

        QuizResultDTO result = new QuizResultDTO();
        result.setScore(score);
        result.setTotalQuestions(totalQuestions);
        result.setPassed(score >= (totalQuestions * 0.7)); // 70% to pass
        result.setTimeTaken(timeTakenInSeconds);

        // Save the result to the test
        test.setResultat(score + "/" + totalQuestions);
        testRepository.save(test);

        return result;
    }
}