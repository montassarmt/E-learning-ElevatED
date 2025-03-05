package com.esprit.backend.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    // ✅ Un tuteur responsable de la séance
    @ManyToOne
    @JoinColumn(name = "tuteur_id", nullable = false)
    private Utilisateur tuteur;

    // ✅ Liste des étudiants participants
    @ManyToMany
    @JoinTable(
            name = "seance_etudiants",
            joinColumns = @JoinColumn(name = "seance_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    private Set<Utilisateur> etudiants = new HashSet<>();

    public SeanceCoaching() {}

    public SeanceCoaching(String nom, String description, String lienMeet, LocalDateTime dateDebut, LocalDateTime dateFin, Utilisateur tuteur) {
        this.nom = nom;
        this.description = description;
        this.lienMeet = lienMeet;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.tuteur = tuteur;
    }

    // ✅ Getters et Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLienMeet() {
        return lienMeet;
    }

    public void setLienMeet(String lienMeet) {
        this.lienMeet = lienMeet;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDateTime getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public Utilisateur getTuteur() {
        return tuteur;
    }

    public void setTuteur(Utilisateur tuteur) {
        this.tuteur = tuteur;
    }

    public Set<Utilisateur> getEtudiants() {
        return etudiants;
    }

    public void setEtudiants(Set<Utilisateur> etudiants) {
        this.etudiants = etudiants;
    }
}
