package com.example.elearning.Service;

import com.example.elearning.Entity.Test;
import com.example.elearning.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    private TestRepository testRepository;

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test createTest(Test test) {
        return testRepository.save(test);
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