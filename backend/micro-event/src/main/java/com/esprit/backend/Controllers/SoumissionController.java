package com.esprit.backend.Controllers;

import com.esprit.backend.DTO.User;
import com.esprit.backend.Entities.Soumission;
import com.esprit.backend.Repositories.SoumissionRepository;
import com.esprit.backend.Services.SoumissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/soumissions")
public class SoumissionController {
    @Autowired
    SoumissionService service;
    @Autowired
    private SoumissionRepository soumissionRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestParam Long userId,
                                    @RequestParam Long hackathonId,
                                    @RequestBody String reponse) {
        return ResponseEntity.ok(service.submit(userId, hackathonId, reponse));
    }
    @GetMapping("/by-hackathon/{id}")
    public ResponseEntity<List<Soumission>> getByHackathon(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSoumissionsByHackathon(id));
    }
    @PutMapping("/{id}/noter")
    public ResponseEntity<?> noterSoumission(@PathVariable Long id, @RequestParam Integer note) {
        Soumission s = soumissionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        s.setNote(note);
        soumissionRepository.save(s);

        // ✅ enrichir avec email :
        User user = service.getUserById(s.getUserId());
        if (user != null) {
            s.setEmail(user.getEmail());
        }

        // 💡 Ajout dynamique des badges
        if (user != null) {
            s.setEmail(user.getEmail());

            List<String> badges = new ArrayList<>();

            if (note >= 18) {
                badges.add("⭐ Réponse excellente");
            }

            int totalSoumissions = soumissionRepository.countByUserId(s.getUserId());
            if (totalSoumissions >= 3) {
                badges.add("🥈 Répondant actif");
            }

            user.setBadges(badges); // 👈 setter dans DTO User
        }
        return ResponseEntity.ok(s);

    }
    @GetMapping("/user-badges")
    public ResponseEntity<?> getBadgesByEmail(@RequestParam String email) {
        List<Soumission> soums = soumissionRepository.findByEmail(email);

        List<String> badges = new ArrayList<>();

        long highScore = soums.stream().filter(s -> s.getNote() != null && s.getNote() >= 18).count();
        if (highScore > 0) {
            badges.add("⭐ Réponse excellente");
        }

        if (soums.size() >= 3) {
            badges.add("🥈 Répondant actif");
        }

        return ResponseEntity.ok().body(new Object() {
            public List<String> getBadges() {
                return badges;
            }
        });
    }



}
