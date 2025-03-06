package com.partnershipmanagement.Services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    //gmail integration
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body, String zoomLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);

        // Add the Zoom meeting link to the email body
        String fullBody = body + "\n\nJoin the Zoom Meeting: " + zoomLink;

        helper.setText(fullBody);

        mailSender.send(message);
    }
}
