package com.confitescordova.entities;

import java.util.List;
import java.util.Map;

import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails.Address;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Customer {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String identification; // Identificación del cliente (en Brasil, por ejemplo, sería el CPF/CNPJ)
    private String note; // Notas del administrador de la tienda sobre el cliente
    private Address default_address; // Dirección de envío predeterminada del cliente
    private List<Address> addresses; // Lista de direcciones de envío del cliente
    private Address billing_address; // Dirección de facturación del cliente (cobro)
    private String billing_number; // Número de facturación del cliente
    private String billing_floor; // Piso de facturación del cliente
    private String billing_locality; // Localidad de facturación del cliente
    private String billing_zipcode; // Código postal de facturación del cliente
    private String billing_city; // Ciudad de facturación del cliente
    private String billing_province; // Provincia de facturación del cliente
    private String billing_country; // Código del país de facturación del cliente
    private Map<String, Object> extra; // Información adicional en formato JSON
    private Double total_spent; // Cantidad total de dinero que el Cliente ha gastado en la tienda
    private String total_spent_currency; // La moneda del total gastado en formato ISO 4217
    private Long last_order_id; // El id del último pedido del Cliente
    private Boolean active; // "true" si el Cliente activó su cuenta. "false" si no lo ha hecho
    private String created_at; // Fecha en la que se creó el Cliente en formato ISO 8601
    private String updated_at; // Fecha en la que se actualizó por última vez el Cliente en formato ISO 8601
    private Boolean accepts_marketing; // Indica si el comprador aceptó recibir ofertas y novedades por correo electrónico. Campo de solo lectura en la API.
    private String accepts_marketing_updated_at; // Fecha en la que el comprador actualizó su preferencia respecto a recibir novedades por correo electrónico.
}
