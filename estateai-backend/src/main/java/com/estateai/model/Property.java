package com.estateai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "properties")
public class Property {

    @Id
    private String id;

    private String title;
    private String description;
    private Long price;
    private String propertyType;
    private String location;
    private String city;
    private String state;
    private Integer bhk;
    private Integer bathrooms;
    private Integer area;
    private String furnishing;
    private String possession;
    private Integer constructionYear;

    @Builder.Default
    private List<String> amenities = new ArrayList<>();

    @Builder.Default
    private List<String> images = new ArrayList<>();

    private Coordinates coordinates;

    private String sellerId;
    private String sellerName;
    private String sellerPhone;
    private String sellerEmail;
    private String sellerType; // Owner, Agent, Builder

    @Builder.Default
    private String status = "active"; // active, pending, rejected

    @Builder.Default
    private boolean verified = false;

    @Builder.Default
    private long viewsCount = 0;

    @Builder.Default
    private int fraudScore = 0;

    @Builder.Default
    private int matchPercentage = 85;

    @Builder.Default
    private List<String> matchReasons = new ArrayList<>();

    private String rejectionReason;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
