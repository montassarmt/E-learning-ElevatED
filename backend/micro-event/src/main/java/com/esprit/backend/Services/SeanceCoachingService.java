package com.esprit.backend.Services;

import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Repositories.SeanceCoachingRepository;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
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

            Event createdEvent = googleCalendarService.addEventToCalendar(googleEvent);
            seance.setGoogleCalendarEventId(createdEvent.getId());
            return seanceCoachingRepository.save(seance);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return saved;
    }

    public SeanceCoaching getById(Long id) {
        return seanceCoachingRepository.findById(id).orElse(null);
    }

    public void deleteSeance(Long id) {
        seanceCoachingRepository.findById(id).ifPresent(s -> {
            try {
                if (s.getGoogleCalendarEventId() != null) {
                    googleCalendarService.deleteGoogleCalendarEvent(s.getGoogleCalendarEventId());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            seanceCoachingRepository.deleteById(id);
        });
    }

    public SeanceCoaching updateSeance(Long id, SeanceCoaching updatedSeance) {
        return seanceCoachingRepository.findById(id).map(existingSeance -> {
            boolean dateChanged = !existingSeance.getDateDebut().equals(updatedSeance.getDateDebut()) ||
                    !existingSeance.getDateFin().equals(updatedSeance.getDateFin());

            boolean infoChanged = !existingSeance.getNom().equals(updatedSeance.getNom()) ||
                    !existingSeance.getDescription().equals(updatedSeance.getDescription());

            existingSeance.setNom(updatedSeance.getNom());
            existingSeance.setDescription(updatedSeance.getDescription());
            existingSeance.setDateDebut(updatedSeance.getDateDebut());
            existingSeance.setDateFin(updatedSeance.getDateFin());

            SeanceCoaching savedSeance = seanceCoachingRepository.save(existingSeance);

            if ((dateChanged || infoChanged) && existingSeance.getGoogleCalendarEventId() != null) {
                try {
                    Date start = Date.from(updatedSeance.getDateDebut().atZone(ZoneId.systemDefault()).toInstant());
                    Date end = Date.from(updatedSeance.getDateFin().atZone(ZoneId.systemDefault()).toInstant());

                    Event updatedEvent = new Event()
                            .setSummary(updatedSeance.getNom())
                            .setDescription(updatedSeance.getDescription())
                            .setStart(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(start)))
                            .setEnd(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(end)));

                    googleCalendarService.updateGoogleCalendarEvent(existingSeance.getGoogleCalendarEventId(), updatedEvent);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            return savedSeance;
        }).orElse(null);
    }
}
