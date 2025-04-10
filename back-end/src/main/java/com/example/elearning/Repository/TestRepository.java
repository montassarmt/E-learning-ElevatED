package com.example.elearning.Repository;

import com.example.elearning.Entity.Test;
import com.example.elearning.Entity.TestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    List<Test> findByType(TestType type);
}