package com.confitescordova.services_test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.confitescordova.entities.Customer;
import com.confitescordova.entities.Order;
import com.confitescordova.services.BaseService;
import com.confitescordova.services.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private BaseService baseService; // Si tu clase OrderService depende de BaseService


    @InjectMocks
    private OrderService orderService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testGetOrders() throws Exception {
        Long storeID = 1L;
        int page = 1;
        int pageSize = 10;
        String url = "https://api.tiendanube.com/v1/" + storeID + "/orders?page=" + page + "&limit=" + pageSize;
        String expectedResponse = "[{\"id\":1,\"payment_status\":\"paid\",\"customer\":{\"name\":\"John Doe\"}}]";

        HttpHeaders headers = orderService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.GET), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makeGetRequestMethod = BaseService.class.getDeclaredMethod("makeGetRequest", String.class);
        makeGetRequestMethod.setAccessible(true);
        String responseBody = (String) makeGetRequestMethod.invoke(orderService, url);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Order[] ordersArray = (Order[]) parseResponseMethod.invoke(orderService, responseBody, Order[].class);

        List<Order> orders = Arrays.stream(ordersArray)
                .filter(order -> "paid".equals(order.getPayment_status()))
                .filter(order -> !("Sebastian Cordova".equals(order.getCustomer().getName()) || "Cliente anónimo".equals(order.getCustomer().getName())))
                .collect(Collectors.toList());

        assertEquals(1, orders.size());
        assertEquals("John Doe", orders.get(0).getCustomer().getName());
    }

    @Test
    void testGetAllOrders() {
        // Creamos las órdenes utilizando los setters
        Order order1 = new Order();
        order1.setId(1L);
        order1.setContact_identification("Order 1");

        Order order2 = new Order();
        order2.setId(2L);
        order2.setContact_identification("Order 2");

        Order order3 = new Order();
        order3.setId(3L);
        order3.setContact_identification("Order 3");

        // Simulamos la respuesta de makeGetRequest para las llamadas a getOrders
        String mockResponsePage1 = "[{ \"id\": 1, \"contact_identification\": \"Order 1\", \"payment_status\": \"paid\" }, "
                                 + "{ \"id\": 2, \"contact_identification\": \"Order 2\", \"payment_status\": \"paid\" }]";
        String mockResponsePage2 = "[{ \"id\": 3, \"contact_identification\": \"Order 3\", \"payment_status\": \"paid\" }]";

        when(baseService.makeGetRequest(anyString())) // Simulamos makeGetRequest para que devuelva respuestas mockeadas
            .thenReturn(mockResponsePage1) // Respuesta para la primera página
            .thenReturn(mockResponsePage2) // Respuesta para la segunda página
            .thenReturn("[]"); // Respuesta vacía para la tercera página

        // Simulamos que parseResponse devuelve una lista de órdenes
        when(baseService.parseResponse(eq(mockResponsePage1), eq(Order[].class)))
            .thenReturn(new Order[] { order1, order2 });
        when(baseService.parseResponse(eq(mockResponsePage2), eq(Order[].class)))
            .thenReturn(new Order[] { order3 });

        // Llamamos al método que estamos probando
        List<Order> allOrders = orderService.getAllOrders(1L);

        // Verificamos que la lista final contiene 3 órdenes
        assertEquals(3, allOrders.size());

        // Verificamos que las órdenes correctas están en la lista
        assertTrue(allOrders.contains(order1));
        assertTrue(allOrders.contains(order2));
        assertTrue(allOrders.contains(order3));

        // Verificamos que baseService.makeGetRequest fue llamado correctamente
        verify(baseService, times(3)).makeGetRequest(anyString());
    }



    @Test
    public void testGetOrderById() throws Exception {
        Long storeId = 1L;
        Long orderId = 1L;
        String url = "https://api.tiendanube.com/v1/" + storeId + "/orders/" + orderId;
        String expectedResponse = "{\"id\":1,\"customer\":{\"name\":\"John Doe\"}}";

        HttpHeaders headers = orderService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.GET), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makeGetRequestMethod = BaseService.class.getDeclaredMethod("makeGetRequest", String.class);
        makeGetRequestMethod.setAccessible(true);
        String responseBody = (String) makeGetRequestMethod.invoke(orderService, url);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Order order = (Order) parseResponseMethod.invoke(orderService, responseBody, Order.class);

        assertNotNull(order);
        assertEquals("John Doe", order.getCustomer().getName());
    }

    @Test
    public void testCreateOrder() throws Exception {
        Long storeId = 1L;
        Order order = new Order();
        Customer customer= new Customer();
        customer.setId(1L);
        customer.setName("John Doe");
        order.setCustomer(customer);
        String url = "https://api.tiendanube.com/v1/" + storeId + "/orders";
        String expectedResponse = "{\"id\":1,\"customer\":{\"name\":\"John Doe\"}}";

        HttpHeaders headers = orderService.getHeaders();
        String jsonBody = objectMapper.writeValueAsString(order);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.POST), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makePostRequestMethod = BaseService.class.getDeclaredMethod("makePostRequest", String.class, Object.class);
        makePostRequestMethod.setAccessible(true);
        String responseBody = (String) makePostRequestMethod.invoke(orderService, url, order);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Order createdOrder = (Order) parseResponseMethod.invoke(orderService, responseBody, Order.class);

        assertNotNull(createdOrder);
        assertEquals("John Doe", createdOrder.getCustomer().getName());
    }

    @Test
    public void testUpdateOrder() throws Exception {
        Long storeId = 1L;
        Long orderId = 1L;
        Order updatedOrder = new Order();
        Customer customer= new Customer();
        customer.setId(1L);
        customer.setName("John Doe");
        updatedOrder.setCustomer(customer);
        String url = "https://api.tiendanube.com/v1/" + storeId + "/orders/" + orderId;
        String expectedResponse = "{\"id\":1,\"customer\":{\"name\":\"John Doe\"}}";

        HttpHeaders headers = orderService.getHeaders();
        String jsonBody = objectMapper.writeValueAsString(updatedOrder);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.PUT), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makePutRequestMethod = BaseService.class.getDeclaredMethod("makePutRequest", String.class, Object.class);
        makePutRequestMethod.setAccessible(true);
        String responseBody = (String) makePutRequestMethod.invoke(orderService, url, updatedOrder);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Order order = (Order) parseResponseMethod.invoke(orderService, responseBody, Order.class);

        assertNotNull(order);
        assertEquals("John Doe", order.getCustomer().getName());
    }

    @Test
    public void testDeleteOrder() throws Exception {
        Long storeId = 1L;
        Long orderId = 1L;
        String url = "https://api.tiendanube.com/v1/" + storeId + "/orders/" + orderId;

        HttpHeaders headers = orderService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Simula la respuesta de RestTemplate.exchange()
        doReturn(new ResponseEntity<Void>(HttpStatus.OK)).when(restTemplate).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));

        Method makeDeleteRequestMethod = BaseService.class.getDeclaredMethod("makeDeleteRequest", String.class);
        makeDeleteRequestMethod.setAccessible(true);
        makeDeleteRequestMethod.invoke(orderService, url);

        verify(restTemplate, times(1)).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));
    }

    @Test
    public void testGetSortedOrders() throws Exception {
        Long storeId = 1L;
        String sortBy = "date";
        String url = "https://api.tiendanube.com/v1/" + storeId + "/orders?sort_by=" + sortBy;
        String expectedResponse = "[{\"id\":1,\"customer\":{\"name\":\"John Doe\"}}]";

        HttpHeaders headers = orderService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.GET), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makeGetRequestMethod = BaseService.class.getDeclaredMethod("makeGetRequest", String.class);
        makeGetRequestMethod.setAccessible(true);
        String responseBody = (String) makeGetRequestMethod.invoke(orderService, url);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Order[] ordersArray = (Order[]) parseResponseMethod.invoke(orderService, responseBody, Order[].class);

        List<Order> orders = Arrays.asList(ordersArray);
        assertEquals(1, orders.size());
        assertEquals("John Doe", orders.get(0).getCustomer().getName());
    }
}