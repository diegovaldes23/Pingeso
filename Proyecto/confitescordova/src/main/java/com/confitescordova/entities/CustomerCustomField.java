package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class CustomerCustomField {
    private UUID id; // Identificador único universal del campo personalizado
    private String name; // Nombre del campo personalizado
    private String description; // Descripción del campo personalizado (opcional)
    private ValueType value_type; // Tipo de valor (text_list, text, numeric, date)
    private String owner_resource; // Propietario del campo personalizado (ej., "customer")
    private Boolean read_only = false; // Indica si es solo lectura (por defecto false)
    private List<String> values; // Lista de valores para el campo personalizado (solo para value_type text_list)

    // Enum para representar los tipos de valor
    public enum ValueType {
        TEXT_LIST,
        TEXT,
        NUMERIC,
        DATE
    }
}
