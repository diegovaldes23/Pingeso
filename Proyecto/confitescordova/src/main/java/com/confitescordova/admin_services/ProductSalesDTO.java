package com.confitescordova.admin_services;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Setter
@Getter
public class ProductSalesDTO {

    //@Autowired
    //public ProductsService productsService;

    private Long idProduct;
    private Double cost;
    private String productName;

    public ProductSalesDTO(String productName, Double cost) {
        this.cost = cost;
        this.productName = productName;
        /*
        if(productsService.getProductById(idProduct).isPresent()){
            productName = productsService.getProductById(idProduct).get().getName();
            this.productName = productName;
        }
        else{
            this.productName = "";
        }

         */
    }


}
