package com.example.userbackend.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public String charge(String token, Double amount) {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) (amount * 100)); // en cents
        chargeParams.put("currency", "usd");
        chargeParams.put("source", token);
        chargeParams.put("description", "Paiement test via Stripe");

        try {
            Charge charge = Charge.create(chargeParams);
            return charge.getId(); // ou charge.getStatus(), selon ce que tu veux
        } catch (StripeException e) {
            throw new RuntimeException("Paiement échoué: " + e.getMessage());
        }
}}