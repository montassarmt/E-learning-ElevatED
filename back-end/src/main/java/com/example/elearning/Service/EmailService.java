package com.example.elearning.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendTestCreationEmail(String toEmail, String testTitle, String creatorName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("yourapp@example.com");
        message.setTo(toEmail);
        message.setSubject("New Test Created: " + testTitle);
        message.setText("Dear Tutor,\n\n" +
                "A new test '" + testTitle + "' has been successfully created by " + creatorName + ".\n\n" +
                "Thank you,\n" +
                "E-Learning Platform");

        mailSender.send(message);
    }
}