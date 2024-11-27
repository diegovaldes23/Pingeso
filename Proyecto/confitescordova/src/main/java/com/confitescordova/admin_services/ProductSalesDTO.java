package com.confitescordova.admin_services;

public class ProductSalesDTO {
    private Long idProduct;
    private Long totalQuantity;

    public ProductSalesDTO(Long idProduct, Long totalQuantity) {
        this.idProduct = idProduct;
        this.totalQuantity = totalQuantity;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
}
