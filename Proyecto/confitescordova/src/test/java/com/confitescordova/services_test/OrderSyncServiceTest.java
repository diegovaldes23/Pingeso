package com.confitescordova.services_test;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_services.CustomersService;
import com.confitescordova.entities.Customer;
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

        // Crear órdenes simuladas con datos relevantes
        List<Order> ordersPage1 = new ArrayList<>();

        Order orderWithPhone = new Order();
        orderWithPhone.setId(1L);
        orderWithPhone.setCreated_at("2023-12-12T10:15:30+0000");
        Customer customerWithPhone = new Customer();
        customerWithPhone.setName("John Doe");
        customerWithPhone.setPhone("1234567890");
        orderWithPhone.setCustomer(customerWithPhone);
        ordersPage1.add(orderWithPhone);

        Order orderWithoutPhone = new Order();
        orderWithoutPhone.setId(2L);
        orderWithoutPhone.setCreated_at("2023-12-13T11:00:00+0000");
        Customer customerWithoutPhone = new Customer();
        customerWithoutPhone.setName("Jane Doe");
        // Dejar phone como null
        orderWithoutPhone.setCustomer(customerWithoutPhone);
        ordersPage1.add(orderWithoutPhone);

        // Segunda página vacía
        List<Order> ordersPage2 = new ArrayList<>();

        // Configurar comportamiento de mock
        when(orderService.getOrders(storeID, page, pageSize))
            .thenReturn(ordersPage1)
            .thenReturn(ordersPage2);

        // Ejecutar la sincronización de órdenes
        assertDoesNotThrow(() -> orderSyncService.syncOrders());

        // Verificar que getOrders fue llamado dos veces
        verify(orderService, times(2)).getOrders(storeID, page, pageSize);

        // Opcional: Verificar que las órdenes fueron procesadas correctamente
        // Esto depende de los métodos que tengas para validar resultados
    }

    @Test
    public void testConvertTiendanubeOrder() {
        Order tnOrder = new Order();
        tnOrder.setId(1L);
        tnOrder.setCreated_at("2023-12-12T10:15:30+0000");
        // No configuramos el cliente para simular el null

        try {
            Orders localOrder = orderSyncService.convertTiendanubeOrder(tnOrder);
            fail("Expected NullPointerException to be thrown");
        } catch (NullPointerException e) {
            assertEquals("Cannot invoke \"com.confitescordova.entities.Customer.getName()\" because the return value of \"com.confitescordova.entities.Order.getCustomer()\" is null", e.getMessage());
        }
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