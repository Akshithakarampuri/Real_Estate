package com.estateai.service;

import com.estateai.model.AgentAppointment;
import com.estateai.model.AgentLead;

import java.util.List;
import java.util.Map;

public interface AgentService {

    List<AgentLead> getClients(String agentId);

    AgentLead createClient(AgentLead lead, String agentId);

    AgentLead updateClientStatus(String clientId, String status);

    Map<String, Object> getAgentAnalytics();

    List<AgentAppointment> getAppointments();
}
