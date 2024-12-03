package com.confitescordova.controllers;

import com.confitescordova.entities.Order;
import com.confitescordova.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    String storeIdString = "3806794";
    Long storeId = Long.parseLong(storeIdString);

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders() {
        List<Order> orders = orderService.getAllOrders(storeId);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/orders/sorted")
    public ResponseEntity<List<Order>> getSortedOrders(
            @RequestParam String sortBy
    ) {
        List<Order> orders = orderService.getSortedOrders(storeId, sortBy);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable("orderId") Long orderId) {
        Order order = orderService.getOrderById(storeId, orderId);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(storeId, order);
        if(createdOrder == null) {
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PutMapping("/orders/{orderId}")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order, @PathVariable("orderId") Long orderId) {
        Order updatedOrder = orderService.updateOrder(storeId, orderId, order);
        if(updatedOrder == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    /*
    @DeleteMapping("/orders/{orderId}")

    public ResponseEntity<Void> deleteOrder(@PathVariable("orderId") Long orderId) {
        orderService.deleteOrder(storeId, orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    */
}