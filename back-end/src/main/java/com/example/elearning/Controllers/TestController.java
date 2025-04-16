package com.example.elearning.Controllers;

import com.example.elearning.Entity.Role;
import com.example.elearning.Entity.Test;
import com.example.elearning.Entity.TestType;
import com.example.elearning.Entity.User;
import com.example.elearning.Service.TestService;
import com.example.elearning.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {
    @Autowired
    private TestService testService;

    @Autowired
    private UserService userService;  // Add this dependency

    @GetMapping
    public List<Test> getAllTests() {
        return testService.getAllTests();
    }

    @GetMapping("/type/quiz")
    public List<Test> getQuizTests() {
        return testService.getTestsByType(TestType.QUIZ);
    }

    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody Test test,
                                           @RequestParam Long tutorId) {
        // Get the tutor (creator) from the database using userService
        User tutor = userService.getUserById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor not found with id: " + tutorId));

        // Verify the user is actually a tutor
        if (tutor.getRole() != Role.TUTOR) {
            throw new RuntimeException("User with id " + tutorId + " is not a tutor");
        }

        // Associate the tutor with the test
        test.setCreatedBy(tutor);

        Test createdTest = testService.createTest(test);
        return ResponseEntity.ok(createdTest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable int id) {
        testService.deleteTest(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable int id, @RequestBody Test testDetails) {
        Test updatedTest = testService.updateTest(id, testDetails);
        return ResponseEntity.ok(updatedTest);
    }

    @GetMapping("/type/examen")
    public List<Test> getExamenTests() {
        return testService.getTestsByType(TestType.EXAMEN);
    }
}