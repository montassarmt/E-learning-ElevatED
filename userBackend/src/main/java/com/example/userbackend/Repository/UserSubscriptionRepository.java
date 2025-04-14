package com.example.userbackend.Repository;

import com.example.userbackend.Entity.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
    List<UserSubscription> findByUserId(Long userId);

    List<UserSubscription> findByUserIdAndIsActiveTrue(Long userId);

    List<UserSubscription> findByEndDateBetweenAndIsActiveTrue(
            LocalDateTime startDate,
            LocalDateTime endDate);

    List<UserSubscription> findByIsActiveTrueAndAutoRenewTrue();

    Optional<UserSubscription> findByIdAndUserId(Long id, Long userId);
}