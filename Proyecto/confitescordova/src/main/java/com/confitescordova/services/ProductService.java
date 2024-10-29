package com.confitescordova.services;

import com.confitescordova.entities.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/products";
    private static final String ACCESS_TOKEN = "914c5d5d06c8c773a4078641a586893530b64298";  // Reemplazar con tu token
    private static final String USER_AGENT = "MyApp (name@email.com)";
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Método para configurar las cabeceras
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authentication", "bearer " + ACCESS_TOKEN);  // Usar la cabecera correcta "Authorization"
        headers.set("User-Agent", USER_AGENT);
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }

    // Método para realizar la solicitud HTTP y devolver la respuesta como String
    private String makeGetRequest(String url) {
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error al realizar la solicitud GET: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public List<Product> getAllProducts(Long storeID) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString());
        String responseBody = makeGetRequest(url);

        if (responseBody == null) {
            return List.of(); // Retorna una lista vacía en caso de error
        }

        try {
            Product[] productArray = objectMapper.readValue(responseBody, Product[].class);
            return Arrays.asList(productArray);
        } catch (JsonProcessingException e) {
            System.err.println("Error al procesar el JSON: " + e.getMessage());
            e.printStackTrace();
            return List.of(); // Retorna una lista vacía en caso de error
        }
    }

    public Product getProductById(Long storeId, Long productID) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + productID;
        String responseBody = makeGetRequest(url);

        if (responseBody == null) {
            return null; // Retorna null en caso de error
        }

        try {
            return objectMapper.readValue(responseBody, Product.class);
        } catch (JsonProcessingException e) {
            System.err.println("Error al procesar el JSON: " + e.getMessage());
            e.printStackTrace();
            return null; // Retorna null en caso de error
        }
    }
}
