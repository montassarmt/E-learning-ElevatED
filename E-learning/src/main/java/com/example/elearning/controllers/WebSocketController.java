package com.example.elearning.controllers;

import com.example.elearning.entities.User;
import com.example.elearning.services.UserTuteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Optional;
@Controller
public class WebSocketController {

    @Autowired
    private UserTuteurService userTuteurService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public String handleChatMessage(String message) {
        // Exemple : Le message contient la compétence demandée (ex: "Java")
        String skill = message;

        // Trouve un tuteur en ligne ayant la compétence demandée
        Optional<User> tutor = userTuteurService.findOnlineTutorBySkill(skill);

        if (tutor.isPresent()) {
            return "Connecté au tuteur : " + tutor.get().getName() + " (Compétence : " + skill + ")";
        } else {
            return "Aucun tuteur en ligne disponible pour la compétence : " + skill;
        }
    }
}
