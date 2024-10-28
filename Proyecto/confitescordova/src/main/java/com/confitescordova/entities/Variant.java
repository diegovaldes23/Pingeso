package com.confitescordova.entities;

import lombok.Data;

@Data
public class Variant {
    private Long id;
    private String sku;
    private Double price;
    private Integer stock;
}
