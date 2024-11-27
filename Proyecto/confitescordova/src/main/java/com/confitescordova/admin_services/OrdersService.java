package com.confitescordova.admin_services;

import java.time.LocalDate;
import java.util.*;

import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_repositories.ProductsRepository;
import com.confitescordova.entities.Order;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;



@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepository;



    public List<Orders> getAllOrders() {
        return (List<Orders>) orderRepository.findAll();
    }

    public Optional<Orders> getOrderById(Long id) {
        return orderRepository.findById(id);
    }


    /*
    public Orders createOrder(Orders order, List<OrderProduct> orderProducts) {
        for (OrderProduct op : orderProducts) {
            op.setOrder(order); // Establecer la relación bidireccional
        }
        order.setOrderProducts(orderProducts);
        return orderRepository.save(order);
    }

     */










    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
