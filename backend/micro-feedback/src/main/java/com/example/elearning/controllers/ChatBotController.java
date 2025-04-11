package com.example.elearning.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatBotController {

    @PostMapping("/message")
    public String handleMessage(@RequestBody String message) {
        // Process the message and generate a response
        return "You said: " + message;
    }
}
