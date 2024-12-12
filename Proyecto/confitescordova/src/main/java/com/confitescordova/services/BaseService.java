package com.confitescordova.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BaseService {
    @Autowired
    protected RestTemplate restTemplate;

    protected static final String ACCESS_TOKEN = "c37f1e0d618fc3dd6fb74c78f15975a89a55f022";
    protected static final String USER_AGENT = "MyApp (name@email.com)";
    protected final ObjectMapper objectMapper = new ObjectMapper();

    // Método para configurar las cabeceras
    public HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authentication", "bearer " + ACCESS_TOKEN); // Cambié "Authentication" a "Authorization"
        headers.set("User-Agent", USER_AGENT);
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    // Método para realizar una solicitud GET
    public String makeGetRequest(String url) {
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud GET: " + e.getMessage(), e);
        }
    }

    // Método para realizar una solicitud POST
    public String makePostRequest(String url, Object body) {
        try {
            String json = objectMapper.writeValueAsString(body);
            HttpEntity<String> entity = new HttpEntity<>(json, getHeaders());
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            return response.getBody();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el cuerpo de la solicitud a JSON: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud POST: " + e.getMessage(), e);
        }
    }

    // Método para realizar una solicitud PUT
    public String makePutRequest(String url, Object body) {
        try {
            String json = objectMapper.writeValueAsString(body);
            HttpEntity<String> entity = new HttpEntity<>(json, getHeaders());
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
            return response.getBody();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el cuerpo de la solicitud a JSON: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud PUT: " + e.getMessage(), e);
        }
    }

    // Método para realizar una solicitud DELETE
    public void makeDeleteRequest(String url) {
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        try {
            restTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud DELETE: " + e.getMessage(), e);
        }
    }

    // Método genérico para deserializar respuestas
    public <T> T parseResponse(String responseBody, Class<T> responseType) {
        try {
            return objectMapper.readValue(responseBody, responseType);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al deserializar la respuesta a " + responseType.getSimpleName() + ": " + e.getMessage(), e);
        }
    }
}
