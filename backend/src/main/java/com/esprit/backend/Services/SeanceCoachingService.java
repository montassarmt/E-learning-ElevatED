package com.esprit.backend.Services;

import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Entities.Utilisateur;
import com.esprit.backend.Entities.Role;
import com.esprit.backend.Repositories.SeanceCoachingRepository;
import com.esprit.backend.Repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeanceCoachingService {
    @Autowired
    private SeanceCoachingRepository seanceCoachingRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // ✅ 1. Lister toutes les séances
    public List<SeanceCoaching> getAllSeances() {
        return seanceCoachingRepository.findAll();
    }

    // ✅ 2. Récupérer une séance par ID
    public SeanceCoaching getSeanceById(Long id) {
        return seanceCoachingRepository.findById(id).orElse(null);
    }

    // ✅ 3. Créer une séance
    public SeanceCoaching createSeance(SeanceCoaching seanceCoaching) {
        return seanceCoachingRepository.save(seanceCoaching);
    }

    // ✅ 4. Modifier une séance
    public SeanceCoaching updateSeance(Long id, SeanceCoaching newSeance) {
        return seanceCoachingRepository.findById(id).map(existingSeance -> {
            existingSeance.setNom(newSeance.getNom());
            existingSeance.setDescription(newSeance.getDescription());
            existingSeance.setDateDebut(newSeance.getDateDebut());
            existingSeance.setDateFin(newSeance.getDateFin());
            existingSeance.setLienMeet(newSeance.getLienMeet());
            return seanceCoachingRepository.save(existingSeance);
        }).orElseThrow(() -> new IllegalArgumentException("Séance non trouvée"));
    }

    // ✅ 5. Supprimer une séance
    public void deleteSeance(Long id) {
        seanceCoachingRepository.deleteById(id);
    }

    // ✅ 6. Ajouter un étudiant à une séance
    public SeanceCoaching addEtudiantToSeance(Long seanceId, Long etudiantId) {
        SeanceCoaching seance = getSeanceById(seanceId);
        Utilisateur etudiant = utilisateurRepository.findById(etudiantId)
                .orElseThrow(() -> new IllegalArgumentException("Étudiant non trouvé"));

        if (!etudiant.getRole().equals(Role.ETUDIANT)) {
            throw new IllegalArgumentException("Seuls les étudiants peuvent rejoindre une séance.");
        }

        seance.getEtudiants().add(etudiant);
        return seanceCoachingRepository.save(seance);
    }

    // ✅ 7. Affecter un lien Meet
    public SeanceCoaching assignMeetLink(Long seanceId, String lienMeet) {
        SeanceCoaching seance = getSeanceById(seanceId);
        seance.setLienMeet(lienMeet);
        return seanceCoachingRepository.save(seance);
    }
}
