package com.estateai.service;

import com.estateai.model.Inquiry;

import java.util.List;

public interface InquiryService {

    List<Inquiry> getInquiries(String userEmail);

    Inquiry sendInquiry(String propertyId, String propertyTitle, String message, String buyerName, String buyerEmail);

    Inquiry replyInquiry(String inquiryId, String text, String sender);
}
