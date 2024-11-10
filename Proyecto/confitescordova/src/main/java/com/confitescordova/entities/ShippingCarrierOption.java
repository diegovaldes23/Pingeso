package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ShippingCarrierOption {
    private Long id; // Identificador único de la opción de transportista de envío
    private String code; // Código único asociado a la opción
    private String name; // Nombre de la opción de transportista
    private Integer additional_days; // Días adicionales configurables para el tiempo de entrega estimado
    private Double additional_cost; // Costo adicional configurable para el precio al consumidor
    private Boolean allow_free_shipping; // Si permite envío gratis
    private Boolean active; // Si la opción está activa o no
    private String created_at; // Fecha de creación en formato ISO 8601
    private String updated_at; // Fecha de última actualización en formato ISO 8601
}
