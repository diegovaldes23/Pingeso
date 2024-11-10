package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class InventoryLevel {
    private Long id;
    private Long variant_id;
    private String location_id;
    private Integer stock;
}
