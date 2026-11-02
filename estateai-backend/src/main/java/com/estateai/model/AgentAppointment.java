package com.estateai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "agent_appointments")
public class AgentAppointment {

    @Id
    private String id;

    private String agentId;
    private String clientName;
    private String phone;
    private String propertyTitle;
    private String date;
    private String time;
    private String type; // Site Walkthrough, Contract Signing Prep, Video Inspection
    private String status; // Confirmed, Pending, Cancelled
}
