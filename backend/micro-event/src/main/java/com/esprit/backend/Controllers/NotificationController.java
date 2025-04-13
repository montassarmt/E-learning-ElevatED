package com.esprit.backend.Controllers;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Entities.NotificationMessage;
import com.esprit.backend.Entities.Participation;
import com.esprit.backend.Repositories.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ParticipationRepository participationRepository;

    // 🔔 Notifier les utilisateurs 15 minutes avant le début de leur hackathon
    @Scheduled(fixedRate = 60000) // toutes les 60s
    public void notifyUpcomingHackathons() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime targetTime = now.plusMinutes(15);

        List<Participation> participations = participationRepository.findAll();

        for (Participation p : participations) {
            Hackathon h = p.getHackathon();

            if (h != null && h.getDateDebut().isAfter(now) && h.getDateDebut().isBefore(targetTime)) {
                String email = p.getUserEmail(); // ✅ utilisation directe du champ email
                NotificationMessage msg = new NotificationMessage(email, "🔔 Le hackathon '" + h.getNom() + "' commence bientôt !");

                messagingTemplate.convertAndSendToUser(email, "/topic/notifications", msg);
                System.out.println("📢 Notification envoyée à : " + email);
            }
        }
    }

    // ✅ Pour tester avec Postman
    @PostMapping("/test-notification")
    public void testNotification(@RequestParam String email) {
        NotificationMessage msg = new NotificationMessage(email, "🔔 Ceci est une notification de test");
        messagingTemplate.convertAndSendToUser(email, "/topic/notifications", msg);
        System.out.println("📨 Notification de test envoyée à : " + email);
    }
}
