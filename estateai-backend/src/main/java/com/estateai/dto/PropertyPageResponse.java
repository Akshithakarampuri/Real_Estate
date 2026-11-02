package com.estateai.dto;

import com.estateai.model.Property;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyPageResponse {
    private List<Property> properties;
    private long total;
    private int page;
    private int totalPages;
}
