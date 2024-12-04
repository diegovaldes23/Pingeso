package com.confitescordova.admin_entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private long id_product; // id del producto pedido

    private String name;

    private Integer quantity; // Cantidad del producto en la orden

    private String description; // descripción del pedido

    private Double unit_cost;

    private Double cost; // costo del pedido de producto (costo producto x cantidad)

    @ManyToOne
    @JoinColumn(name = "id_order", referencedColumnName = "id", updatable = false)
    private Orders order;
}