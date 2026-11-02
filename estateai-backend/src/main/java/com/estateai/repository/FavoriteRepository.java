package com.estateai.repository;

import com.estateai.model.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends MongoRepository<Favorite, String> {

    List<Favorite> findByUserId(String userId);

    Optional<Favorite> findByUserIdAndPropertyId(String userId, String propertyId);

    void deleteByUserIdAndPropertyId(String userId, String propertyId);
}
