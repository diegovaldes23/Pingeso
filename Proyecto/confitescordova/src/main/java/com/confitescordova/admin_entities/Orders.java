package com.confitescordova.admin_entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Long id; // atributo llave
    private String name; // Nombre del cliente
    private String phone; // Telefono
    private String region; // Región del cliente
    private String commune; // Comuna del cliente
    private LocalDate order_date; // fecha de orden
    private String customer_type; // Tipo de cliente (cliente consumo, cliente negocio)
    private String purchase_source; // Fuente de la compra (Organico, Facebook Adds)

    // Products

    private Double shipping_cost; // costo de envio
    private Double subtotal; // Subtotal (costo de los productos)
    private Double total; // Total (costo productos + costo de envio)
    private Double initial_payment; // Pago inicial
    private String status; // Estado
    private LocalDate delivery_date; // fecha de entrega (cuando se completó el pedido)
    private String description;
    private String address; // Dirección

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderProduct> orderProducts;
    ////
    private String email;

    ////
    private LocalDate creation_date; // fecha de creación de la orden

    private Long externalOrderId;
}
