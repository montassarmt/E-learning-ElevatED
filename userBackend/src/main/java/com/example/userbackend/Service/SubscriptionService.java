package com.example.userbackend.Service;

import com.example.userbackend.Entity.SubscriptionPlan;
import com.example.userbackend.Entity.User;
import com.example.userbackend.Entity.UserSubscription;
import com.example.userbackend.Repository.SubscriptionPlanRepository;
import com.example.userbackend.Repository.UserRepository;
import com.example.userbackend.Repository.UserSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionPlanRepository planRepository;

    @Autowired
    private UserSubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StripeService stripeService; // Service pour Stripe/PayPal

    // Créer un plan d'abonnement (Admin)
    public SubscriptionPlan createPlan(SubscriptionPlan plan) {
        return planRepository.save(plan);
    }

    // Souscrire à un plan (User)
    public UserSubscription subscribe(Long userId, Long planId, String paymentToken) {
        User user = userRepository.findById(userId).orElseThrow();
        SubscriptionPlan plan = planRepository.findById(planId).orElseThrow();

        // Désactiver les abonnements existants
        subscriptionRepository.findByUserIdAndIsActiveTrue(userId).ifPresent(sub -> {
            sub.setActive(false);
            subscriptionRepository.save(sub);
        });

        // Paiement via Stripe
        String paymentId = stripeService.charge(paymentToken, plan.getPrice());

        // Créer un nouvel abonnement
        UserSubscription subscription = new UserSubscription();
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusDays(plan.getDurationDays()));
        subscription.setActive(true);
        subscription.setPaymentId(paymentId);

        return subscriptionRepository.save(subscription);
    }

    // Mettre à jour un abonnement (Upgrade/Downgrade)
    public UserSubscription updateSubscription(Long subscriptionId, Long newPlanId) {
        UserSubscription subscription = subscriptionRepository.findById(subscriptionId).orElseThrow();
        SubscriptionPlan newPlan = planRepository.findById(newPlanId).orElseThrow();

        subscription.setPlan(newPlan);
        subscription.setEndDate(subscription.getStartDate().plusDays(newPlan.getDurationDays()));

        return subscriptionRepository.save(subscription);
    }

    // Annuler un abonnement
    public void cancelSubscription(Long subscriptionId) {
        UserSubscription subscription = subscriptionRepository.findById(subscriptionId).orElseThrow();
        subscription.setActive(false);
        subscriptionRepository.save(subscription);
    }
    public List<SubscriptionPlan> getAllPlans() {
        return planRepository.findAll();
    }
}