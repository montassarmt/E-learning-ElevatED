package com.partnershipmanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Partnership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idPartnership;
    float score;
    @Enumerated(EnumType.STRING)
    PartnershipStatus partnershipStatus;

    @ManyToOne
    Entreprise entreprise;

    // Many-to-one relationship: Many applications can be related to one proposal
    @ManyToOne
    @JoinColumn(name = "proposal_id",referencedColumnName = "idProposal")
    @JsonIgnore
    private Proposal proposals;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="partnership")
    @JsonIgnore
    private Set<Assessment> Assesements;

}