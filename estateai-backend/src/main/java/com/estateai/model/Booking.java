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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String propertyId;
    private String propertyTitle;
    private String propertyLocation;
    private Long propertyPrice;
    private String propertyImage;

    private String buyerId;
    private String buyerName;
    private String buyerEmail;
    private String buyerPhone;

    private String sellerId;

    private String date;
    private String time;
    private String notes;

    @Builder.Default
    private String status = "Pending"; // Pending, Confirmed, Completed, Cancelled

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
