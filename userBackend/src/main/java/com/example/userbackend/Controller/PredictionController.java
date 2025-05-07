package com.example.userbackend.Controller;

import com.example.userbackend.Payload.PredictionRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/predict")
public class PredictionController {

    private static final Logger logger = LoggerFactory.getLogger(PredictionController.class);
    private final String PYTHON_API = "http://localhost:5000/predict";

    @PostMapping
    public ResponseEntity<?> predict(@RequestBody PredictionRequest request) {
        logger.info("Début de la prédiction pour userID: {}", request.getUserId());

        RestTemplate restTemplate = new RestTemplate();

        try {
            logger.debug("Envoi à l'API Python: {}", PYTHON_API);

            Map<String, Object> response = restTemplate.postForObject(
                    PYTHON_API,
                    Map.of("user_id", request.getUserId()),
                    Map.class
            );

            logger.info("Prédiction réussie pour userID: {}", request.getUserId());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("ERREUR lors de la prédiction pour userID: {} - Message: {}",
                    request.getUserId(),
                    e.getMessage(),
                    e); // Stacktrace complète

            return ResponseEntity.status(500).body(
                    Map.of(
                            "code", "prediction_error",
                            "message", e.getMessage(),
                            "status", 500
                    )
            );
        }
    }
}