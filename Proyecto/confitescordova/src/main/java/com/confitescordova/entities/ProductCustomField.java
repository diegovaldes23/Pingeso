package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ProductCustomField {
    private UUID id; // Identificador único universal del campo personalizado (UUID v4)
    private String name; // Nombre del campo personalizado (máximo 60 caracteres)
    private String description; // Descripción del campo personalizado (máximo 150 caracteres, opcional)
    private ValueType value_type; // Tipo de valor (text_list, text, numeric, date)
    private String owner_resource = "product"; // Propietario del campo personalizado (siempre "product")
    private Boolean read_only = false; // Indica si es solo lectura (por defecto false)
    private List<String> values; // Lista de valores para el campo personalizado (máximo 250 caracteres por valor, solo para text_list)

    // Enum para representar los tipos de valor
    public enum ValueType {
        TEXT_LIST,
        TEXT,
        NUMERIC,
        DATE
    }
}
