package com.confitescordova.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order_Adm {
    // Atributos de la entidad
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_order; // atributo llave

    private String billing_name;

    private String billing_phone;
    private String billing_address;
    private Double total;
    private Double subtotal;

    
    private List<Products_Quantity> products;
    
    private Double shipping_cost_customer; // costo de envio

    private Double initialPayment; // Pago inicial

    private String status; // Estado

    private String billing_customer_type; // Tipo de cliente

    private String note; // Fuente de la compra (Organico, Facebook Adds)


    /*
     * billing_name: customerName,
            billing_phone: phone,
            billing_address: `${commune}, ${region}`,
            subtotal,
            total,
            products: products.map(product => ({
                id: product.productId,
                quantity: parseInt(product.quantity, 10), // Asegurarse de enviar números enteros
            })),
            shipping_cost_customer: parseFloat(deliveryCost),
            status,
            billing_customer_type: customerType,
            note: purchaseSource,
            initialPayment: parseFloat(initialPayment),
     */
}
