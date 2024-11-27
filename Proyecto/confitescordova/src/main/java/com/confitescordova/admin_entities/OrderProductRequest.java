package com.confitescordova.admin_entities;

import lombok.Data;

@Data
public class OrderProductRequest {
    private Long id_product;
    private Integer cant;
}