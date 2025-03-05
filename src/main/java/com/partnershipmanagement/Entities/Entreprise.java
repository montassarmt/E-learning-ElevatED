package com.partnershipmanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
@Getter
@Setter
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idEntreprise;
    @Column(unique = true, nullable = false)
    String nameEntreprise;
    String addressEntreprise;
    String phoneEntreprise;
    String emailEntreprise;
    String descriptionEntreprise;

    @JsonIgnore
    @OneToOne
    User partner;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="entreprise")
    private List<Partnership> partnerships;


}