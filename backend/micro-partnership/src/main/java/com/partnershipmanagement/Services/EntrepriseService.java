package com.partnershipmanagement.Services;

import com.partnershipmanagement.DTO.UserDTO;
import com.partnershipmanagement.Entities.Entreprise;
import com.partnershipmanagement.Entities.Role;
import com.partnershipmanagement.Entities.User;
import com.partnershipmanagement.Feign.UserClient;
import com.partnershipmanagement.Repositories.EntrepriseRepository;
import com.partnershipmanagement.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class EntrepriseService {
    @Autowired
    UserClient userClient;
    @Autowired
    EntrepriseRepository entrepriseRepository;
    @Autowired
    UserRepository userRepository;

    public Entreprise createEntreprise(Entreprise ent) {
        return entrepriseRepository.save(ent);
    }

    public void removeEntreprise(int id) {
        entrepriseRepository.deleteById(id);
    }

    public Entreprise updateEntreprise(int id, Entreprise ent) {
        Entreprise existingEntreprise = entrepriseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entreprise not found with ID: " + id));

        // Update only non-null fields from the request body
        if (ent.getNameEntreprise() != null) existingEntreprise.setNameEntreprise(ent.getNameEntreprise());
        if (ent.getAddressEntreprise() != null) existingEntreprise.setAddressEntreprise(ent.getAddressEntreprise());
        if (ent.getDescriptionEntreprise() != null) existingEntreprise.setDescriptionEntreprise(ent.getDescriptionEntreprise());
        if (ent.getEmailEntreprise() != null) existingEntreprise.setEmailEntreprise(ent.getEmailEntreprise());
        if (ent.getPhoneEntreprise() != null) existingEntreprise.setPhoneEntreprise(ent.getPhoneEntreprise());

        // Save the updated entreprise
        return entrepriseRepository.save(existingEntreprise);
    }

    public Entreprise addEntrepriseAndAffectToUser(Entreprise ent, Long userId) {
        UserDTO user = userClient.getUserById(userId);
        if (user == null) throw new RuntimeException("User not found");

        ent.setPartnerId(userId);
        return entrepriseRepository.save(ent);
    }

    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    public Entreprise getEntrepriseById(int id) {
        return entrepriseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entreprise not found with ID: " + id));
    }

   /* public String assignEntrepriseToUser(String nameEnt, String cin) {
        Entreprise ent = entrepriseRepository.findByName(nameEnt);
        if (ent == null) {
            return "Entreprise does not exist";
        }

        // Check if the user exists
        User user = userRepository.findByCin(cin);
        if (user == null) {
            return "User does not exist";
        }

        // Check if the user has the correct role
        if (user.getRole() != Role.partner) {
            return "User is not a partner";
        }

        // Assign the entreprise to the user
        ent.setPartner(user);
        entrepriseRepository.save(ent);

        return "Entreprise successfully assigned to user";
    }*/

    }

