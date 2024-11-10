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
import java.util.stream.Collectors;

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

    public Product createProduct(Long storeId, Product product) {
        HttpHeaders headers = getHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String url = API_BASE_URL.replace("{store_id}", storeId.toString());

        try {
            String productJson = objectMapper.writeValueAsString(product);
            HttpEntity<String> entity = new HttpEntity<>(productJson, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            return handleResponse(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el producto a JSON: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud POST: " + e.getMessage());
        }
    }

    public Product handleResponse(ResponseEntity<String> response) {
        try {
            if (response.getStatusCode() == HttpStatus.CREATED) {
                return objectMapper.readValue(response.getBody(), Product.class);
            } else {
                throw new RuntimeException("Error al crear producto: Código de estado " + response.getBody());
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al deserializar la respuesta del producto " + e.getMessage());
        }
    }

    public Product updateProduct(Long storeId, Long productID, Product updatedProduct) {
        HttpHeaders headers = getHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + productID;

        try {
            // Serializar el objeto Product actualizado a JSON
            String updatedProductJson = objectMapper.writeValueAsString(updatedProduct);
            HttpEntity<String> entity = new HttpEntity<>(updatedProductJson, headers);

            // Hacer la solicitud PUT para actualizar el producto
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);

            return handleUpdateResponse(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el producto actualizado a JSON", e);
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud PUT", e);
        }
    }

    private Product handleUpdateResponse(ResponseEntity<String> response) {
        try {
            if (response.getStatusCode() == HttpStatus.OK) {
                return objectMapper.readValue(response.getBody(), Product.class);
            } else {
                throw new RuntimeException("Error al actualizar producto: Código de estado " + response.getStatusCode());
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al deserializar la respuesta del producto actualizado", e);
        }
    }

    public void deleteProduct(Long storeId, Long productId){
        HttpHeaders headers = getHeaders();
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + productId;

        try {
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Hacer la solicitud DELETE
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);

            // Verificar el estado de la respuesta
            if (response.getStatusCode() == HttpStatus.OK || response.getStatusCode() == HttpStatus.NO_CONTENT) {
                System.out.println("Producto eliminado exitosamente.");
            } else {
                throw new RuntimeException("Error al eliminar el producto: Código de estado " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al realizar la solicitud DELETE", e);
        }
    }

    public List<Product> getSortedProducts(Long storeId, String sortBy){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "?sort_by=" + sortBy;
        String responseBody = makeGetRequest(url);

        if (responseBody == null) {
            return List.of();
        }

        try {
            Product[] productArray = objectMapper.readValue(responseBody, Product[].class);
            return Arrays.asList(productArray);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al realizar petición GET de productos ordenados", e);
        }
    }

    public List<Product> getFilteredProducts(Long storeID, Long categoryId, Double minPrice, Double maxPrice) {
        // Verificar que al menos uno de los parámetros esté presente
        if (categoryId == null && minPrice == null && maxPrice == null) {
            throw new IllegalArgumentException("Debe proporcionar al menos un parámetro de filtro (categoría o rango de precio).");
        }

        // Construir la URL base
        StringBuilder urlBuilder = new StringBuilder(API_BASE_URL.replace("{store_id}", storeID.toString()));

        // Agregar parámetros de consulta si están presentes
        boolean hasParams = false;
        if (categoryId != null) {
            urlBuilder.append(hasParams ? "&" : "?").append("category_id=").append(categoryId);
            hasParams = true;
        }

        // Convertir el StringBuilder a String
        String url = urlBuilder.toString();

        // Realizar la solicitud GET
        String responseBody = makeGetRequest(url);

        if (responseBody == null) {
            return List.of(); // Retorna una lista vacía en caso de error
        }

        try {
            Product[] productArray = objectMapper.readValue(responseBody, Product[].class);
            List<Product> products = Arrays.asList(productArray);

            // Aplicar filtrado manual por precio si es necesario
            return products.stream()
                    .filter(product -> {
                        boolean matches = true;
                        if(minPrice != null){
                            matches = matches && product.getVariants().stream()
                                    .anyMatch(variant -> {
                                        try {
                                            Double price = Double.parseDouble(variant.getPrice());
                                            return price >= minPrice;
                                        } catch (NumberFormatException e) {
                                            System.err.println("Error al convertir el precio: " + e.getMessage());
                                            return false;
                                        }
                                    });
                        }
                        if(maxPrice != null){
                            matches = matches && product.getVariants().stream()
                                    .anyMatch(variant -> {
                                        try {
                                            Double price = Double.parseDouble(variant.getPrice());
                                            return price <= maxPrice;
                                        } catch (NumberFormatException e) {
                                            System.err.println("Error al convertir el precio: " + e.getMessage());
                                            return false;
                                        }
                                    });
                        }
                        return matches;
                    })
                    .collect(Collectors.toList());

        } catch (JsonProcessingException e) {
            System.err.println("Error al procesar el JSON: " + e.getMessage());
            e.printStackTrace();
            return List.of(); // Retorna una lista vacía en caso de error
        }
    }


}
