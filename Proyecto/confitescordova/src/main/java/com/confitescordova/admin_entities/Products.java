package com.confitescordova.admin_entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Products {
    // Atributos de la entidad
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product", unique = true, nullable = false) // Asegúrate de definir el nombre explícito
    private Long id_product;

    private String name; // Nombre del cliente

    @Transient
    private String description; // Descripción del producto
    private Double cost; // Precio del producto
}
