package com.confitescordova.admin_entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class OrderStatus {
    @Id
    private Long id_order;
    private String status;
}
