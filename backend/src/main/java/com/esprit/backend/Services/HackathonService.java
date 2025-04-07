package com.esprit.backend.Services;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Repositories.HackathonRepository;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;

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
        try {
            Date startDate = Date.from(hackathon.getDateDebut().atZone(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(hackathon.getDateFin().atZone(ZoneId.systemDefault()).toInstant());

            Event googleEvent = googleCalendarService.createGoogleCalendarEvent(
                    hackathon.getNom(), startDate, endDate, hackathon.getDescription()
            );

            Event createdEvent = googleCalendarService.addEventToCalendar(googleEvent);
            savedHackathon.setGoogleCalendarEventId(createdEvent.getId());
            return hackathonRepository.save(savedHackathon);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return savedHackathon;
    }

    public Hackathon updateHackathon(Long id, Hackathon newHackathon) {
        return hackathonRepository.findById(id).map(existingHackathon -> {
            boolean dateChanged = !existingHackathon.getDateDebut().equals(newHackathon.getDateDebut()) ||
                    !existingHackathon.getDateFin().equals(newHackathon.getDateFin());

            boolean infoChanged = !existingHackathon.getNom().equals(newHackathon.getNom()) ||
                    !existingHackathon.getDescription().equals(newHackathon.getDescription());

            existingHackathon.setNom(newHackathon.getNom());
            existingHackathon.setTheme(newHackathon.getTheme());
            existingHackathon.setDescription(newHackathon.getDescription());
            existingHackathon.setDateDebut(newHackathon.getDateDebut());
            existingHackathon.setDateFin(newHackathon.getDateFin());

            Hackathon updatedHackathon = hackathonRepository.save(existingHackathon);

            if ((dateChanged || infoChanged) && existingHackathon.getGoogleCalendarEventId() != null) {
                try {
                    Date startDate = Date.from(newHackathon.getDateDebut().atZone(ZoneId.systemDefault()).toInstant());
                    Date endDate = Date.from(newHackathon.getDateFin().atZone(ZoneId.systemDefault()).toInstant());

                    Event updatedEvent = new Event()
                            .setSummary(newHackathon.getNom())
                            .setDescription(newHackathon.getDescription())
                            .setStart(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(startDate)))
                            .setEnd(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(endDate)));

                    googleCalendarService.updateGoogleCalendarEvent(existingHackathon.getGoogleCalendarEventId(), updatedEvent);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            return updatedHackathon;
        }).orElse(null);
    }

    public void deleteHackathon(Long id) {
        hackathonRepository.findById(id).ifPresent(h -> {
            try {
                if (h.getGoogleCalendarEventId() != null) {
                    googleCalendarService.deleteGoogleCalendarEvent(h.getGoogleCalendarEventId());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            hackathonRepository.deleteById(id);
        });
    }
}
