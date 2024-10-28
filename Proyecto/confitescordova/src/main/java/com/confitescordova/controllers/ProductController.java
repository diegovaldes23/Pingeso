package com.confitescordova.controllers;

import com.confitescordova.entities.Product;
import com.confitescordova.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products/{storeId}")
    public Product getProducts(@PathVariable Long storeId) {
        return productService.getAllProducts(storeId);
    }
}
