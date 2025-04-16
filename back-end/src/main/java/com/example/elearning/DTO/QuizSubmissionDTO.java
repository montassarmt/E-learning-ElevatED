package com.example.elearning.DTO;

import java.util.List;

public class QuizSubmissionDTO {
    private int testId;
    private List<StudentAnswerDTO> answers;

    // Getters and setters
    public int getTestId() {
        return testId;
    }

    public void setTestId(int testId) {
        this.testId = testId;
    }

    public List<StudentAnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<StudentAnswerDTO> answers) {
        this.answers = answers;
    }
}