package com.example.userbackend.Security;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}