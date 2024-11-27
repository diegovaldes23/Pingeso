package com.confitescordova.admin_entities;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class OrderRequest {
    private String name;
    private String phone;
    private LocalDate order_date;
    private LocalDate creation_date;
    private String dispatch;
    private String address;
    private Double total;
    private Double subtotal;
    private Double shipping_cost;
    private Double initialPayment;
    private String status;
    private String customer_type;
    private String source;

    private List<OrderProductRequest> orders;
}