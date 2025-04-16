package com.example.elearning.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String status;

    // If users can take tests
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Test> testsTaken;

    // If tutors can create tests
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<Test> testsCreated;

    // If users can earn certificates
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Certificate> certificates;
}