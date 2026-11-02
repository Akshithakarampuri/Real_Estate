package com.estateai.controller;

import com.estateai.model.Notification;
import com.estateai.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Fetching notifications for: {}", email);
        return ResponseEntity.ok(notificationService.getNotifications(email));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<List<Notification>> markAsRead(
            @PathVariable String id,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Marking notification {} as read for: {}", id, email);
        return ResponseEntity.ok(notificationService.markAsRead(id, email));
    }

    @PutMapping("/read-all")
    public ResponseEntity<List<Notification>> markAllAsRead(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Marking all notifications as read for: {}", email);
        return ResponseEntity.ok(notificationService.markAllAsRead(email));
    }
}
