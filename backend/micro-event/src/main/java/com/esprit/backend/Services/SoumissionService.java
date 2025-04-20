package com.esprit.backend.Services;

import com.esprit.backend.Clients.UserClient;
import com.esprit.backend.DTO.User;
import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Entities.Participation;
import com.esprit.backend.Entities.Soumission;
import com.esprit.backend.Repositories.ParticipationRepository;
import com.esprit.backend.Repositories.SoumissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SoumissionService {
    @Autowired
    SoumissionRepository repo;
    @Autowired
    ParticipationRepository participationRepo;
    @Autowired
    UserClient userClient;

    public Soumission submit(Long userId, Long hackathonId, String reponse) {
        User user = userClient.getUserById(userId);
        System.out.println("📩 Soumission: userId=" + userId + ", hackathonId=" + hackathonId);

        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }

        Participation p = participationRepo.findByUserIdAndHackathonId(userId, hackathonId);
        if (p == null) {
            System.err.println(" Aucune participation trouvée pour hackathonId=" + hackathonId + " et userId=" + userId);
            throw new RuntimeException("Not registered");
        }
        //  Vérifie si une soumission existe déjà
        boolean existeDeja = repo.existsByUserIdAndHackathonId(userId, hackathonId);
        if (existeDeja) {
            throw new RuntimeException("Soumission déjà existante");
        }

        LocalDateTime now = LocalDateTime.now();
        Hackathon hackathon = p.getHackathon();

        if (now.isBefore(hackathon.getDateDebut()) || now.isAfter(hackathon.getDateFin())) {
            throw new RuntimeException("Not within allowed time");
        }

        Soumission s = new Soumission();
        s.setUserId(userId);
        s.setEmail(user.getEmail()); // 🛠️ Voici la ligne que tu dois ajouter !
        s.setReponse(reponse);
        s.setHackathon(hackathon);
        s.setDateSoumission(now);

        return repo.save(s);
    }
    public List<Soumission> getSoumissionsByHackathon(Long hackathonId) {
        List<Soumission> soumissions = repo.findByHackathonId(hackathonId);

        return soumissions.stream().map(s -> {
            User user = userClient.getUserById(s.getUserId());
            s.setEmail(user.getEmail());
            return s;
        }).toList();
    }
    public User getUserById(Long id) {
        return userClient.getUserById(id);
    }

}

