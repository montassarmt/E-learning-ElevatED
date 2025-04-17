package com.example.userbackend.Controller;

import com.example.userbackend.Entity.UserSubscription;
import com.example.userbackend.Service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class UserSubscriptionController {
    private final SubscriptionService subscriptionService;

    @Autowired
    public UserSubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    public ResponseEntity<?> createSubscription(
            @RequestParam Long userId,
            @RequestParam Long planId,
            @RequestParam String paymentMethodId,
            @RequestParam(required = false, defaultValue = "false") boolean autoRenew) {

        UserSubscription subscription = subscriptionService.subscribe(
                userId, planId, paymentMethodId, autoRenew
        );

        return ResponseEntity.ok(subscription);
    }

    @PutMapping("/{subscriptionId}")
    public ResponseEntity<UserSubscription> updateSubscription(
            @PathVariable Long subscriptionId,
            @RequestParam Long newPlanId,
            @RequestParam(required = false) Boolean autoRenew) {
        return subscriptionService.updateSubscription(subscriptionId, newPlanId, autoRenew)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{subscriptionId}")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long subscriptionId) {
        if (subscriptionService.cancelSubscription(subscriptionId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{subscriptionId}/auto-renew")
    public ResponseEntity<UserSubscription> updateAutoRenew(
            @PathVariable Long subscriptionId,
            @RequestParam boolean autoRenew) {
        try {
            return ResponseEntity.ok(
                    subscriptionService.setAutoRenew(subscriptionId, autoRenew)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSubscription>> getUserSubscriptions(
            @PathVariable Long userId,
            @RequestParam(required = false, defaultValue = "false") boolean activeOnly) {
        return ResponseEntity.ok(
                subscriptionService.getUserSubscriptions(userId, activeOnly)
        );
    }}
