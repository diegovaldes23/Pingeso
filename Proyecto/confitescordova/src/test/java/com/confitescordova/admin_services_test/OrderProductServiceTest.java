package com.confitescordova.admin_services_test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_repositories.OrderProductRepository;
import com.confitescordova.admin_repositories.OrdersRepository;
import com.confitescordova.admin_repositories.ProductsRepository;
import com.confitescordova.admin_services.OrderProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.*;

@ExtendWith(MockitoExtension.class)
public class OrderProductServiceTest {

    @Mock
    private OrdersRepository ordersRepository;

    @Mock
    private ProductsRepository productsRepository;

    @Mock
    private OrderProductRepository orderProductRepository;

    @InjectMocks
    private OrderProductService orderProductService;

    private Map<String, Object> orderJson;
    private Products product;

    @BeforeEach
    void setUp() {
        orderJson = new HashMap<>();
        orderJson.put("name", "Cliente 1");
        orderJson.put("phone", "123456789");
        orderJson.put("region", "Región 1");
        orderJson.put("commune", "Comuna 1");
        orderJson.put("order_date", "2024-12-12T00:00:00");
        orderJson.put("customer_type", "Consumo");
        orderJson.put("purchase_source", "Orgánico");
        orderJson.put("shipping_cost", 10.0);
        orderJson.put("subtotal", 100.0);
        orderJson.put("initial_payment", 50.0);
        orderJson.put("status", "Pendiente");
        orderJson.put("description", "Descripción del pedido");
        orderJson.put("address", "Dirección del cliente");
        orderJson.put("email", "cliente@example.com");

        List<Map<String, Object>> orders = new ArrayList<>();
        Map<String, Object> orderDetail = new HashMap<>();
        orderDetail.put("id_product", 1L);
        orderDetail.put("quantity", 2);
        orderDetail.put("product_specification", "Especificación del producto");
        orders.add(orderDetail);
        orderJson.put("orders", orders);

        product = new Products();
        product.setId_product(1L);
        product.setName("Producto 1");
        product.setCost(50.0);
    }

    @Test
    public void testSpecialCreateOrder() {
        Orders order = new Orders();
        when(ordersRepository.save(any(Orders.class))).thenReturn(order);
        when(productsRepository.findById(1L)).thenReturn(Optional.of(product));

        Orders result = orderProductService.special_createOrder(orderJson);

        assertNotNull(result);
        verify(ordersRepository, times(1)).save(any(Orders.class));
        verify(orderProductRepository, times(1)).save(any(OrderProduct.class));
    }
}