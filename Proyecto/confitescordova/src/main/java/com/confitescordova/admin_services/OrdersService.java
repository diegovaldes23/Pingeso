package com.confitescordova.admin_services;

import java.util.*;

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

    // Para obtener los productos mas vendidos
    public List<CommuneOrderCountDTO> salesByCommune() {
        return orderRepository.countOrdersByCommune();
    }

    public List<SalesByChannelDTO> salesByChannel() {
        return orderRepository.salesByChannel();
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
