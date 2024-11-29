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
    private Long id_order; // Atributo llave

    private String name; // Nombre del cliente
    private String phone; // Teléfono
    private String region; // Región
    private String commune; // Comuna
    private String address; // Dirección
    private LocalDate order_date; // Fecha de orden
    private LocalDate creation_date; // Fecha de creación de la orden
    private Double subtotal; // Subtotal (costo de los productos)
    private Double shipping_cost; // Costo de envío
    private Double total; // Total (costo productos + costo de envío)
    private String status; // Estado
    private LocalDate delivery_date; // Fecha de entrega
    private String purchase_source; // Fuente de la compra (Orgánico, Facebook Adds)
    private String customer_type; // Tipo de cliente (cliente consumo, cliente negocio)
    private Double initial_payment; // Pago inicial
    private String description; // Descripción

    /*
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderProduct> orderProducts = new ArrayList<>();
     */












}
