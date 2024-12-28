package com.confitescordova.admin_controllers;

import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_entities.Orders;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Data
@NoArgsConstructor
public class OrdersDTO {
    private Long id;
    private String name;
    private String phone;
    private String address;
    private String commune;
    private String region;
    private String customer_type;
    private String purchase_source;
    private String email;
    private String status;
    private Double initial_payment;
    private Double shipping_cost;
    private Double subtotal;
    private Double total;
    private String description;
    private List<OrderProduct> orderProducts;
    private Long externalOrderId = null;
    private String username_creator;

    private String order_date;      // Fecha como String
    private String delivery_date;   // Fecha como String
    private String creation_date;   // Fecha como String

    // Método para convertir el DTO a una entidad Orders
    public Orders toEntity() {
        Orders order = new Orders();
        order.setId(id);
        order.setName(name);
        order.setPhone(phone);
        order.setAddress(address);
        order.setCommune(commune);
        order.setRegion(region);
        order.setCustomer_type(customer_type);
        order.setPurchase_source(purchase_source);
        order.setEmail(email);
        order.setStatus(status);
        order.setInitial_payment(initial_payment);
        order.setShipping_cost(shipping_cost);
        order.setSubtotal(subtotal);
        order.setTotal(total);
        order.setOrder_date(parseDate(order_date));
        order.setDelivery_date(parseDate(delivery_date));
        order.setCreation_date(parseDate(creation_date));
        order.setDescription(description);
        order.setOrderProducts(orderProducts);

        return order;
    }

    private LocalDate parseDate(String date) {
        if (date == null || date.isEmpty()) {
            return null;
        }


        // Define los formatos soportados
        List<DateTimeFormatter> formatters = List.of(
                DateTimeFormatter.ofPattern("yyyy-MM-dd"), // Día-Mes-Año
                DateTimeFormatter.ISO_LOCAL_DATE // Año-Mes-Día (ISO estándar)
        );

        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(date, formatter);
            } catch (DateTimeParseException ignored) {
                throw new IllegalArgumentException("Error al convertir la fecha: " + date + ". Formatos soportados: dd-MM-yyyy, yyyy-MM-dd.");
            }
        }
        return null;
    }
}
