package com.estateai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "inquiries")
public class Inquiry {

    @Id
    private String id;

    private String propertyId;
    private String propertyTitle;

    private String buyerId;
    private String buyerName;
    private String buyerEmail;

    private String sellerId;

    private String lastMessage;
    private Instant timestamp;

    @Builder.Default
    private boolean unread = true;

    @Builder.Default
    private List<InquiryMessage> messages = new ArrayList<>();
}
