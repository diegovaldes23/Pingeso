package com.confitescordova.controllers;

import com.confitescordova.entities.Product;
import com.confitescordova.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    private String storeIdString = "5336632";
    Long storeId = Long.parseLong(storeIdString);

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = productService.getAllProducts(storeId);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) {
        Product product = productService.getProductById(storeId, productId);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(storeId, product);
        if(createdProduct == null) {
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable("productId") Long productId) {
        Product updatedProduct = productService.updateProduct(storeId, productId, product);
        if(updatedProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productId") Long productId) {
        productService.deleteProduct(storeId, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
