package com.confitescordova.services;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;
import com.confitescordova.admin_services.OrdersService;
import com.confitescordova.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class OrderSyncService implements CommandLineRunner {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrdersService ordersService;

    @Override
    public void run(String... args) throws Exception {
        // Esto asegura que la sincronización de pedidos se ejecute al inicio
        syncOrders();
    }

    @Scheduled(fixedRate = 900000) // Ejecutar cada 15 minutos
    public void syncOrders() {
        Long storeID = 3806794L;

        try {
            List<Order> tiendanubeOrders = orderService.getAllOrders(storeID);
            for (Order tnOrder : tiendanubeOrders) {
                Orders localOrder = convertTiendanubeOrder(tnOrder);
                saveOrderIfNotExists(localOrder, Long.valueOf(tnOrder.getId()));
            }
        } catch (Exception e) {
            // Manejo de errores
            System.err.println("Error sincronizando pedidos: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private Orders convertTiendanubeOrder(Order tnOrder) {
        Orders localOrder = new Orders();
        localOrder.setName(tnOrder.getCustomer().getName());
        localOrder.setPhone(tnOrder.getCustomer().getPhone());
        localOrder.setRegion(tnOrder.getBilling_province());
        localOrder.setCommune(tnOrder.getCustomer().getBilling_city());
        localOrder.setInitial_payment(0.0);

        // Usar un formato adecuado para la fecha con zona horaria
        String createdAtString = tnOrder.getCreated_at();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");

        // Convertir la fecha usando el formateador
        OffsetDateTime createdAt = OffsetDateTime.parse(createdAtString, formatter);

        // Establecer la fecha en la orden
        localOrder.setOrder_date(createdAt.toLocalDate()); // Solo la fecha
        localOrder.setShipping_cost(tnOrder.getShipping_cost_owner());
        localOrder.setSubtotal(tnOrder.getSubtotal());
        localOrder.setTotal(tnOrder.getTotal());
        localOrder.setStatus("Pendiente");
        localOrder.setPurchase_source("Tiendanube");
        localOrder.setAddress(tnOrder.getShipping_address().getAddress());
        localOrder.setEmail(tnOrder.getCustomer().getEmail());
        localOrder.setCreation_date(LocalDate.now());
        localOrder.setDelivery_date(LocalDate.now());

        return localOrder;
    }

    private void saveOrderIfNotExists(Orders order, Long externalOrderId) {
        Optional<Orders> existingOrderOpt = ordersService.getOrderById(externalOrderId);
        if (existingOrderOpt.isPresent()) {
            // Si ya existe, puedes actualizar la orden si es necesario
            Orders existingOrder = existingOrderOpt.get();
            updateOrderIfNeeded(existingOrder, order);
        } else {
            ordersService.getOrderById(externalOrderId);
            ordersService.save(order);
        }
    }

    private void updateOrderIfNeeded(Orders existingOrder, Orders newOrder) {
        // Compara y actualiza los campos necesarios
        if (!existingOrder.getStatus().equals(newOrder.getStatus())) {
            existingOrder.setStatus(newOrder.getStatus());
            ordersService.save(existingOrder);
        }
    }
}
