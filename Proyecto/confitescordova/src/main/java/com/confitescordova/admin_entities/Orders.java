package com.confitescordova.admin_entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


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

    @ExcelProperty("Name")
    private String name; // Nombre del cliente

    @ExcelProperty("Phone")
    private String phone; // Teléfono

    @ExcelProperty("Region")
    private String region; // Región del cliente

    @ExcelProperty("Commune")
    private String commune; // Comuna del cliente

    @ExcelProperty("Order Date")
    private LocalDate order_date; // Fecha de orden

    @ExcelProperty("Customer Type")
    private String customer_type; // Tipo de cliente (cliente consumo, cliente negocio)

    @ExcelProperty("Purchase Source")
    private String purchase_source; // Fuente de la compra (Orgánico, Facebook Adds)

    @ExcelProperty("Shipping Cost")
    private Double shipping_cost; // Costo de envío

    @ExcelProperty("Subtotal")
    private Double subtotal; // Subtotal (costo de los productos)

    @ExcelProperty("Total")
    private Double total; // Total (costo productos + costo de envío)

    @ExcelProperty("Initial Payment")
    private Double initial_payment; // Pago inicial

    @ExcelProperty("Status")
    private String status; // Estado

    @ExcelProperty("Delivery Date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate delivery_date; // Fecha de entrega (cuando se completó el pedido)

    @ExcelProperty("Description")
    private String description;

    @ExcelProperty("Address")
    private String address; // Dirección

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @ToString.Exclude // Excluye para evitar ciclos en toString
    private List<OrderProduct> orderProducts;

    @ExcelProperty("Email")
    private String email;

    @ExcelProperty("Creation Date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate creation_date; // Fecha de creación de la orden

    @ExcelProperty("External Order ID")
    private Long externalOrderId;

    @ExcelProperty("Username creator")
    private String username_creator; // username del creador en nuestra plataforma
}