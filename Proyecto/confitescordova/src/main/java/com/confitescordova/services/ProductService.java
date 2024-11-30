package com.confitescordova.services;

import com.confitescordova.admin_repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.confitescordova.entities.Product;
import com.confitescordova.admin_entities.Products;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService extends BaseService{

    @Autowired
    private ProductsRepository productsRepository;

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/products";
    private String storeIdString = "5336632";
    Long storeId = Long.parseLong(storeIdString);

    @PostConstruct
    public void init(){
        saveProducts(getAllProducts(storeId));
    }

    public List<Product> getAllProducts(Long storeID) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString());
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Product[].class));
    }

    public void saveProducts(List<Product> listaProductCom) {
        List<Products> products = listaProductCom.stream()
                                            .map(this::convertToEntity)
                                            .collect(Collectors.toList());
        productsRepository.saveAll(products);
    }

    public Products convertToEntity(Product productCompleto) {
        Products products = new Products();
        products.setId_product(productCompleto.getId());
        String espName = productCompleto.getName().get("es");
        products.setName(espName);
        String espDescription = (productCompleto.getDescription().get("es"));
        products.setDescription(espDescription);
        return products;
    }

    public Product getProductById(Long storeId, Long productId) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + productId;
        String responseBody = makeGetRequest(url);
        return parseResponse(responseBody, Product.class);
    }

    public Product createProduct(Long storeId, Product product) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString());
        String responseBody = makePostRequest(url, product);
        return parseResponse(responseBody, Product.class);
    }

    public Product updateProduct(Long storeId, Long productId, Product updatedProduct) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + productId;
        String responseBody = makePutRequest(url, updatedProduct);
        return parseResponse(responseBody, Product.class);
    }

    public void deleteProduct(Long storeId, Long productId){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + productId;
        makeDeleteRequest(url);
    }

    public List<Product> getSortedProducts(Long storeId, String sortBy){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "?sort_by=" + sortBy;
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Product[].class));
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
