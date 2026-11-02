package com.estateai.service;

import com.estateai.model.Booking;

import java.util.List;

public interface BookingService {

    List<Booking> getBookings(String userEmail);

    Booking createBooking(Booking booking, String userEmail);

    Booking updateBookingStatus(String bookingId, String status, String date, String time);
}
