package com.esprit.backend.Entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Soumission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;

    private Long userId;
    private String reponse;// URL GitHub, fichier, ou texte
    @Column
    private Integer note;
    private LocalDateTime dateSoumission;

    @ManyToOne
    private Hackathon hackathon;

    public Soumission() {
    }


    public Soumission(String email, String reponse, LocalDateTime dateSoumission) {
        this.email = email;
        this.reponse = reponse;
        this.dateSoumission = dateSoumission;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

    public LocalDateTime getDateSoumission() {
        return dateSoumission;
    }

    public void setDateSoumission(LocalDateTime dateSoumission) {
        this.dateSoumission = dateSoumission;
    }

    public Hackathon getHackathon() {
        return hackathon;
    }

    public void setHackathon(Hackathon hackathon) {
        this.hackathon = hackathon;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public Integer getNote() {
        return note;
    }
}
