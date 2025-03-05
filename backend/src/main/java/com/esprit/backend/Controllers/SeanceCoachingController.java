package com.esprit.backend.Controllers;
import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Services.SeanceCoachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/seances")
public class SeanceCoachingController {
    @Autowired
    private SeanceCoachingService seanceCoachingService;

    @GetMapping
    public List<SeanceCoaching> getAllSeances() {
        return seanceCoachingService.getAllSeances();
    }

    @PostMapping
    public SeanceCoaching createSeance(@RequestBody SeanceCoaching seanceCoaching) {
        return seanceCoachingService.createSeance(seanceCoaching);
    }

    @PutMapping("/{id}/assignMeet")
    public ResponseEntity<SeanceCoaching> assignMeetLink(@PathVariable Long id, @RequestBody String lienMeet) {
        return ResponseEntity.ok(seanceCoachingService.assignMeetLink(id, lienMeet));
    }
}
