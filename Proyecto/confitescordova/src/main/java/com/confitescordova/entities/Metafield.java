package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Metafield {
    private Long id; // Identificador único del metafield
    private String namespace; // Namespace donde tiene sentido el metafield
    private String key; // Clave que identifica el metafield en el namespace
    private String description; // Descripción opcional del significado del metafield
    private String value; // Valor del metafield
    private String owner_resource; // Tipo de entidad al que está asociado el metafield (ej., Product, Order)
    private Long owner_id; // Identificador de la entidad a la que está asociado el metafield
    private String created_at; // Fecha de creación en formato ISO 8601
    private String updated_at; // Fecha de última actualización en formato ISO 8601
}
