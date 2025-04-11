package com.partnershipmanagement.Services;


import com.partnershipmanagement.configurations.ZoomConfigurations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Service
public class ZoomService {
    private final WebClient webClient;
    private final ZoomConfigurations zoomConfig;

   /* public String createMeeting(MeetingRequest request) {
        String accessToken = getAccessToken();

        ZoomMeetingResponse response = webClient.post()
                .uri(zoomConfig.getBaseUrl() + "/users/me/meetings")
                .header("Authorization", "Bearer " + accessToken)
                .bodyValue(createMeetingRequest(request))
                .retrieve()
                .bodyToMono(ZoomMeetingResponse.class)
                .block();

        return response.getJoinUrl();
    }*/

 /*   private String getAccessToken() {
        return webClient.post()
                .uri("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" + zoomConfig.getAccountId())
                .headers(headers -> headers.setBasicAuth(zoomConfig.getClientId(), zoomConfig.getClientSecret()))
                .retrieve()
                .bodyToMono(ZoomTokenResponse.class)
                .map(ZoomTokenResponse::getAccessToken)
                .block();
    }*/

   /* private Map<String, Object> createMeetingRequest(MeetingRequest request) {
        return Map.of(
                "topic", request.getTopic(),
                "type", 2, // Scheduled meeting
                "start_time", request.getStartTime().format(DateTimeFormatter.ISO_DATE_TIME),
                "duration", request.getDurationMinutes(),
                "settings", Map.of("host_video", true, "participant_video", true)
        );
    }*/
}
