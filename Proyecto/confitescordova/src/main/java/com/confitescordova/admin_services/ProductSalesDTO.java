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
    private Long totalQuantity;
    private Double totalPrice;
    private String productName;

    public ProductSalesDTO(Long idProduct, Long totalQuantity, Double totalPrice, String productName) {
        this.idProduct = idProduct;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
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
