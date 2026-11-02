package com.estateai.repository;

import com.estateai.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByBuyerEmailOrderByCreatedAtDesc(String buyerEmail);

    List<Booking> findByBuyerIdOrderByCreatedAtDesc(String buyerId);

    List<Booking> findBySellerIdOrderByCreatedAtDesc(String sellerId);

    List<Booking> findAllByOrderByCreatedAtDesc();
}
