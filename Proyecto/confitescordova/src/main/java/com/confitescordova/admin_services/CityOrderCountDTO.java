package com.confitescordova.admin_services;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CityOrderCountDTO {
    // Getters y setters
    private String city;
    private Long orderCount;
    private Double total;

    public CityOrderCountDTO(String city, Long orderCount, Double total) {
        this.city = city;
        this.orderCount = orderCount;
        this.total = total;
    }

}
