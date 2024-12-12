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
    public void testGetAllOrders() throws Exception {
        Long storeID = 1L;
        int page = 1;
        int pageSize = 100;
        String url = "https://api.tiendanube.com/v1/" + storeID + "/orders?page=" + page + "&limit=" + pageSize;
        String expectedResponse = "[{\"id\":1,\"payment_status\":\"paid\",\"customer\":{\"name\":\"John Doe\"}}]";

        HttpHeaders headers = orderService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.GET), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makeGetRequestMethod = BaseService.class.getDeclaredMethod("makeGetRequest", String.class);
        makeGetRequestMethod.setAccessible(true);
        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);

        List<Order> allOrders = orderService.getAllOrders(storeID);

        assertEquals(1, allOrders.size());
        assertEquals("John Doe", allOrders.get(0).getCustomer().getName());
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

        doNothing().when(restTemplate).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));

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