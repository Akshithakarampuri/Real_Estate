package com.estateai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyAnalyticsResponse {
    private String propertyId;
    private long totalViews;
    private List<Map<String, Object>> weeklyViews;
    private double conversionRate;
    private int inquiryCount;
    private int visitRequests;
    private int favoritesCount;
    private List<Map<String, Object>> demographics;
}
