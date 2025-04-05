package com.esprit.backend.Controllers;

import com.esprit.backend.Entities.Hackathon;
import com.esprit.backend.Entities.SeanceCoaching;
import com.esprit.backend.Services.HackathonService;
import com.esprit.backend.Services.SeanceCoachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/evenements")
public class EvenementController {


        @Autowired
        private HackathonService hackathonService;

        @Autowired
        private SeanceCoachingService seanceCoachingService;

        @GetMapping
        public List<Object> getAllEvenements() {
            List<Hackathon> hackathons = hackathonService.getAllHackathons();
            List<SeanceCoaching> seances = seanceCoachingService.getAllSeances();

            List<Object> evenements = new ArrayList<>();
            evenements.addAll(hackathons);
            evenements.addAll(seances);

            return evenements;
        }

}

