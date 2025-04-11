package com.example.userbackend.Controller;

import com.example.userbackend.Entity.Role;
import com.example.userbackend.Entity.User;
import com.example.userbackend.Payload.MessageResponse;
import com.example.userbackend.Repository.RoleRepository;
import com.example.userbackend.Repository.UserRepository;
import com.example.userbackend.Security.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtils jwtUtils;

    // Lire tous les utilisateurs
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Lire un utilisateur par ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return ResponseEntity.ok(user);
    }

    // Modifier un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Mettre à jour les informations de l'utilisateur
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setSpecialty(updatedUser.getSpecialty());
        user.setStatus(updatedUser.getStatus());

        // Si tu souhaites modifier les rôles, tu peux ajouter la logique ici.
        Set<Role> roles = updatedUser.getRoles();
        if (roles != null) {
            user.setRoles(roles);
        }

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Utilisateur mis à jour avec succès"));
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Supprimer les rôles associés dans la table de jointure
        if (!user.getRoles().isEmpty()) {
            user.getRoles().clear();  // Cela supprime les liens dans la table user_roles
        }

        // Supprimer l'utilisateur
        userRepository.delete(user);
        return ResponseEntity.ok(new MessageResponse("Utilisateur supprimé avec succès"));
    }


}
