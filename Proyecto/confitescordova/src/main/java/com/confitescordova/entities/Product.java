package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Product {
    private Long id;
    @JsonDeserialize(using = CustomNameDeserializer.class)
    private String name; // Nombre en diferentes idiomas
    private Map<String, String> description; // Descripción en diferentes idiomas
    private Map<String, String> handle; // URL amigable en diferentes idiomas
    private List<String> atributes;
    private Boolean published; // Si está publicado o no
    private Boolean free_shipping; // Si tiene envío gratuito
    private Boolean requires_shipping; // Si requiere envío
    private String canonical_url; // URL canónica del producto
    private String video_url; // URL del video
    private Map<String, String> seo_title; // Título SEO en diferentes idiomas
    private Map<String, String> seo_description; // Descripción SEO en diferentes idiomas
    private String brand; // Marca del producto
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ssZ")
    private String created_at; // Fecha de creación
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ssZ")
    private String updated_at; // Fecha de última actualización
    private List<Variant> variants; // Variantes del producto
    private String tags; // Etiquetas del producto
    private List<Image> images; // Imágenes del producto
    private Integer quantity;
    private Double price;
}
