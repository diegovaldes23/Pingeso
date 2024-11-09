package com.confitescordova.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.confitescordova.entities.Customer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;

@Service
public class CustomerService {
    @Autowired
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/customers";
    private static final String ACCESS_TOKEN = "914c5d5d06c8c773a4078641a586893530b64298"; 

    private static final String USER_AGENT = "MyApp (name@email.com)";
    private final ObjectMapper objectMapper = new ObjectMapper();

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "bearer " + ACCESS_TOKEN);  // Corrección: Authorization
        headers.set("User-Agent", USER_AGENT);
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }

    // Para hacer todo tipo de consulta GET
    private String makeGetRequest(String url) {
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error al realizar la solicitud GET: " + e.getMessage());
            return null;
        }
    }

    // Para obtener todos los clientes
    public List<Customer> getAllCustomers(Long storeID) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString());
        String responseBody = makeGetRequest(url);

        if (responseBody == null) {
            return List.of();
        }

        try {
            Customer[] customerArray = objectMapper.readValue(responseBody, Customer[].class);
            return Arrays.asList(customerArray);
        } catch (JsonProcessingException e) {
            System.err.println("Error al procesar el JSON: " + e.getMessage());
            return List.of();
        }
    }

    // Para obtener clientes por ID
    public Customer getCustomerById(Long storeId, Long customerId) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + customerId;
        String responseBody = makeGetRequest(url);

        if (responseBody == null) {
            return null;
        }

        try {
            return objectMapper.readValue(responseBody, Customer.class);
        } catch (JsonProcessingException e) {
            System.err.println("Error al procesar el JSON: " + e.getMessage());
            return null;
        }
    }
    
    // Para crear clientes
    public Customer createCustomer(Long storeId, Customer customer) {
        HttpHeaders headers = getHeaders();
        String url = API_BASE_URL.replace("{store_id}", storeId.toString());

        try {
            String customerJson = objectMapper.writeValueAsString(customer);
            HttpEntity<String> entity = new HttpEntity<>(customerJson, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            return handleResponse(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el cliente a JSON: " + e.getMessage());
        }
    }

    // Para manejar errores en creación de clientes
    private Customer handleResponse(ResponseEntity<String> response) {
        try {
            if (response.getStatusCode() == HttpStatus.CREATED) {
                return objectMapper.readValue(response.getBody(), Customer.class);
            } else {
                throw new RuntimeException("Error al crear cliente: Código de estado " + response.getBody());
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al deserializar la respuesta del cliente", e);
        }
    }

    // Para actualizar datos del cliente
    public Customer updateCustomer(Long storeId, Long customerId, Customer updatedCustomer) {
        HttpHeaders headers = getHeaders();
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + customerId;

        try {
            String updatedCustomerJson = objectMapper.writeValueAsString(updatedCustomer);
            HttpEntity<String> entity = new HttpEntity<>(updatedCustomerJson, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
            return handleUpdateResponse(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el cliente actualizado a JSON", e);
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud PUT", e);
        }
    }

    // Para manejar errores de la actualización de datos del cliente
    private Customer handleUpdateResponse(ResponseEntity<String> response) {
        try {
            if (response.getStatusCode() == HttpStatus.OK) {
                return objectMapper.readValue(response.getBody(), Customer.class);
            } else {
                throw new RuntimeException("Error al actualizar cliente: Código de estado " + response.getStatusCode());
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al deserializar la respuesta del cliente actualizado", e);
        }
    }

    // Para borrar clientes
    public void deleteCustomer(Long storeId, Long customerId) {
        HttpHeaders headers = getHeaders();
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + customerId;

        try {
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);

            if (response.getStatusCode() == HttpStatus.OK || response.getStatusCode() == HttpStatus.NO_CONTENT) {
                System.out.println("Cliente eliminado exitosamente.");
            } else {
                throw new RuntimeException("Error al eliminar el cliente: Código de estado " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud DELETE", e);
        }
    }





}
