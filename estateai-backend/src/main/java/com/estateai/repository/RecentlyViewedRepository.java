package com.estateai.repository;

import com.estateai.model.RecentlyViewed;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecentlyViewedRepository extends MongoRepository<RecentlyViewed, String> {

    List<RecentlyViewed> findByUserIdOrderByViewedAtDesc(String userId);

    Optional<RecentlyViewed> findByUserIdAndPropertyId(String userId, String propertyId);
}
