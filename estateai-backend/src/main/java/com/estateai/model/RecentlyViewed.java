package com.estateai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recently_viewed")
public class RecentlyViewed {

    @Id
    private String id;

    private String userId;

    private String propertyId;

    private Instant viewedAt;
}
