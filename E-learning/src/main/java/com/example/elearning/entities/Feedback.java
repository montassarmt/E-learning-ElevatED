package com.example.elearning.entities;

//import com.example.elearning.entities.FeedbackType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

     // ID de l'utilisateur qui a soumis le feedback
    private String comments; // Commentaires textuels (si feedbackType = TEXT)
    private int rating; // Note donnée par l'utilisateur

    @Enumerated(EnumType.STRING)
    private FeedbackType feedbackType; // Type de feedback (TEXT ou AUDIO)

    private String audioFilePath; // Chemin du fichier audio (si feedbackType = AUDIO)
    private Date timestamp;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Clé étrangère vers la table User
    @JsonIgnore
    private User user;

    @Transient // Ce champ ne sera pas persistant en base de données
    private Long userId;// Utilisateur associé à ce feedback
}
