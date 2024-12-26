package com.confitescordova.admin_services;

import com.alibaba.excel.annotation.ExcelProperty;
import com.confitescordova.admin_entities.OrderProduct;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderExcelDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id; // atributo llave

    @ExcelProperty(index = 0)
    private String name; // Nombre del cliente

    @ExcelProperty(index = 1)
    private String phone; // Teléfono

    @ExcelProperty(index = 2)
    private String rawProducts;

    @ExcelProperty(index = 3)
    private Double initial_payment; // Pago inicial

    @ExcelProperty(index = 5)
    private LocalDate order_date; // Fecha de orden

    @ExcelProperty(index = 6)
    private LocalDate delivery_date;

    @ExcelProperty(index = 7)
    private String despachooretiro;

    @ExcelProperty(index = 8)
    private String address; // Dirección

    @ExcelProperty(index = 9)
    private String commune; // Comuna del cliente

    @ExcelProperty(index = 10)
    private Double subtotal; // Subtotal (costo de los productos)

    @ExcelProperty(index = 11)
    private Double shipping_cost; // Costo de envío

    @ExcelProperty(index = 12)
    private Double total; // Total (costo productos + costo de envío)

    @ExcelProperty(index = 13)
    private String purchase_source; // Fuente de la compra (Orgánico, Facebook Adds)

    @ExcelProperty(index = 14)
    private String customer_type; // Tipo de cliente (cliente consumo, cliente negocio)

    @ExcelProperty(index = 15)
    private String email;

}
