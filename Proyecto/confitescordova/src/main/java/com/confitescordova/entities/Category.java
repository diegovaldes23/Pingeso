package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Category {
    private Long id;
    private List<String> name; // Lista de nombres en cada idioma soportado por la tienda
    private List<String> description; // Lista de descripciones en HTML en cada idioma soportado
    private List<String> handle; // Lista de URL-friendly strings generados desde los nombres
    private Long parent; // Id de la categoría padre, null si no tiene
    private List<Long> subcategories; // Ids de las subcategorías de primer nivel
    private String google_shopping_category; // Categoría seleccionada de la taxonomía de Google
    private String created_at; // Fecha de creación en formato ISO 8601
    private String updated_at; // Fecha de última actualización en formato ISO 8601
}
