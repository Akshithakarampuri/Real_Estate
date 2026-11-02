package com.estateai.repository;

import com.estateai.model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends MongoRepository<Property, String> {

    List<Property> findBySellerId(String sellerId);

    List<Property> findBySellerEmail(String sellerEmail);

    List<Property> findByCityIgnoreCase(String city);

    List<Property> findByStatus(String status);

    List<Property> findByVerified(boolean verified);

    @Query("{ '$or': [ { 'status': ?0 }, { 'verified': ?1 } ] }")
    List<Property> findPendingOrUnverified(String status, boolean verified);
}
