package com.example.elearning.controllers;

import com.example.elearning.services.UserTuteurSatutsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserTuteurSatutsController {
    private  UserTuteurSatutsService userTuteurSatutsService;
    @PutMapping("/{userId}/status")
    public String updateUserStatus(@PathVariable Long userId, @RequestParam String status) {
        userTuteurSatutsService.setUserStatus(userId, status);
        return "Statut de l'utilisateur mis à jour : " + status;
    }
}
