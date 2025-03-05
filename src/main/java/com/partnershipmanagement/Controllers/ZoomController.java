package com.partnershipmanagement.Controllers;

import com.partnershipmanagement.Services.ZoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/zoom")
public class ZoomController {

   // private final ZoomService zoomService;

  //  public ZoomController(ZoomService zoomService) {
      //  this.zoomService = zoomService;
  //  }

    //*@PostMapping("/schedule")
   /* public Mono<ResponseEntity<Map<String, Object>>> scheduleMeeting(
            @RequestParam String topic,
            @RequestParam String startTime,
            @RequestParam int duration,
            @RequestParam String email) {

        return zoomService.scheduleMeeting(topic, startTime, duration, email)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.badRequest().build());
    }*/
}
