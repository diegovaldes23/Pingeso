package com.confitescordova.admin_services;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomerTypeCountDTO {
    private String customerType;
    private Long count;

    public CustomerTypeCountDTO(String customerType, Long count) {
        this.customerType = customerType;
        this.count = count;
    }
}
