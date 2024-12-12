package com.confitescordova.services_test;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_services.CustomersService;
import com.confitescordova.entities.Order;
import com.confitescordova.services.OrderService;
import com.confitescordova.services.OrderSyncService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class OrderSyncServiceTest {

    @Mock
    private OrderService orderService;

    @Mock
    private CustomersService customersService;

    @InjectMocks
    private OrderSyncService orderSyncService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSyncOrders() {
        Long storeID = 3806794L;
        int page = 1;
        int pageSize = 50;

        List<Order> orders = new ArrayList<>();
        Order order = new Order();
        order.setId(1L);
        order.setCreated_at("2023-12-12T10:15:30+0000");
        // Configurar otros campos necesarios para la orden
        orders.add(order);

        when(orderService.getOrders(storeID, page, pageSize)).thenReturn(orders).thenReturn(new ArrayList<>());

        orderSyncService.syncOrders();

        verify(orderService, times(2)).getOrders(storeID, page, pageSize);
        // Verificar otras interacciones y estados según sea necesario
    }

    @Test
    public void testConvertTiendanubeOrder() {
        Order tnOrder = new Order();
        tnOrder.setId(1L);
        tnOrder.setCreated_at("2023-12-12T10:15:30+0000");
        // Configurar otros campos necesarios para la orden

        Orders localOrder = orderSyncService.convertTiendanubeOrder(tnOrder);

        assertNotNull(localOrder);
        assertEquals("2023-12-12", localOrder.getOrder_date().toString());
        // Verificar otros campos según sea necesario
    }

    @Test
    public void testConvertToLocalDate() {
        OrderSyncService service = new OrderSyncService();
        String createdAtString = "2023-12-12T10:15:30+0000";

        LocalDate expectedDate = LocalDate.of(2023, 12, 12);
        LocalDate actualDate = service.convertToLocalDate(createdAtString);

        assertEquals(expectedDate, actualDate);
    }
}