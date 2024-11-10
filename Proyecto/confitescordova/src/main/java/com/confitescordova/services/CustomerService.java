package com.confitescordova.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.confitescordova.entities.Customer;

@Service
public class CustomerService extends BaseService{
    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/customers";

    // Para obtener todos los clientes
    public List<Customer> getAllCustomers(Long storeID) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString());
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Customer[].class));
    }

    // Para obtener clientes por ID
    public Customer getCustomerById(Long storeId, Long customerId) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + customerId;
        String responseBody = makeGetRequest(url);
        return parseResponse(responseBody, Customer.class);
    }

    // Para crear clientes
    public Customer createCustomer(Long storeId, Customer customer) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString());
        String responseBody = makePostRequest(url, customer);
        return parseResponse(responseBody, Customer.class);
    }

    // Para actualizar datos del cliente
    public Customer updateCustomer(Long storeId, Long customerId, Customer updatedCustomer) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + customerId;
        String responseBody = makePutRequest(url, updatedCustomer);
        return parseResponse(responseBody, Customer.class);
    }

    // Para borrar clientes
    public void deleteCustomer(Long storeId, Long customerId) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + customerId;
        makeDeleteRequest(url);
    }

}
