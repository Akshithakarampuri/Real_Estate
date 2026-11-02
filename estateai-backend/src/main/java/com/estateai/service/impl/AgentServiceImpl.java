package com.estateai.service.impl;

import com.estateai.exception.ResourceNotFoundException;
import com.estateai.model.AgentAppointment;
import com.estateai.model.AgentLead;
import com.estateai.repository.AgentAppointmentRepository;
import com.estateai.repository.AgentLeadRepository;
import com.estateai.service.AgentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AgentServiceImpl implements AgentService {

    private final AgentLeadRepository agentLeadRepository;
    private final AgentAppointmentRepository agentAppointmentRepository;

    @Override
    public List<AgentLead> getClients(String agentId) {
        List<AgentLead> leads = agentLeadRepository.findAllByOrderByCreatedAtDesc();
        if (leads.isEmpty()) {
            return List.of();
        }
        return leads;
    }

    @Override
    public AgentLead createClient(AgentLead lead, String agentId) {
        if (lead.getId() == null || lead.getId().isBlank()) {
            lead.setId("lead-" + System.currentTimeMillis());
        }
        lead.setAgentId(agentId);
        if (lead.getStage() == null) lead.setStage("NEW");
        if (lead.getScore() == 0) lead.setScore(70 + new Random().nextInt(25));
        lead.setCreatedAt(Instant.now());

        log.info("Creating new agent client lead: {}", lead.getId());
        return agentLeadRepository.save(lead);
    }

    @Override
    public AgentLead updateClientStatus(String clientId, String status) {
        AgentLead lead = agentLeadRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client lead not found: " + clientId));

        lead.setStage(status);
        log.info("Updated lead {} stage to {}", clientId, status);
        return agentLeadRepository.save(lead);
    }

    @Override
    public Map<String, Object> getAgentAnalytics() {
        return Map.of(
                "activeListingsCount", 12,
                "totalLeads", 28,
                "visitsThisMonth", 19,
                "dealsClosed", 8,
                "conversionRate", "28.5%",
                "monthlyRevenue", List.of(
                        Map.of("month", "Apr", "deals", 2, "commission", 340000),
                        Map.of("month", "May", "deals", 3, "commission", 480000),
                        Map.of("month", "Jun", "deals", 4, "commission", 620000),
                        Map.of("month", "Jul", "deals", 3, "commission", 510000),
                        Map.of("month", "Aug", "deals", 5, "commission", 780000),
                        Map.of("month", "Sep", "deals", 6, "commission", 920000)
                ),
                "pipelineBreakdown", List.of(
                        Map.of("stage", "NEW", "count", 7, "value", "₹14.2 Cr"),
                        Map.of("stage", "CONTACTED", "count", 6, "value", "₹11.8 Cr"),
                        Map.of("stage", "VISITED", "count", 5, "value", "₹9.5 Cr"),
                        Map.of("stage", "NEGOTIATION", "count", 4, "value", "₹8.4 Cr"),
                        Map.of("stage", "CLOSED", "count", 6, "value", "₹12.6 Cr")
                )
        );
    }

    @Override
    public List<AgentAppointment> getAppointments() {
        List<AgentAppointment> appointments = agentAppointmentRepository.findAll();
        if (!appointments.isEmpty()) {
            return appointments;
        }

        return List.of(
                AgentAppointment.builder()
                        .id("apt-1")
                        .clientName("Siddharth Malhotra")
                        .phone("+91 98201 11223")
                        .propertyTitle("The Altitude Sky Villa")
                        .date("2026-09-12")
                        .time("10:30 AM")
                        .type("Site Walkthrough")
                        .status("Confirmed")
                        .build(),
                AgentAppointment.builder()
                        .id("apt-2")
                        .clientName("Neha Kapoor")
                        .phone("+91 98450 99887")
                        .propertyTitle("Lakeview Grand 3BHK")
                        .date("2026-09-12")
                        .time("03:00 PM")
                        .type("Contract Signing Prep")
                        .status("Confirmed")
                        .build(),
                AgentAppointment.builder()
                        .id("apt-3")
                        .clientName("Karan Johar")
                        .phone("+91 98200 77665")
                        .propertyTitle("Golf Course Heights")
                        .date("2026-09-14")
                        .time("11:00 AM")
                        .type("Video Inspection")
                        .status("Pending")
                        .build()
        );
    }
}
