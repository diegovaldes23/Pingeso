package com.confitescordova.admin_services;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommuneOrderCountDTO {
    // Getters y setters
    private String commune;
    private Long orderCount;
    private Double total;

    public CommuneOrderCountDTO(String commune, Long orderCount, Double total) {
        this.commune = commune;
        this.orderCount = orderCount;
        this.total = total;
    }

}
