package com.example.userbackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMMM yyyy");

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationCode(String toEmail, String verificationCode) {
        sendEmail(toEmail,
                "Verification Code",
                "Your verification code is: " + verificationCode);
    }

    public void sendRenewalReminder(String toEmail, String planName, LocalDateTime endDate) {
        String formattedDate = endDate.format(DATE_FORMATTER);
        String subject = "Your " + planName + " subscription is expiring soon";
        String text = String.format(
                "Dear subscriber,\n\n" +
                        "Your %s subscription will expire on %s.\n" +
                        "Please renew your subscription to continue enjoying our services.\n\n" +
                        "Best regards,\nThe Subscription Team",
                planName, formattedDate
        );

        sendEmail(toEmail, subject, text);
    }

    public void sendRenewalConfirmation(String toEmail, String planName, LocalDateTime newEndDate) {
        String formattedDate = newEndDate.format(DATE_FORMATTER);
        String subject = "Your " + planName + " subscription has been renewed";
        String text = String.format(
                "Dear subscriber,\n\n" +
                        "Your %s subscription has been successfully renewed.\n" +
                        "Your new expiration date is %s.\n\n" +
                        "Thank you for your continued trust.\n\n" +
                        "Best regards,\nThe Subscription Team",
                planName, formattedDate
        );

        sendEmail(toEmail, subject, text);
    }

    public void sendPaymentFailure(String toEmail, String planName,String errorMessage) {
        String subject = "Payment failed for your " + planName + " subscription";
        String text = String.format(
                "Dear subscriber,\n\n" +
                        "We were unable to process the payment for your %s subscription.\n" +
                        "Reason: Your card has insufficient funds\n\n" +
                        "Please update your payment information or try another payment method.\n\n" +
                        "Best regards,\nThe Subscription Team",
                planName,errorMessage
        );

        sendEmail(toEmail, subject, text);
    }

    private void sendEmail(String toEmail, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Email sent successfully to {}", toEmail);
        } catch (Exception e) {
            logger.error("Error sending email to " + toEmail, e);
            throw new RuntimeException("Error sending email");
        }
    }
}
