package com.esprit.backend.Entities;

public class User {

    private String username;
    private String email;
    private String password;
    private String status;


    // 🔸 Getters & Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // 🔸 Méthode pour accéder au builder
    public static Builder builder() {
        return new Builder();
    }

    // 🔸 Classe interne Builder
    public static class Builder {
        private final User user;

        public Builder() {
            user = new User();
        }

        public Builder username(String username) {
            user.setUsername(username);
            return this;
        }

        public Builder email(String email) {
            user.setEmail(email);
            return this;
        }

        public Builder password(String password) {
            user.setPassword(password);
            return this;
        }

        public Builder status(String status) {
            user.setStatus(status);
            return this;
        }

        public User build() {
            return user;
        }
    }
}
