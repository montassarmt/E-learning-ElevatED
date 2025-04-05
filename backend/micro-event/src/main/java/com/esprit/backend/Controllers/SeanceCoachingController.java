package com.esprit.backend.Controllers;
import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Services.SeanceCoachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/seances")
@CrossOrigin(origins = "http://localhost:4200")
public class SeanceCoachingController {

    @Autowired
    private SeanceCoachingService seanceService;

    @GetMapping
    public List<SeanceCoaching> getAllSeances() {
        return seanceService.getAllSeances();
    }

    @PostMapping
    public SeanceCoaching createSeance(@RequestBody SeanceCoaching seance) {
        return seanceService.createSeance(seance);
    }

    @GetMapping("/{id}")
    public SeanceCoaching getSeance(@PathVariable Long id) {
        return seanceService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSeance(@PathVariable Long id) {
        seanceService.deleteSeance(id);
    }
}

