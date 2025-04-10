package com.example.userbackend.Controller;

import com.example.userbackend.Entity.UserSubscription;
import com.example.userbackend.Service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class UserSubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<UserSubscription> subscribe(
            @RequestParam Long userId,
            @RequestParam Long planId,
            @RequestParam String paymentToken
    ) {
        return ResponseEntity.ok(subscriptionService.subscribe(userId, planId, paymentToken));
    }

    @PutMapping("/{subscriptionId}/upgrade")
    public ResponseEntity<UserSubscription> upgradeSubscription(
            @PathVariable Long subscriptionId,
            @RequestParam Long newPlanId
    ) {
        return ResponseEntity.ok(subscriptionService.updateSubscription(subscriptionId, newPlanId));
    }

    @DeleteMapping("/{subscriptionId}/cancel")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long subscriptionId) {
        subscriptionService.cancelSubscription(subscriptionId);
        return ResponseEntity.noContent().build();
    }
}