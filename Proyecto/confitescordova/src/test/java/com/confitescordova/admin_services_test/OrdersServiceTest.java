package com.confitescordova.admin_services_test;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;
import com.confitescordova.admin_services.CommuneOrderCountDTO;
import com.confitescordova.admin_services.OrderProductService;
import com.confitescordova.admin_services.OrdersService;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrdersServiceTest {

    @InjectMocks
    private OrdersService ordersService;

    @Mock
    private OrdersRepository ordersRepository;

    @Mock
    private OrderProductService orderProductService;

    @Test
    void testGetAllOrders() {
    // Crear datos de prueba utilizando la entidad Orders
    Orders order1 = new Orders();
    order1.setId(1L);
    order1.setName("Juan Pérez");
    order1.setPhone("123456789");
    order1.setRegion("Región Metropolitana");
    order1.setCommune("Santiago");
    order1.setTotal(500.0);

    Orders order2 = new Orders();
    order2.setId(2L);
    order2.setName("María López");
    order2.setPhone("987654321");
    order2.setRegion("Valparaíso");
    order2.setCommune("Viña del Mar");
    order2.setTotal(300.0);

    List<Orders> mockOrders = List.of(order1, order2);

    // Simular comportamiento del repositorio
    when(ordersRepository.findAll()).thenReturn(mockOrders);

    // Ejecutar el método del servicio
    List<Orders> result = ordersService.getAllOrders();

    // Verificar resultados
    assertEquals(2, result.size());
    assertEquals("Juan Pérez", result.get(0).getName());
    assertEquals("María López", result.get(1).getName());
    assertEquals(500.0, result.get(0).getTotal());
    assertEquals(300.0, result.get(1).getTotal());

    // Verificar que se llamó al método findAll() del repositorio
    verify(ordersRepository, times(1)).findAll();
}

    @Test
    void testGetOrderById() {
        Orders mockOrder = new Orders();
        mockOrder.setName("Carlos");
        mockOrder.setPhone("987654");
        mockOrder.setCommune("Concepcion");
        mockOrder.setTotal(150.0);
        mockOrder.setPurchase_source("Online");
        when(ordersRepository.findById(1L)).thenReturn(Optional.of(mockOrder));

        Optional<Orders> result = ordersService.getOrderById(1L);

        assertTrue(result.isPresent());
        assertEquals("Carlos", result.get().getName());
        verify(ordersRepository, times(1)).findById(1L);
    }

    @Test
    void testSalesByCommune() {
        CommuneOrderCountDTO mockDTO = new CommuneOrderCountDTO("Santiago", 5L, 500.0);
        when(ordersRepository.countOrdersByCommune()).thenReturn(List.of(mockDTO));

        List<CommuneOrderCountDTO> result = ordersService.salesByCommune();

        assertEquals(1, result.size());
        assertEquals("Santiago", result.get(0).getCommune());
        assertEquals(500.0, result.get(0).getTotal());
        verify(ordersRepository, times(1)).countOrdersByCommune();
    }

    @Test
    void testDeleteOrder() {
        Long orderId = 1L;

        // Ejecutar el método
        ordersService.deleteOrder(orderId);

        // Verificar que se llama al repositorio
        verify(ordersRepository, times(1)).deleteById(orderId);
    }

    @Test
    void testChangeDeliveryDate() {
        Orders mockOrder = new Orders();
        mockOrder.setId(1L);
        when(ordersRepository.findById(1L)).thenReturn(Optional.of(mockOrder));

        Orders updatedOrder = new Orders();
        updatedOrder.setDelivery_date(LocalDate.of(2024, 12, 25));
        when(ordersRepository.save(any(Orders.class))).thenReturn(updatedOrder);

        Orders result = ordersService.changeDeliveryDate(1L, "2024-12-25");

        assertEquals(LocalDate.of(2024, 12, 25), result.getDelivery_date());
        verify(ordersRepository, times(1)).findById(1L);
        verify(ordersRepository, times(1)).save(any(Orders.class));
    }

    @Test
    void testGetTopTenCustomers() {
        List<Object[]> mockData = List.of(
                new Object[]{"Juan", "123456", 500.0},
                new Object[]{"Maria", "654321", 400.0}
        );
        Pageable pageable = PageRequest.of(0, 10);
        when(ordersRepository.findTopCustomers(pageable)).thenReturn(mockData);

        List<Map<String, Object>> result = ordersService.getTopTenCustomers();

        assertEquals(2, result.size());
        assertEquals("Juan", result.get(0).get("name"));
        assertEquals(500.0, result.get(0).get("totalSpent"));
        verify(ordersRepository, times(1)).findTopCustomers(pageable);
    }

    @Test
void testUpdateOrder() {
    Orders existingOrder = new Orders();
    existingOrder.setId(1L);
    existingOrder.setOrderProducts(new ArrayList<>()); // Inicializa la lista
    when(ordersRepository.findById(1L)).thenReturn(Optional.of(existingOrder));

    Orders updatedOrder = new Orders();
    updatedOrder.setId(1L);
    updatedOrder.setStatus("Completed");
    updatedOrder.setOrderProducts(new ArrayList<>()); // Inicializa la lista
    when(ordersRepository.save(any(Orders.class))).thenReturn(updatedOrder);

    Orders orderToUpdate = new Orders();
    orderToUpdate.setId(1L);
    orderToUpdate.setStatus("Completed");
    orderToUpdate.setOrderProducts(new ArrayList<>()); // Inicializa la lista

    Orders result = ordersService.updateOrder(orderToUpdate);

    assertEquals("Completed", result.getStatus());
    verify(ordersRepository, times(1)).findById(1L);
    verify(ordersRepository, times(1)).save(any(Orders.class));
}

    @Test
    void testSaveLocal() {
        Orders order = new Orders();
        order.setOrder_date(LocalDate.of(2024, 12, 12));
        when(ordersRepository.save(any(Orders.class))).thenReturn(order);

        Orders result = ordersService.saveLocal(order);

        assertEquals(LocalDate.of(2024, 12, 12), result.getOrder_date());
        verify(ordersRepository, times(1)).save(any(Orders.class));
    }
}