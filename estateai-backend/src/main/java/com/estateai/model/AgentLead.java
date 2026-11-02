package com.estateai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "agent_leads")
public class AgentLead {

    @Id
    private String id;

    private String agentId;

    private String name;
    private String email;
    private String phone;
    private String budget;
    private String preferredLocation;
    private String propertyType;

    @Builder.Default
    private String stage = "NEW"; // NEW, CONTACTED, VISITED, NEGOTIATION, CLOSED

    @Builder.Default
    private int score = 85;

    private String notes;

    @CreatedDate
    private Instant createdAt;
}
