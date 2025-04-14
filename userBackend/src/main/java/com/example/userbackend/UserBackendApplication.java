package com.example.userbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UserBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserBackendApplication.class, args);
    }

}
