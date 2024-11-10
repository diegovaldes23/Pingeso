package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FulfillmentOrderShipping {
    private String type; // Tipo de envío
    private String carrier; // Información del transportista
    private String option; // Opción de envío
    private Money merchant_cost; // Costo para el comerciante
    private Money consumer_cost; // Costo para el consumidor
    private String min_delivery_date; // Fecha mínima de entrega
    private String max_delivery_date; // Fecha máxima de entrega
    private String pickup_details; // Detalles de recogida
    private String extras; // Propiedades adicionales
}
