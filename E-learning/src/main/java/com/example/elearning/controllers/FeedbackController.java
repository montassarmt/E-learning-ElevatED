package com.example.elearning.controllers;
import com.example.elearning.entities.Feedback;
import com.example.elearning.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getFeedbackAnalytics() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        int positiveCount = feedbackService.countPositiveFeedbacks(feedbacks);
        int negativeCount = feedbackService.countNegativeFeedbacks(feedbacks);
        List<String> positiveComments = feedbackService.getPositiveComments(feedbacks);
        List<String> negativeComments = feedbackService.getNegativeComments(feedbacks);

        Map<String, Object> response = new HashMap<>();
        response.put("positiveCount", positiveCount);
        response.put("negativeCount", negativeCount);
        response.put("positiveComments", positiveComments);
        response.put("negativeComments", negativeComments);

        return ResponseEntity.ok(response);
    }

    // Create Feedback
    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.createFeedback(feedback);
    }

    // Get Feedback by ID
    @GetMapping("/{feedbackId}")
    public Optional<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        return feedbackService.getFeedbackById(feedbackId);
    }

    // Get All Feedbacks
    //@GetMapping
    //public List<Feedback> getAllFeedbacks() {
      //  return feedbackService.getAllFeedbacks();
    //}
    @GetMapping
    public ResponseEntity<List<Feedback>> getFeedbacks() {
        try {
            List<Feedback> feedbacks = feedbackService.getFeedbacks(); // No pagination
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            System.err.println("Error fetching feedbacks: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    // Update Feedback
    @PutMapping("/{feedbackId}")
    public Feedback updateFeedback(@PathVariable Long feedbackId, @RequestBody Feedback updatedFeedback) {
        return feedbackService.updateFeedback(feedbackId, updatedFeedback);
    }

    // Delete Feedback
    @DeleteMapping("/{feedbackId}")
    public void deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
    }
}
