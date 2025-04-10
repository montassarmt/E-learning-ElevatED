package com.example.userbackend.Repository;

import com.example.userbackend.Entity.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
    List<UserSubscription> findByUserId(Long userId);
    Optional<UserSubscription> findByUserIdAndIsActiveTrue(Long userId);
}
