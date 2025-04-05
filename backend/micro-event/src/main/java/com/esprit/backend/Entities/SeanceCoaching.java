package com.esprit.backend.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SeanceCoaching {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private String lienMeet;

    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;

    public SeanceCoaching() {}

    public SeanceCoaching(String nom, String description, String lienMeet, LocalDateTime dateDebut, LocalDateTime dateFin) {
        this.nom = nom;
        this.description = description;
        this.lienMeet = lienMeet;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLienMeet() { return lienMeet; }
    public void setLienMeet(String lienMeet) { this.lienMeet = lienMeet; }

    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
}
