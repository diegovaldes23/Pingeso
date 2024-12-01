package com.confitescordova.admin_services;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SalesByChannelDTO {
    // Getters y setters
    private String source;
    private Long orderCount;
    private Double total;

    public SalesByChannelDTO(String source, Long orderCount, Double total) {
        this.source = source;
        this.orderCount = orderCount;
        this.total = total;
    }

}
