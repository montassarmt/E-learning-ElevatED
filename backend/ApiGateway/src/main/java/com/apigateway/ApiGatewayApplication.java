package com.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("partnership-management", r -> r.path("/Partnership/partnerships/**")
                        .uri("lb://partnershipmanagement"))
                .route("entreprise-management", r -> r.path("/Partnership/entreprises/**")
                        .uri("lb://partnershipmanagement"))
                .route("proposal-management", r -> r.path("/Partnership/proposals/**")
                        .uri("lb://partnershipmanagement"))

                //route de zeineb
                .route("hackathon-Management", r -> r.path("/api/hackathons/**")
                        .uri("lb://backend2"))

                .route("coaching-Management", r -> r.path("/api/seances/**")
                        .uri("lb://backend2"))

                .route("participation-Management", r -> r.path("/api/participations/**")
                        .uri("lb://backend2"))

                //route de feedbacks
                .route("feedback", r->r.path("/api/feedbacks/**")
                        .uri("lb://e-learning"))
                .route("chatbot", r->r.path("/api/chatbot/**")
                        .uri("lb://e-learning"))
                .route("userss", r->r.path("/api/userss/**")
                        .uri("lb://e-learning"))
                .route("chat", r->r.path("/chat")
                        .uri("lb://e-learning"))
                //route de user
                .route("user-auth", r -> r.path("/api/auth/**")
                        .uri("lb://userbackend"))
                .route("user-crud", r -> r.path("/api/users/**")
                        .uri("lb://userbackend"))
                //route de test et examens
                .route("test", r->r.path("/api/tests/**")
                        .uri("lb://learning"))
                .route("question", r->r.path("/api/questions/**")
                        .uri("lb://learning"))

                    // ✅ Route vers le microservice Node.js Subscription
                .route("subscription-service", r -> r.path("/api/subscriptions/**")
                        .uri("lb://subscription-service"))


                .build();


    }


}
