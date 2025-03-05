package com.esprit.backend.Services;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Repositories.HackathonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HackathonService {

    @Autowired
    private HackathonRepository hackathonRepository;

    public List<Hackathon> getAllHackathons() {
        return hackathonRepository.findAll();
    }

    public Hackathon getHackathonById(Long id) {
        Optional<Hackathon> hackathon = hackathonRepository.findById(id);
        return hackathon.orElse(null);
    }

    public Hackathon createHackathon(Hackathon hackathon) {
        return hackathonRepository.save(hackathon);
    }

    public Hackathon updateHackathon(Long id, Hackathon hackathonDetails) {
        return hackathonRepository.findById(id)
                .map(hackathon -> {
                    hackathon.setNom(hackathonDetails.getNom());
                    hackathon.setTheme(hackathonDetails.getTheme());
                    hackathon.setDescription(hackathonDetails.getDescription());
                    hackathon.setDateDebut(hackathonDetails.getDateDebut());
                    hackathon.setDateFin(hackathonDetails.getDateFin());
                    return hackathonRepository.save(hackathon);
                }).orElse(null);
    }

    public void deleteHackathon(Long id) {
        hackathonRepository.deleteById(id);
    }
}
