package com.example.userbackend.Service;

import com.example.userbackend.Security.PaymentException;
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

    public String charge(String token, Double amount) throws PaymentException {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) Math.round(amount * 100)); // in cents
        chargeParams.put("currency", "usd");
        chargeParams.put("source", token);
        chargeParams.put("description", "Payment via Stripe");

        try {
            Charge charge = Charge.create(chargeParams);
            return charge.getId();
        } catch (StripeException e) {
            throw new PaymentException(
                    e.getCode() != null ? e.getCode() : "stripe_error",
                    e.getMessage() != null ? e.getMessage() : "Payment processing failed"
            );
        }
    }
}