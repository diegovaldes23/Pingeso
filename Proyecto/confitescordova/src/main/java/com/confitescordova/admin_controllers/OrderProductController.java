package com.confitescordova.admin_controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_services.ProductSalesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_services.OrderProductService;

@RestController
@RequestMapping("/admin/orderproduct")
public class OrderProductController {
    @Autowired
    OrderProductService orderProductService;

    @GetMapping
    public List<OrderProduct> getAllOrderProducts() {
        return orderProductService.getOrderProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderProduct> getOrderProductsById(@PathVariable Long id) {
        Optional<OrderProduct> productQuantity = orderProductService.getOrdersProductsById(id);
        return productQuantity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public OrderProduct createOrderProduct(@RequestBody OrderProduct orderProduct) {
        return orderProductService.saveOrdersProducts(orderProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderProductService.deleteOrdersProducts(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/post")
    public Orders postOrderProduct(@RequestBody Map<String, Object> orderProduct) {
        return orderProductService.special_createOrder(orderProduct);
    }

    @GetMapping("/max_cost")
    public List<OrderProduct> getOrderProductsSortedByCost() {
        return orderProductService.getOrderProductsOrderedByCost();
    }

    @GetMapping("/product-sales")
    public List<ProductSalesDTO> getProductSales() {
        return orderProductService.getProductSales();
    }

}
