package com.estateai.controller;

import com.estateai.model.AgentAppointment;
import com.estateai.model.AgentLead;
import com.estateai.service.AgentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
@Slf4j
public class AgentController {

    private final AgentService agentService;

    @GetMapping("/{agentId}/clients")
    public ResponseEntity<List<AgentLead>> getClients(@PathVariable String agentId) {
        log.info("Fetching leads for agent: {}", agentId);
        return ResponseEntity.ok(agentService.getClients(agentId));
    }

    @PostMapping("/{agentId}/clients")
    public ResponseEntity<AgentLead> createClient(
            @PathVariable String agentId,
            @RequestBody AgentLead lead
    ) {
        log.info("Creating lead for agent: {}", agentId);
        AgentLead created = agentService.createClient(lead, agentId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/clients/{clientId}/status")
    public ResponseEntity<AgentLead> updateClientStatus(
            @PathVariable String clientId,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");
        log.info("Updating client {} status to {}", clientId, status);
        return ResponseEntity.ok(agentService.updateClientStatus(clientId, status));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAgentAnalytics() {
        return ResponseEntity.ok(agentService.getAgentAnalytics());
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AgentAppointment>> getAppointments() {
        return ResponseEntity.ok(agentService.getAppointments());
    }
}
