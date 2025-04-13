package com.esprit.backend.Services;

import com.esprit.backend.Entities.User;
import com.esprit.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;


@Service
public class UserService {


    public void register(User user) {
        user.setStatus("online");
        userRepository.save(user); // ✅ Enregistre en BDD !
    }

    public User login(User user) {
        try {
            User cUser = userRepository.findByEmail(user.getEmail());

            if (cUser == null) {
                throw new RuntimeException("User not found");
            }

            if (!cUser.getPassword().equals(user.getPassword())) {
                throw new RuntimeException("Password incorrect");
            }

            cUser.setStatus("online");
            return userRepository.save(cUser); // Optionnel : met à jour le status

        } catch (Exception e) {
            // Log l'erreur dans la console
            e.printStackTrace();

            // Tu peux aussi logger avec un vrai logger : log.error("Login error", e);

            // Rejette l’erreur pour qu’elle soit attrapée dans ton @ExceptionHandler dans le controller
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }


    public void logout(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        user.setStatus("offline");
        userRepository.save(user); // ✅ Mise à jour persistée
    }



    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


}