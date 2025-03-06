package com.example.elearning.services;

import com.example.elearning.entities.User;
import com.example.elearning.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTuteurSatutsService {
    @Autowired
    private UserRepository userRepository;

    public void setUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setStatus(status);
        userRepository.save(user);
    }
}
