package com.esprit.microservice.apigateway2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class Apigateway2Application {

    public static void main(String[] args) {
        SpringApplication.run(Apigateway2Application.class, args);
    }

}
