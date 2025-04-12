package com.partnershipmanagement.configurations;

import lombok.Getter;
import lombok.Setter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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






}

