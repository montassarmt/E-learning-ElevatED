package com.esprit.backend.Services;

import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Repositories.SeanceCoachingRepository;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class SeanceCoachingService {

    @Autowired
    private SeanceCoachingRepository seanceCoachingRepository;

    @Autowired
    private GoogleCalendarService googleCalendarService;

    public List<SeanceCoaching> getAllSeances() {
        return seanceCoachingRepository.findAll();
    }

    public SeanceCoaching createSeance(SeanceCoaching seance) {
        String roomId = "coaching-" + UUID.randomUUID();
        seance.setLienMeet("http://localhost:4200/video-call?roomID=" + roomId);

        SeanceCoaching saved = seanceCoachingRepository.save(seance);

        try {
            Date start = Date.from(seance.getDateDebut().atZone(ZoneId.systemDefault()).toInstant());
            Date end = Date.from(seance.getDateFin().atZone(ZoneId.systemDefault()).toInstant());

            Event googleEvent = googleCalendarService.createGoogleCalendarEvent(
                    seance.getNom(),
                    start,
                    end,
                    seance.getDescription() + "\nLien : " + seance.getLienMeet()
            );

            googleCalendarService.addEventToCalendar(googleEvent);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return saved;
    }

    public SeanceCoaching getById(Long id) {
        return seanceCoachingRepository.findById(id).orElse(null);
    }

    public void deleteSeance(Long id) {
        seanceCoachingRepository.deleteById(id);
    }
}
