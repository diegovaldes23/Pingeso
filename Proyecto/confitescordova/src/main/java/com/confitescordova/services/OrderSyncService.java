package com.confitescordova.services;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;
import com.confitescordova.admin_services.OrdersService;
import com.confitescordova.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderSyncService {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrdersService localOrdersService;

    @Autowired
    private OrdersRepository ordersRepository;

    @Scheduled(fixedRate = 900000) // Ejecutar cada 15 minutos
    public void syncOrders() {
        Long storeID = 5336632L;

        try {
            List<Order> tiendanubeOrders = orderService.getAllOrders(storeID);
            for (Order tnOrder : tiendanubeOrders) {
                Orders localOrder = convertTiendanubeOrder(tnOrder);
                saveOrderIfNotExists(localOrder, Long.valueOf(tnOrder.getId()));
            }
        } catch (Exception e) {
            // Manejo de errores
            System.err.println("Error sincronizando pedidos: " + e.getMessage());
        }
    }

    private Orders convertTiendanubeOrder(Order tnOrder) {
        Orders localOrder = new Orders();
        localOrder.setName(tnOrder.getCustomer().getName());
        localOrder.setPhone(tnOrder.getCustomer().getPhone());
        localOrder.setRegion(tnOrder.getBilling_province());
        localOrder.setCommune(tnOrder.getBilling_city());
        localOrder.setOrder_date(LocalDate.parse(tnOrder.getCreated_at()));
        localOrder.setShipping_cost(tnOrder.getShipping_cost_customer());
        localOrder.setSubtotal(tnOrder.getSubtotal());
        localOrder.setTotal(tnOrder.getTotal());
        localOrder.setStatus("Pendiente");
        localOrder.setPurchase_source("Tiendanube");
        localOrder.setAddress(tnOrder.getShipping_address());
        localOrder.setEmail(tnOrder.getCustomer().getEmail());
        localOrder.setCreation_date(LocalDate.now());

        return localOrder;
    }

    private void saveOrderIfNotExists(Orders order, Long externalOrderId) {
        Optional<Orders> existingOrderOpt = ordersRepository.findById(externalOrderId);
        if (existingOrderOpt.isPresent()) {
            // Si ya existe, puedes actualizar la orden si es necesario
            Orders existingOrder = existingOrderOpt.get();
            updateOrderIfNeeded(existingOrder, order);
        } else {
            ordersRepository.findById(externalOrderId);
            ordersRepository.save(order);
        }
    }

    private void updateOrderIfNeeded(Orders existingOrder, Orders newOrder) {
        // Compara y actualiza los campos necesarios
        if (!existingOrder.getStatus().equals(newOrder.getStatus())) {
            existingOrder.setStatus(newOrder.getStatus());
            ordersRepository.save(existingOrder);
        }
    }
}
