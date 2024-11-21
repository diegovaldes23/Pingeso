package com.confitescordova.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.confitescordova.entities.Order_Adm;
import com.confitescordova.repositories.Order_Repository;

@Service
public class Order_Service {
    @Autowired
    Order_Repository orderAdmRepository;

    public List<Order_Adm> getAllOrders() {
        return (List<Order_Adm>) orderAdmRepository.findAll();
    }

    public Optional<Order_Adm> getOrderById(Long id) {
        return orderAdmRepository.findById(id);
    }

    public Order_Adm saveOrder(Order_Adm order) {
        return orderAdmRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderAdmRepository.deleteById(id);
    }
}
