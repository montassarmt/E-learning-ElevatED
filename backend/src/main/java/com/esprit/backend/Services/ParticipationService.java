package com.esprit.backend.Services;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Entities.Participation;
import com.esprit.backend.Entities.User;
import com.esprit.backend.Repositories.HackathonRepository;
import com.esprit.backend.Repositories.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Objects;

@Service
public class ParticipationService {

    @Autowired
    private ParticipationRepository participationRepository;
    @Autowired private HackathonRepository hackathonRepository;
    @Autowired private UserService userService; // ou UserRepository si JPA

    public Participation register(String userEmail, Long hackathonId) {
        if (participationRepository.existsByUserEmailAndHackathonId(userEmail, hackathonId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already registered");
        }

        User user = userService.findByEmail(userEmail);
        Hackathon hackathon = hackathonRepository.findById(hackathonId)
                .orElseThrow(() -> new RuntimeException("Hackathon not found"));

        Participation p = new Participation();
        p.setUser(user);
        p.setHackathon(hackathon);

        return participationRepository.save(p);
    }

    public void unregister(String userEmail, Long hackathonId) {
        Participation p = participationRepository.findByUserEmailAndHackathonId(userEmail, hackathonId);
        participationRepository.delete(p);
    }

    public List<Participation> getMyParticipations(String email) {
        return participationRepository.findByUserEmail(email);
    }
    public List<Hackathon> getMyHackathons(String email) {
        List<Participation> participations = participationRepository.findByUserEmail(email);

        System.out.println("📬 Recherche de participations pour : " + email);
        participations.forEach(p ->
                System.out.println("📍 Participation trouvée pour : " + p.getUser().getEmail() + ", hackathon: " + p.getHackathon().getId())
        );

        return participations.stream()
                .map(Participation::getHackathon)
                .filter(Objects::nonNull)
                .toList();
    }


}

