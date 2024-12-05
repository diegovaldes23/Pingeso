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

    public Orders save(Orders order){
        return orderRepository.save(order);
    }

    public Optional<Orders> getOrderByExternalId(Long externalOrderId) {
        // Supongamos que tienes un campo 'externalOrderId' en tu entidad Orders para almacenar este ID único.
        return orderRepository.findByExternalOrderId(externalOrderId);
    }


    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
