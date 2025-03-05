package com.esprit.backend.Services;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Repositories.HackathonRepository;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.ZoneId;
import java.util.Date;

@Service
public class HackathonService {
    @Autowired
    private HackathonRepository hackathonRepository;

    @Autowired
    private GoogleCalendarService googleCalendarService;

    public List<Hackathon> getAllHackathons() {
        return hackathonRepository.findAll();
    }

    public Hackathon getHackathonById(Long id) {
        return hackathonRepository.findById(id).orElse(null);
    }

    public Hackathon createHackathon(Hackathon hackathon) {
        Hackathon savedHackathon = hackathonRepository.save(hackathon);

        // Ajouter le Hackathon à Google Calendar
        try {
            Date startDate = Date.from(hackathon.getDateDebut().atZone(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(hackathon.getDateFin().atZone(ZoneId.systemDefault()).toInstant());

            Event googleEvent = googleCalendarService.createGoogleCalendarEvent(
                    hackathon.getNom(), startDate, endDate, hackathon.getDescription()
            );

            // Suppression de "primary"
            googleCalendarService.addEventToCalendar(googleEvent);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return savedHackathon;
    }

    public Hackathon updateHackathon(Long id, Hackathon hackathon) {
        if (hackathonRepository.existsById(id)) {
            hackathon.setId(id);
            return hackathonRepository.save(hackathon);
        }
        return null;
    }

    public void deleteHackathon(Long id) {
        hackathonRepository.deleteById(id);
    }
}
