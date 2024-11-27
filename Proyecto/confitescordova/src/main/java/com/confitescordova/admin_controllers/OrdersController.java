package com.confitescordova.admin_controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.confitescordova.admin_entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.confitescordova.admin_services.OrdersService;



@RestController
@RequestMapping("/admin/orders")
public class OrdersController {
    @Autowired
    OrdersService orderService;


    @GetMapping("/get")
    public List<Orders> getAllProductsQuantities() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getProductQuantityById(@PathVariable Long id) {
        Optional<Orders> productQuantity = orderService.getOrderById(id);
        return productQuantity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /*
    @PostMapping("/post")
    public ResponseEntity<OrderProduct> create2(@RequestBody Map<String, Object> order) {

    }

     */

    /*
    @PostMapping
    public ResponseEntity<Orders> createOrder(@RequestBody OrderRequest orderRequest) {
        Orders order = new Orders();
        // Mapear los datos del request a la entidad Orders
        order.setName(orderRequest.getName());
        order.setPhone(orderRequest.getPhone());
        order.setOrder_date(orderRequest.getOrder_date());
        order.setCreation_date(orderRequest.getCreation_date());
        order.setDispatch(orderRequest.getDispatch());
        order.setAddress(orderRequest.getAddress());
        order.setTotal(orderRequest.getTotal());
        order.setSubtotal(orderRequest.getSubtotal());
        order.setShipping_cost(orderRequest.getShipping_cost());
        order.setInitialPayment(orderRequest.getInitialPayment());
        order.setStatus(orderRequest.getStatus());
        order.setCustomer_type(orderRequest.getCustomer_type());
        order.setSource(orderRequest.getSource());

        // Mapear los productos
        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProductRequest op : orderRequest.getOrders()) {
            OrderProduct orderProduct = new OrderProduct();
            Products product = new Products();
            product.setId_product(op.getId_product()); // Solo necesitas el ID
            orderProduct.setProduct(product);
            orderProduct.setCant(op.getCant());
            orderProducts.add(orderProduct);
        }

        Orders savedOrder = orderService.createOrder(order, orderProducts);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

     */

    /*
    @PostMapping
    public OrderAdm createProductQuantity(@RequestBody OrderAdm orderAdm) {
        // Asociar los productos con la orden
        if (orderAdm.getProducts() != null) {
            for (OrderProduct product : orderAdm.getProducts()) {
                product.setOrder(orderAdm);
            }
        }
        return order_Service.saveOrder(orderAdm);
    }*/


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductQuantity(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
