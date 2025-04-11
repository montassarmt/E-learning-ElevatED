package com.partnershipmanagement.configurations;

import lombok.Getter;
import lombok.Setter;
import org.quartz.JobDetail;
import org.quartz.SimpleTrigger;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "zoom")
@Getter
@Setter
public class ZoomConfigurations {

        private String clientId;
        private String clientSecret;
        private String accountId;
        private String baseUrl = "https://api.zoom.us/v2";


    // WebClient configuration for Zoom API
    @Bean
    public WebClient zoomWebClient(WebClient.Builder webClientBuilder, ZoomConfigurations zoomConfig) {
        return webClientBuilder
                .baseUrl(zoomConfig.getBaseUrl())
                .defaultHeader("Accept", "application/json")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }




}

