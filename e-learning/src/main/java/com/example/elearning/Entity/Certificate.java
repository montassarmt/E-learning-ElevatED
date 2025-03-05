package com.example.elearning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCertificate;

    @OneToOne
    @JoinColumn(name = "idTest", referencedColumnName = "id")
    private Test test; // One-to-one relationship with Test

    private Date date;
    private String nomCertificate;

}