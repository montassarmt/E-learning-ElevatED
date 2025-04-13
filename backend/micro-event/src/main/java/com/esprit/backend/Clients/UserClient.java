package com.esprit.backend.Clients;


import com.esprit.backend.DTO.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "userbackend") // correspond au nom de ton service dans Eureka
public interface UserClient {
    @GetMapping("/api/users/email/{email}")
    User getUserByEmail(@PathVariable String email);
}
