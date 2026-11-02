package com.estateai.controller;

import com.estateai.model.Inquiry;
import com.estateai.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
@Slf4j
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<List<Inquiry>> getInquiries(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        log.info("Fetching inquiries for: {}", email);
        return ResponseEntity.ok(inquiryService.getInquiries(email));
    }

    @PostMapping
    public ResponseEntity<Inquiry> sendInquiry(
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        String propertyId = body.get("propertyId");
        String propertyTitle = body.get("propertyTitle");
        String message = body.get("message");
        String buyerEmail = authentication != null ? authentication.getName() : body.get("buyerEmail");
        String buyerName = body.get("buyerName");

        log.info("Sending inquiry for property: {} by {}", propertyId, buyerEmail);
        Inquiry created = inquiryService.sendInquiry(propertyId, propertyTitle, message, buyerName, buyerEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<Inquiry> replyInquiry(
            @PathVariable String id,
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        String text = body.get("text");
        String sender = body.getOrDefault("sender", "seller");
        log.info("Replying to inquiry {} by sender: {}", id, sender);
        return ResponseEntity.ok(inquiryService.replyInquiry(id, text, sender));
    }
}
