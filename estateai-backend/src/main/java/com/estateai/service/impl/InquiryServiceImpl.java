package com.estateai.service.impl;

import com.estateai.exception.ResourceNotFoundException;
import com.estateai.model.Inquiry;
import com.estateai.model.InquiryMessage;
import com.estateai.model.Property;
import com.estateai.model.Role;
import com.estateai.model.User;
import com.estateai.repository.InquiryRepository;
import com.estateai.repository.PropertyRepository;
import com.estateai.repository.UserRepository;
import com.estateai.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Override
    public List<Inquiry> getInquiries(String userEmail) {
        if (userEmail == null) {
            return inquiryRepository.findAllByOrderByTimestampDesc();
        }

        User user = userRepository.findByEmail(userEmail.toLowerCase()).orElse(null);
        if (user == null || user.getRole() == Role.ADMIN) {
            return inquiryRepository.findAllByOrderByTimestampDesc();
        }

        if (user.getRole() == Role.SELLER || user.getRole() == Role.AGENT) {
            return inquiryRepository.findBySellerIdOrderByTimestampDesc(user.getId());
        }

        List<Inquiry> buyerInqs = inquiryRepository.findByBuyerEmailOrderByTimestampDesc(user.getEmail());
        if (buyerInqs.isEmpty()) {
            return inquiryRepository.findAllByOrderByTimestampDesc();
        }
        return buyerInqs;
    }

    @Override
    public Inquiry sendInquiry(String propertyId, String propertyTitle, String message, String buyerName, String buyerEmail) {
        String finalTitle = propertyTitle;
        String sellerId = null;

        if (propertyId != null) {
            Property prop = propertyRepository.findById(propertyId).orElse(null);
            if (prop != null) {
                if (finalTitle == null) finalTitle = prop.getTitle();
                sellerId = prop.getSellerId();
            }
        }

        String inqId = "INQ-" + (200 + new Random().nextInt(800));

        InquiryMessage msg = InquiryMessage.builder()
                .id("msg-" + System.currentTimeMillis())
                .sender("buyer")
                .text(message)
                .time("Just now")
                .timestamp(Instant.now())
                .build();

        Inquiry inquiry = Inquiry.builder()
                .id(inqId)
                .propertyId(propertyId)
                .propertyTitle(finalTitle != null ? finalTitle : "Property Inquiry")
                .buyerName(buyerName != null ? buyerName : "Interested Buyer")
                .buyerEmail(buyerEmail != null ? buyerEmail : "buyer@example.com")
                .sellerId(sellerId)
                .lastMessage(message)
                .timestamp(Instant.now())
                .unread(true)
                .messages(new ArrayList<>(List.of(msg)))
                .build();

        log.info("Creating new inquiry: {}", inqId);
        return inquiryRepository.save(inquiry);
    }

    @Override
    public Inquiry replyInquiry(String inquiryId, String text, String sender) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found: " + inquiryId));

        InquiryMessage msg = InquiryMessage.builder()
                .id("msg-" + System.currentTimeMillis())
                .sender(sender != null ? sender : "seller")
                .text(text)
                .time("Just now")
                .timestamp(Instant.now())
                .build();

        if (inquiry.getMessages() == null) {
            inquiry.setMessages(new ArrayList<>());
        }
        inquiry.getMessages().add(msg);
        inquiry.setLastMessage(text);
        inquiry.setTimestamp(Instant.now());
        inquiry.setUnread(false);

        log.info("Replied to inquiry: {}", inquiryId);
        return inquiryRepository.save(inquiry);
    }
}
