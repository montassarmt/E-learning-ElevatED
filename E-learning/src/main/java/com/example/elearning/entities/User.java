package com.example.elearning.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role; // TUTOR ou STUDENT

    @ElementCollection
    private List<String> skills; // Compétences (uniquement pour les tuteurs)

    private String status; // Par exemple : STUDENT, INSTRUCTOR, ADMIN
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Feedback> feedbacks; // Liste des feedbacks associés à cet utilisateur
}
