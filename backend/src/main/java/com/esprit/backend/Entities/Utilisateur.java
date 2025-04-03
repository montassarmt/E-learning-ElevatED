package com.esprit.backend.Entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Utilisateur {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String nom;
        private String email;

        @Enumerated(EnumType.STRING)
        private Role role;


        public Utilisateur() {}

        public Utilisateur(String nom, String email, Role role) {
                this.nom = nom;
                this.email = email;
                this.role = role;
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

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public Role getRole() {
                return role;
        }

        public void setRole(Role role) {
                this.role = role;
        }


}
