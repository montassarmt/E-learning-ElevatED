package com.esprit.backend.Controllers;
import com.esprit.backend.Entities.Hackathon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.esprit.backend.Services.HackathonService;

import java.util.List;

@RestController
@RequestMapping("/api/hackathons")
public class HackathonController {
    @Autowired
    private HackathonService hackathonService;

    @GetMapping
    public List<Hackathon> getAllHackathons() {
        return hackathonService.getAllHackathons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hackathon> getHackathonById(@PathVariable Long id) {
        Hackathon hackathon = hackathonService.getHackathonById(id);
        return hackathon != null ? ResponseEntity.ok(hackathon) : ResponseEntity.notFound().build();
    }


    @PostMapping
    public Hackathon createHackathon(@RequestBody Hackathon hackathon) {
        return hackathonService.createHackathon(hackathon);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Hackathon> updateHackathon(@PathVariable Long id, @RequestBody Hackathon hackathon) {
        Hackathon updatedHackathon = hackathonService.updateHackathon(id, hackathon);
        return updatedHackathon != null ? ResponseEntity.ok(updatedHackathon) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHackathon(@PathVariable Long id) {
        hackathonService.deleteHackathon(id);
        return ResponseEntity.noContent().build();
    }
}
