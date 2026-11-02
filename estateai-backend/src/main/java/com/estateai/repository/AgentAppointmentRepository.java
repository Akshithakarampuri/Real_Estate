package com.estateai.repository;

import com.estateai.model.AgentAppointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentAppointmentRepository extends MongoRepository<AgentAppointment, String> {

    List<AgentAppointment> findByAgentId(String agentId);
}
