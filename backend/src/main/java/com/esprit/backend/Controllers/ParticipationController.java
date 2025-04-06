package com.esprit.backend.Controllers;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Entities.Participation;
import com.esprit.backend.Services.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/participations")
public class ParticipationController {
    @Autowired
    ParticipationService participationService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam String email, @RequestParam Long hackathonId) {
        try {
            Participation participation = participationService.register(email, hackathonId);
            return ResponseEntity.ok(participation);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Une erreur interne est survenue.");
        }
    }


    @DeleteMapping("/unregister")
    public ResponseEntity<?> unregister(@RequestParam String email, @RequestParam Long hackathonId) {
        participationService.unregister(email, hackathonId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyParticipations(@RequestParam String email) {
        return ResponseEntity.ok(participationService.getMyParticipations(email));
    }
    @GetMapping("/mine")
    public List<Hackathon> getMyHackathons(@RequestParam String email) {
        return participationService.getMyHackathons(email);
    }

}
