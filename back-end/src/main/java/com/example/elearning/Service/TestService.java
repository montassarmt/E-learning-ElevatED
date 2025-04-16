package com.example.elearning.Service;

import com.example.elearning.Entity.Test;
import com.example.elearning.Entity.TestType;
import com.example.elearning.Entity.User;
import com.example.elearning.Repository.TestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestService {
    @Autowired
    private TestRepository testRepository;


    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }
    public List<Test> getTestsByType(TestType type) {
        return testRepository.findByType(type);
    }

    @Transactional
    public Test createTest(Test test) {
        // Save the test first
        Test savedTest = testRepository.save(test);

        // Verify the test was saved with a creator
        if (savedTest.getCreatedBy() == null) {
            throw new IllegalStateException("Test must have a creator (tutor)");
        }

        // Send email notification to the tutor
        User tutor = savedTest.getCreatedBy();
        emailService.sendTestCreationEmail(
                tutor.getEmail(),
                savedTest.getTitle(),
                tutor.getUsername()
        );

        return savedTest;
    }
    public Optional<Test> getTestById(int id) {
        return testRepository.findById(id);
    }

    public Test updateTest(int id, Test testDetails) {
        Test test = testRepository.findById(id).orElseThrow(() -> new RuntimeException("Test not found"));
        test.setTitle(testDetails.getTitle());
        test.setDuration(testDetails.getDuration());
        test.setType(testDetails.getType());
        test.setResultat(testDetails.getResultat());
        return testRepository.save(test);
    }

    public void deleteTest(int id) {
        testRepository.deleteById(id);
    }
}