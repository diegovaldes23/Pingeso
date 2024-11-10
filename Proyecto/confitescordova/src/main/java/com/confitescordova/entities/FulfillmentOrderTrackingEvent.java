package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FulfillmentOrderTrackingEvent {
    private String id; // Identificación del evento de rastreo
    private String status; // Estado del evento
    private String description; // Descripción del evento
    private String address; // Dirección del evento
    private String geolocation; // Geolocalización
    private String happened_at; // Fecha en que ocurrió el evento
    private String estimated_delivery_at; // Fecha estimada de entrega
    private String created_at; // Fecha de creación del evento
    private String updated_at; // Fecha de última actualización del evento
}
