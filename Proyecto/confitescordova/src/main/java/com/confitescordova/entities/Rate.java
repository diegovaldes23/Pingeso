package com.confitescordova.entities;

import java.util.List;

public class Rate {
    private String name; // Nombre de la tarifa vista por el comprador
    private String code; // Código único asociado a la opción de transportista
    private Double price; // Precio de la tarifa que pagará el comprador
    private String currency; // Moneda de la tarifa (ISO 4217)
    private String type; // Tipo de tarifa: "ship" o "pickup"
    private String address; // Dirección del punto de recogida (solo para "pickup")
    private List<OpenHour> hours; // Horarios del punto de recogida (solo para "pickup")
    private Double price_merchant; // Precio que pagará el comerciante (puede diferir de price)
    private String min_delivery_date; // Fecha mínima estimada de entrega en formato ISO 8601
    private String max_delivery_date; // Fecha máxima estimada de entrega en formato ISO 8601
    private Boolean id_required; // Si el cliente debe proporcionar identificación al realizar la compra
    private Boolean phone_required; // Si el cliente debe proporcionar teléfono al realizar la compra
    private Boolean accepts_cod; // Si se permite pago contra entrega
    private String reference; // Referencia interna de la tarifa
    private Boolean availability; // Si hay disponibilidad para todos
}
