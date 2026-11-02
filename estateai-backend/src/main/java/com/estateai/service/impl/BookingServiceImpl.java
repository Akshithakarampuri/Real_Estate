package com.estateai.service.impl;

import com.estateai.exception.ResourceNotFoundException;
import com.estateai.model.Booking;
import com.estateai.model.Property;
import com.estateai.model.Role;
import com.estateai.model.User;
import com.estateai.repository.BookingRepository;
import com.estateai.repository.PropertyRepository;
import com.estateai.repository.UserRepository;
import com.estateai.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Override
    public List<Booking> getBookings(String userEmail) {
        if (userEmail == null) {
            return bookingRepository.findAllByOrderByCreatedAtDesc();
        }

        User user = userRepository.findByEmail(userEmail.toLowerCase()).orElse(null);
        if (user == null || user.getRole() == Role.ADMIN) {
            return bookingRepository.findAllByOrderByCreatedAtDesc();
        }

        if (user.getRole() == Role.SELLER || user.getRole() == Role.AGENT) {
            return bookingRepository.findBySellerIdOrderByCreatedAtDesc(user.getId());
        }

        List<Booking> buyerBookings = bookingRepository.findByBuyerEmailOrderByCreatedAtDesc(user.getEmail());
        if (buyerBookings.isEmpty()) {
            return bookingRepository.findAllByOrderByCreatedAtDesc();
        }
        return buyerBookings;
    }

    @Override
    public Booking createBooking(Booking booking, String userEmail) {
        if (booking.getId() == null || booking.getId().isBlank()) {
            booking.setId("BK-" + (1000 + new Random().nextInt(9000)));
        }

        if (userEmail != null) {
            userRepository.findByEmail(userEmail.toLowerCase()).ifPresent(user -> {
                booking.setBuyerId(user.getId());
                booking.setBuyerEmail(user.getEmail());
                if (booking.getBuyerName() == null) booking.setBuyerName(user.getName());
                if (booking.getBuyerPhone() == null) booking.setBuyerPhone(user.getPhone());
            });
        }

        if (booking.getPropertyId() != null) {
            propertyRepository.findById(booking.getPropertyId()).ifPresent(prop -> {
                if (booking.getPropertyTitle() == null) booking.setPropertyTitle(prop.getTitle());
                if (booking.getPropertyLocation() == null) booking.setPropertyLocation(prop.getLocation() + ", " + prop.getCity());
                if (booking.getPropertyPrice() == null) booking.setPropertyPrice(prop.getPrice());
                if (booking.getPropertyImage() == null && prop.getImages() != null && !prop.getImages().isEmpty()) {
                    booking.setPropertyImage(prop.getImages().get(0));
                }
                if (booking.getSellerId() == null) booking.setSellerId(prop.getSellerId());
            });
        }

        booking.setStatus("Pending");
        booking.setCreatedAt(Instant.now());

        log.info("Created visit booking: {}", booking.getId());
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBookingStatus(String bookingId, String status, String date, String time) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if (status != null) booking.setStatus(status);
        if (date != null) booking.setDate(date);
        if (time != null) booking.setTime(time);
        booking.setUpdatedAt(Instant.now());

        log.info("Updated booking {}: status={}", bookingId, status);
        return bookingRepository.save(booking);
    }
}
