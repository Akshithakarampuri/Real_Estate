package com.estateai.repository;

import com.estateai.model.Inquiry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends MongoRepository<Inquiry, String> {

    List<Inquiry> findByBuyerEmailOrderByTimestampDesc(String buyerEmail);

    List<Inquiry> findBySellerIdOrderByTimestampDesc(String sellerId);

    List<Inquiry> findAllByOrderByTimestampDesc();
}
