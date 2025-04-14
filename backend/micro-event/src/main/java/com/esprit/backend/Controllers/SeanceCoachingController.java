package com.esprit.backend.Controllers;

import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Services.SeanceCoachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seances")
public class SeanceCoachingController {

    @Autowired
    private SeanceCoachingService seanceService;

    @GetMapping
    public List<SeanceCoaching> getAllSeances() {
        return seanceService.getAllSeances();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeanceCoaching> getSeance(@PathVariable Long id) {
        SeanceCoaching seance = seanceService.getById(id);
        return seance != null ? ResponseEntity.ok(seance) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public SeanceCoaching createSeance(@RequestBody SeanceCoaching seance) {
        return seanceService.createSeance(seance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeance(@PathVariable Long id, @RequestBody SeanceCoaching seance) {
        SeanceCoaching updated = seanceService.updateSeance(id, seance);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Séance non trouvée avec l'ID : " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeance(@PathVariable Long id) {
        seanceService.deleteSeance(id);
        return ResponseEntity.noContent().build();
    }
}
