package com.confitescordova.controllers;

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

import com.confitescordova.entities.Order_Adm;
import com.confitescordova.entities.Products_Quantity;
import com.confitescordova.services.Order_Service;
import com.confitescordova.services.P_Quantities_Service;


@RestController
@RequestMapping("/admin/orders")
public class Order_Controller {
    @Autowired
    Order_Service order_Service;


    @GetMapping("/get")
    public List<Order_Adm> getAllProductsQuantities() {
        return order_Service.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order_Adm> getProductQuantityById(@PathVariable Long id) {
        Optional<Order_Adm> productQuantity = order_Service.getOrderById(id);
        return productQuantity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order_Adm createProductQuantity(@RequestBody Order_Adm productQuantity) {
        return order_Service.saveOrder(productQuantity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductQuantity(@PathVariable Long id) {
        order_Service.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
