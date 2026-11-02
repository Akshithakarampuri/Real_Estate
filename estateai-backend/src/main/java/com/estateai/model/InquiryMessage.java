package com.estateai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryMessage {
    private String id;
    private String sender; // 'buyer', 'seller', 'agent'
    private String text;
    private String time;
    private Instant timestamp;
}
