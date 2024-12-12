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

import java.util.Arrays;
import java.util.List;

public class CustomerServiceTest {

    @Mock
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
        when(baseService.makeGetRequest(anyString())).thenReturn(responseBody);

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
        when(baseService.makeGetRequest(anyString())).thenReturn(responseBody);

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
        when(baseService.makePostRequest(anyString(), any(Customer.class))).thenReturn(responseBody);

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
        when(baseService.makePutRequest(anyString(), any(Customer.class))).thenReturn(responseBody);

        Customer result = customerService.updateCustomer(storeId, customerId, updatedCustomer);

        assertNotNull(result);
        assertEquals("Jane Doe", result.getName());
    }

    @Test
    public void testDeleteCustomer() {
        Long storeId = 1L;
        Long customerId = 1L;

        doNothing().when(baseService).makeDeleteRequest(anyString());

        assertDoesNotThrow(() -> customerService.deleteCustomer(storeId, customerId));
    }
}