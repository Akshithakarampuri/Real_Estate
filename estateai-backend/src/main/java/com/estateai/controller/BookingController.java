package com.estateai.controller;

import com.estateai.model.Booking;
import com.estateai.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Slf4j
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Fetching bookings for user: {}", email);
        return ResponseEntity.ok(bookingService.getBookings(email));
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody Booking booking,
            Authentication authentication
    ) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Creating booking for property: {} by {}", booking.getPropertyId(), email);
        Booking created = bookingService.createBooking(booking, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable String id,
            @RequestBody Map<String, Object> body
    ) {
        String status = (String) body.get("status");
        String date = (String) body.get("date");
        String time = (String) body.get("time");
        log.info("Updating booking {} status to {}", id, status);
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status, date, time));
    }
}
