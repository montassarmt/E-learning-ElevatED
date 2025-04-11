package com.example.elearning.services;

import com.example.elearning.entities.Feedback;
import com.example.elearning.entities.User;
import com.example.elearning.repositories.FeedbackRepository;
import com.example.elearning.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    // Create Feedback
    public Feedback createFeedback(Feedback feedback) {
        if (feedback.getUserId() == null) {
            throw new RuntimeException("User ID is required");
        }

        User user = userRepository.findById(feedback.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + feedback.getUserId()));

        feedback.setUser(user);
        feedback.setTimestamp(new Date());
        return feedbackRepository.save(feedback);
    }

    // Read Feedback by ID
    public Optional<Feedback> getFeedbackById(Long feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }

    public List<Feedback> getFeedbacks() {
        return feedbackRepository.findAll();
    }


    public int countPositiveFeedbacks(List<Feedback> feedbacks) {
        return (int) feedbacks.stream()
                .filter(feedback -> feedback.getRating() >= 4)
                .count();
    }

    public int countNegativeFeedbacks(List<Feedback> feedbacks) {
        return (int) feedbacks.stream()
                .filter(feedback -> feedback.getRating() <= 2)
                .count();
    }

    public List<String> getPositiveComments(List<Feedback> feedbacks) {
        return feedbacks.stream()
                .filter(feedback -> feedback.getRating() >= 4)
                .map(Feedback::getComments)
                .collect(Collectors.toList());
    }

    public List<String> getNegativeComments(List<Feedback> feedbacks) {
        return feedbacks.stream()
                .filter(feedback -> feedback.getRating() <= 2)
                .map(Feedback::getComments)
                .collect(Collectors.toList());
    }

    // Read All Feedbacks
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // Update Feedback
    public Feedback updateFeedback(Long feedbackId, Feedback updatedFeedback) {
        return feedbackRepository.findById(feedbackId).map(feedback -> {
            feedback.setComments(updatedFeedback.getComments());
            feedback.setRating(updatedFeedback.getRating());
            feedback.setFeedbackType(updatedFeedback.getFeedbackType());
            feedback.setAudioFilePath(updatedFeedback.getAudioFilePath());
            return feedbackRepository.save(feedback);
        }).orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

    // Delete Feedback
    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}