package com.confitescordova.admin_entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class OrdersRequest {
    @Id
    private Long id_order;
    private String delivery_date;
}
