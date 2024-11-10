package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ShippingCarrier {
    private Long id; // Identificador único del transportista de envío
    private String name; // Nombre del transportista de envío
    private String callback_url; // URL para obtener tarifas de envío (debe ser HTTPS)
    private List<String> types; // Tipos de envío compatibles: "ship" y/o "pickup"
    private Boolean active; // Si el transportista de envío está activo o no
    private String created_at; // Fecha de creación en formato ISO 8601
    private String updated_at; // Fecha de última actualización en formato ISO 8601
    private List<ShippingCarrierOption> options; // Opciones de envío asociadas al transportista
}
