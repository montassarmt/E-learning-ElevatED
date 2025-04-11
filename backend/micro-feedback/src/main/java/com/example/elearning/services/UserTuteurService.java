package com.example.elearning.services;

import com.example.elearning.entities.User;
import com.example.elearning.entities.Role;
import com.example.elearning.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTuteurService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Trouve un tuteur en ligne ayant une compétence spécifique.
     *
     * @param skill La compétence recherchée (ex: "Java").
     * @return Un Optional contenant le tuteur trouvé, ou vide si aucun tuteur n'est disponible.
     */
    public Optional<User> findOnlineTutorBySkill(String skill) {
        List<User> tutors = userRepository.findByRoleAndSkillsContainingAndStatus(Role.TUTOR, skill, "online");
        return tutors.isEmpty() ? Optional.empty() : Optional.of(tutors.get(0));
    }

    /**
     * Met à jour le statut d'un utilisateur.
     *
     * @param userId L'ID de l'utilisateur.
     * @param status Le nouveau statut ("online" ou "offline").
     */
    public void updateUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setStatus(status);
        userRepository.save(user);
    }
}