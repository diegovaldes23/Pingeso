package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Coupon {
    private Long id;
    private String code;
    private String type;
    private Boolean valid;
    private String start_date;
    private String end_date;
    private String deleted_at;
    private Integer max_uses;
    private Double value;
    private Boolean includes_shipping;
    private Boolean first_consumer_purchase;
    private Double min_price;
    private List<String> categories; //Cambiar por lista de categorías
    private List<Product> products;
    private Boolean combines_with_other_discounts;
}
