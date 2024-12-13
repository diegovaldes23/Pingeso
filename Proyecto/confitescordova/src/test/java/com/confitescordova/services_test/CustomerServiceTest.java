package com.confitescordova.services_test;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.confitescordova.entities.Customer;
import com.confitescordova.services.BaseService;
import com.confitescordova.services.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

public class CustomerServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private BaseService baseService;

    @InjectMocks
    private CustomerService customerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllCustomers() {
        Long storeId = 1L;
        String responseBody = "[{\"id\":1,\"name\":\"John Doe\"}]";
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
            .thenReturn(new ResponseEntity<>(responseBody, HttpStatus.OK));

        List<Customer> customers = customerService.getAllCustomers(storeId);

        assertNotNull(customers);
        assertEquals(1, customers.size());
        assertEquals("John Doe", customers.get(0).getName());
    }

    @Test
    public void testGetCustomerById() {
        Long storeId = 1L;
        Long customerId = 1L;
        String responseBody = "{\"id\":1,\"name\":\"John Doe\"}";
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
            .thenReturn(new ResponseEntity<>(responseBody, HttpStatus.OK));

        Customer customer = customerService.getCustomerById(storeId, customerId);

        assertNotNull(customer);
        assertEquals("John Doe", customer.getName());
    }

    @Test
    public void testCreateCustomer() {
        Long storeId = 1L;
        Customer customer = new Customer();
        customer.setName("John Doe");
        String responseBody = "{\"id\":1,\"name\":\"John Doe\"}";
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)))
            .thenReturn(new ResponseEntity<>(responseBody, HttpStatus.OK));

        Customer createdCustomer = customerService.createCustomer(storeId, customer);

        assertNotNull(createdCustomer);
        assertEquals("John Doe", createdCustomer.getName());
    }

    @Test
    public void testUpdateCustomer() {
        Long storeId = 1L;
        Long customerId = 1L;
        Customer updatedCustomer = new Customer();
        updatedCustomer.setName("Jane Doe");
        String responseBody = "{\"id\":1,\"name\":\"Jane Doe\"}";
        when(restTemplate.exchange(anyString(), eq(HttpMethod.PUT), any(HttpEntity.class), eq(String.class)))
            .thenReturn(new ResponseEntity<>(responseBody, HttpStatus.OK));

        Customer result = customerService.updateCustomer(storeId, customerId, updatedCustomer);

        assertNotNull(result);
        assertEquals("Jane Doe", result.getName());
    }

    @Test
    public void testDeleteCustomer() {
        Long storeId = 1L;
        Long customerId = 1L;

        // Simular la respuesta de exchange para una solicitud DELETE
        when(restTemplate.exchange(anyString(), eq(HttpMethod.DELETE), any(HttpEntity.class), eq(Void.class)))
            .thenReturn(new ResponseEntity<Void>(HttpStatus.OK));

        assertDoesNotThrow(() -> customerService.deleteCustomer(storeId, customerId));
    }
}