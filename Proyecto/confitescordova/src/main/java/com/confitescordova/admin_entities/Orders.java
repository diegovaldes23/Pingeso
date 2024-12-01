package com.confitescordova.admin_entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders {
    // Atributos de la entidad
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_order; // atributo llave
    private String name; // Nombre del cliente
    private String phone; // Telefono
    private String city;
    private LocalDate order_date; // fecha de orden
    private LocalDate creation_date; // fecha de creación de la orden
    private String dispatch; // Despacho
    private String address; // Dirección
    private Double total; // Total (costo productos + costo de envio)
    private Double subtotal; // Subtotal (costo de los productos)
    private Double shipping_cost; // costo de envio
    private Double initialPayment; // Pago inicial
    private String status; // Estado
    private String customer_type; // Tipo de cliente (cliente consumo, cliente negocio)
    private String source; // Fuente de la compra (Organico, Facebook Adds)
    private LocalDate delivery_date; // orden de entrega
    private String email;
    private String comment;
}
