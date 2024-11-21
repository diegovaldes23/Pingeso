package com.confitescordova.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products_quantity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Products_Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_quantities; // atributo llave

    private Long id_product; // id del producto pedido
    private Integer quantity; // cantidad de producto pedido
}
