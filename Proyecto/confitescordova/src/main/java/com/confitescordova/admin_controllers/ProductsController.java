package com.confitescordova.admin_controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_services.ProductsService;

@RestController
@RequestMapping("/admin/products")
public class ProductsController {
    @Autowired
    ProductsService productsService;

    @GetMapping
    public List<Products> getAllProductsQuantities() {
        return productsService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductQuantityById(@PathVariable Long id) {
        Optional<Products> productQuantity = productsService.getProductById(id);
        return productQuantity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Products createProductQuantity(@RequestBody Products productQuantity) {
        return productsService.saveProduct(productQuantity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductQuantity(@PathVariable Long id) {
        productsService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
