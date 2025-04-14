package com.example.userbackend.Service;
import com.example.userbackend.Entity.SubscriptionPlan;
import com.example.userbackend.Entity.User;
import com.example.userbackend.Entity.UserSubscription;
import com.example.userbackend.Repository.SubscriptionPlanRepository;
import com.example.userbackend.Repository.UserRepository;
import com.example.userbackend.Repository.UserSubscriptionRepository;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    private static final int RENEWAL_WARNING_DAYS = 7;

    private final SubscriptionPlanRepository planRepository;
    private final UserSubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final StripeService stripeService;
    private final EmailService emailService;

    @Autowired
    public SubscriptionService(SubscriptionPlanRepository planRepository,
                               UserSubscriptionRepository subscriptionRepository,
                               UserRepository userRepository,
                               StripeService stripeService,
                               EmailService emailService) {
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.stripeService = stripeService;
        this.emailService = emailService;
    }

    @Transactional
    public UserSubscription subscribe(Long userId, Long planId, String paymentMethodId, boolean autoRenew) {
        System.out.println("=== SUBSCRIBE === userId=" + userId + " planId=" + planId + " paymentMethodId=" + paymentMethodId + " autoRenew=" + autoRenew);
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            SubscriptionPlan plan = planRepository.findById(planId)
                    .orElseThrow(() -> new RuntimeException("Plan not found"));

            // Désactiver les abonnements existants
            subscriptionRepository.findByUserIdAndIsActiveTrue(userId)
                    .forEach(sub -> {
                        sub.setActive(false);
                        subscriptionRepository.save(sub);
                    });

            // Processus de paiement avec gestion d'erreur
            String paymentId;
            try {
                paymentId = stripeService.charge(paymentMethodId, plan.getPrice());
            } catch (StripeException e) {

                throw new RuntimeException("Échec du paiement: " + e.getMessage());
            }

            // Créer un nouvel abonnement
            UserSubscription subscription = new UserSubscription();
            subscription.setUser(user);
            subscription.setPlan(plan);
            subscription.setStartDate(LocalDateTime.now());
            subscription.setEndDate(LocalDateTime.now().plusDays(plan.getDurationDays()));
            subscription.setActive(true);
            subscription.setAutoRenew(autoRenew);
            subscription.setPaymentId(paymentId);
            subscription.setPaymentMethodId(paymentMethodId);

            return subscriptionRepository.save(subscription);
        } catch (RuntimeException e) {
            e.printStackTrace();
            // Envoyer un email d'échec si nécessaire
            emailService.sendPaymentFailure(
                    userRepository.findById(userId).get().getEmail(),
                    planRepository.findById(planId).get().getName()
            );
            throw e;
        }
    }

    @Transactional
    public Optional<UserSubscription> updateSubscription(Long subscriptionId, Long newPlanId, Boolean autoRenew) {
        return subscriptionRepository.findById(subscriptionId)
                .map(subscription -> {
                    SubscriptionPlan newPlan = planRepository.findById(newPlanId)
                            .orElseThrow(() -> new RuntimeException("Plan not found"));

                    subscription.setPlan(newPlan);
                    if (autoRenew != null) {
                        subscription.setAutoRenew(autoRenew);
                    }
                    if (subscription.isActive()) {
                        subscription.setEndDate(LocalDateTime.now().plusDays(newPlan.getDurationDays()));
                    }
                    return subscriptionRepository.save(subscription);
                });
    }

    @Transactional
    public boolean cancelSubscription(Long subscriptionId) {
        return subscriptionRepository.findById(subscriptionId)
                .map(subscription -> {
                    subscription.setActive(false);
                    subscription.setAutoRenew(false);
                    subscriptionRepository.save(subscription);
                    return true;
                })
                .orElse(false);
    }

    public UserSubscription setAutoRenew(Long subscriptionId, boolean autoRenew) {
        return subscriptionRepository.findById(subscriptionId)
                .map(subscription -> {
                    subscription.setAutoRenew(autoRenew);
                    return subscriptionRepository.save(subscription);
                })
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
    }

    public List<UserSubscription> getUserSubscriptions(Long userId, boolean activeOnly) {
        return activeOnly
                ? subscriptionRepository.findByUserIdAndIsActiveTrue(userId)
                : subscriptionRepository.findByUserId(userId);
    }

    public SubscriptionPlan createPlan(SubscriptionPlan plan) {
        return planRepository.save(plan);
    }

    public List<SubscriptionPlan> getAllPlans() {
        return planRepository.findAll();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void checkAndRenewSubscriptions() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime warningDate = now.plusDays(RENEWAL_WARNING_DAYS);

        subscriptionRepository.findByEndDateBetweenAndIsActiveTrue(now, warningDate)
                .forEach(subscription -> {
                    if (subscription.isAutoRenew()) {
                        processAutoRenewal(subscription);
                    } else {
                        emailService.sendRenewalReminder(
                                subscription.getUser().getEmail(),
                                subscription.getPlan().getName(),
                                subscription.getEndDate()
                        );
                    }
                });
    }

    private void processAutoRenewal(UserSubscription subscription) {
        try {
            String paymentId = stripeService.charge(
                    subscription.getPaymentMethodId(),
                    subscription.getPlan().getPrice()
            );

            subscription.setStartDate(LocalDateTime.now());
            subscription.setEndDate(LocalDateTime.now().plusDays(subscription.getPlan().getDurationDays()));
            subscription.setPaymentId(paymentId);
            subscriptionRepository.save(subscription);

            emailService.sendRenewalConfirmation(
                    subscription.getUser().getEmail(),
                    subscription.getPlan().getName(),
                    subscription.getEndDate()
            );
        } catch (Exception e) {
            emailService.sendPaymentFailure(
                    subscription.getUser().getEmail(),
                    subscription.getPlan().getName()
            );
        }
    }
}