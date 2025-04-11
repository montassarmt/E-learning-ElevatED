package com.example.elearning.controllers;

import org.springframework.web.bind.annotation.RequestMapping;

public class FeedbackRestAPi {
    private String title="Hello, i'm the feedback Micro-Service";
    @RequestMapping("/hello")
    public String sayHello(){
        System.out.println(title);
        return title;
    }

    }
