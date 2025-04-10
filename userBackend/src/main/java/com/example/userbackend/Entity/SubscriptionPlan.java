package com.example.userbackend.Entity;

import com.example.userbackend.Enum.PlanType;
import jakarta.persistence.*;;
import lombok.Data;

@Data
@Entity
@Table(name = "subscription_plans")
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PlanType type; // FREE, PREMIUM_MONTHLY, PREMIUM_YEARLY, etc.

    private String name;
    private String description;
    private Double price;
    private Integer durationDays; // Durée en jours (30 pour mensuel, 365 pour annuel)

}
