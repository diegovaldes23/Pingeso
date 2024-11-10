package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FulfillmentOrder {
    private Long id; // ULID único para la orden de cumplimiento
    private String number; // Número único de la orden de cumplimiento en la tienda
    private Integer total_quantity; // Cantidad total de artículos
    private Double total_weight; // Peso total
    private Money total_price; // Precio total
    private String assigned_location; // Ubicación asignada
    private List<Product> line_items; // Artículos en la orden
    private FulfillmentOrderRecipient recipient; // Destinatario de la orden
    private FulfillmentOrderShipping shipping; // Información de envío
    private FulfillmentOrderDestination destination; // Destino de la orden
    private List<String> discounts; // Descuentos aplicables
    private String status; // Estado de la orden
    private List<String> status_history; // Historial de estado
    private String tracking_info; // Información de rastreo
    private List<FulfillmentOrderTrackingEvent> tracking_events; // Eventos de rastreo
    private String fulfilled_at; // Fecha de cumplimiento
    private String created_at; // Fecha de creación
    private String updated_at; // Fecha de última actualización
}
