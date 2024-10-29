package com.confitescordova.controllers;

import com.confitescordova.entities.Product;
import com.confitescordova.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    private String storeIdString = "5336632";
    Long storeId = Long.parseLong(storeIdString);

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getAllProducts(storeId);
    }

    @GetMapping("/products/{productId}")
    public Product getProductById(@PathVariable("productId") Long productId) {
        return productService.getProductById(storeId, productId);
    }
}
