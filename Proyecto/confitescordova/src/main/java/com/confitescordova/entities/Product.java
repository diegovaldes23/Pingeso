package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Product {
    private Long id;
    private Map<String, String> name;
    private Map<String, String> description;
    private Map<String, String> handle; // Añadir el campo handle
    private List<Variant> variants;
    private String canonical_url;
}
