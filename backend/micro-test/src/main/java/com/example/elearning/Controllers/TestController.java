package com.example.elearning.Controllers;

import com.example.elearning.Entity.Test;
import com.example.elearning.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping
    public List<Test> getAllTests() {
        return testService.getAllTests();
    }

    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody Test test) {
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
}