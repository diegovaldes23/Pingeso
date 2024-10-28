package com.confitescordova.entities;

import lombok.Data;

import java.util.List;

@Data
public class Product {
    private Long id;
    private String name;
    private List<String> categories;
    private List<Variant> variants;
    private String description;
    private List<Image> images;
    private String seo_title;
    private String seo_description;
    private Boolean free_shipping;
}
