package com.estateai.repository;

import com.estateai.model.AgentLead;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentLeadRepository extends MongoRepository<AgentLead, String> {

    List<AgentLead> findByAgentIdOrderByCreatedAtDesc(String agentId);

    List<AgentLead> findAllByOrderByCreatedAtDesc();
}
