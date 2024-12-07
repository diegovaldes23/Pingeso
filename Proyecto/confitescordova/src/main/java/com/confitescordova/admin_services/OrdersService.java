package com.confitescordova.admin_services;

import java.time.LocalDate;
import java.util.*;

import com.confitescordova.entities.Order;
import jakarta.persistence.EntityNotFoundException;
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

    public Orders changeDeliveryDate(Long orderId, String deliveryDate) {
        // Verificar si la orden existe
        Optional<Orders> optionalOrder = orderRepository.findById(orderId);

        // Si no existe la orden, lanzar una excepción o manejar el error
        if (optionalOrder.isEmpty()) {
            throw new EntityNotFoundException("La orden con ID " + orderId + " no fue encontrada.");
        }

        // Obtener la orden
        Orders order = optionalOrder.get();

        order.setDelivery_date(LocalDate.parse(deliveryDate));
        return orderRepository.save(order);
    }

    public Orders changeStatus(Long orderId, String status) {
        // Verificar si la orden existe
        Optional<Orders> optionalOrder = orderRepository.findById(orderId);

        // Si no existe la orden, lanzar una excepción o manejar el error
        if (optionalOrder.isEmpty()) {
            throw new EntityNotFoundException("La orden con ID " + orderId + " no fue encontrada.");
        }

        // Obtener la orden
        Orders order = optionalOrder.get();

        // Actualizar solo el estado de la orden
        order.setStatus(status);

        // Usar save() para actualizar la orden existente
        return orderRepository.save(order); // Esto actualiza la orden con el mismo ID
    }
}
