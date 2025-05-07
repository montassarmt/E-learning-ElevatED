package com.example.userbackend.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
@Entity
@Table(name = "user_metrics")

public class UserMetrics {

        @Id
        private Long userId;

        @OneToOne
        @MapsId
        @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_user_metrics_user"))
        private User user;

        @Column(name = "session_duration", nullable = false)
        private Integer sessionDuration;

        @Column(name = "sessions_per_week", nullable = false)
        private Integer sessionsPerWeek;

        @Column(name = "course_completion", nullable = false)
        private Boolean courseCompletion;

        @Column(name = "quiz_scores", nullable = false, precision = 5, scale = 2)
        private BigDecimal quizScores;

        @Column(name = "account_age_days", nullable = false)
        private Integer accountAgeDays;

        @Column(name = "recent_activity_days", nullable = false)
        private Integer recentActivityDays;

        @Column(name = "course_data_science", nullable = false)
        private Boolean courseDataScience = false;

        @Column(name = "course_web_development", nullable = false)
        private Boolean courseWebDevelopment = false;


    }

