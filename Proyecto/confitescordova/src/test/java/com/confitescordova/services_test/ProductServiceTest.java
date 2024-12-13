package com.confitescordova.services_test;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_repositories.ProductsRepository;
import com.confitescordova.entities.Product;
import com.confitescordova.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductsRepository productsRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        ReflectionTestUtils.setField(productService, "restTemplate", restTemplate);
    }

    @Test
    public void testGetAllProducts() {
        // Mock the response from the API
        String jsonResponse = "[{\"id\":1,\"name\":\"Product1\"},{\"id\":2,\"name\":\"Product2\"}]";
        when(productService.makeGetRequest(anyString())).thenReturn(jsonResponse);

        // Call the method
        List<Product> products = productService.getAllProducts(3806794L);

        // Verify the results
        assertNotNull(products);
        assertEquals(2, products.size());
        assertEquals(1, products.get(0).getId());
        assertEquals("Product1", products.get(0).getName());
    }

    @Test
    public void testSaveProducts() {
        // Create a list of Product objects
        Product product1 = new Product();
        product1.setId(1L);
        product1.setName("Product1");

        Product product2 = new Product();
        product2.setId(2L);
        product2.setName("Product2");

        List<Product> productList = Arrays.asList(product1, product2);

        // Call the method
        productService.saveProducts(productList);

        // Verify that the repository's saveAll method was called
        verify(productsRepository, times(1)).saveAll(anyList());
    }

    @Test
    public void testConvertToEntity() {
        // Create a Product object
        Product product = new Product();
        product.setId(1L);
        product.setName("Product1");

        // Call the method
        Products entity = productService.convertToEntity(product);

        // Verify the results
        assertNotNull(entity);
        assertEquals(1L, entity.getId_product());
        assertEquals("Product1", entity.getName());
    }

    @Test
    public void testGetProductById() {
        // Datos de prueba
        Long storeId = 1L;
        Long productId = 100L;
        Product expectedProduct = new Product();
        expectedProduct.setId(productId);
        expectedProduct.setName("Product Name");

        // URL esperada para la llamada GET
        String expectedUrl = "https://api.example.com/stores/1/products/100";  // Ajusta la URL según tu configuración

        // Simulamos la respuesta de RestTemplate con ResponseEntity
        String responseBody = "{\"id\": 100, \"name\": \"Product Name\"}"; // Respuesta de ejemplo
        ResponseEntity<String> mockResponse = new ResponseEntity<>(responseBody, HttpStatus.OK);

        // Simulamos el comportamiento de RestTemplate.getForEntity
        Mockito.when(restTemplate.getForEntity(expectedUrl, String.class)).thenReturn(mockResponse);

        // Llamamos al método que estamos probando
        Product actualProduct = productService.getProductById(storeId, productId);

        // Verificamos que RestTemplate hizo la llamada correcta
        Mockito.verify(restTemplate).getForEntity(expectedUrl, String.class);

        // Verificamos que el producto no es nulo
        assertNotNull(actualProduct);
        assertEquals(expectedProduct.getId(), actualProduct.getId()); // Verificamos el ID
        assertEquals(expectedProduct.getName(), actualProduct.getName()); // Verificamos el nombre
    }

    @Test
    public void testCreateProduct() {
        // Mock the response from the API
        String jsonResponse = "{\"id\":1,\"name\":\"Product1\"}";
        when(productService.makePostRequest(anyString(), any(Product.class))).thenReturn(jsonResponse);

        // Create a Product object
        Product product = new Product();
        product.setName("Product1");

        // Call the method
        Product createdProduct = productService.createProduct(3806794L, product);

        // Verify the results
        assertNotNull(createdProduct);
        assertEquals(1L, createdProduct.getId());
        assertEquals("Product1", createdProduct.getName());
    }

    @Test
    public void testUpdateProduct() {
        // Mock the response from the API
        String jsonResponse = "{\"id\":1,\"name\":\"UpdatedProduct\"}";
        when(productService.makePutRequest(anyString(), any(Product.class))).thenReturn(jsonResponse);

        // Create a Product object
        Product updatedProduct = new Product();
        updatedProduct.setName("UpdatedProduct");

        // Call the method
        Product result = productService.updateProduct(3806794L, 1L, updatedProduct);

        // Verify the results
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("UpdatedProduct", result.getName());
    }

    @Test
    public void testDeleteProduct() {
        // Call the method
        productService.deleteProduct(3806794L, 1L);

        // Verify that the delete request was made
        verify(productService, times(1)).makeDeleteRequest(anyString());
    }

    @Test
    public void testGetSortedProducts() {
        // Mock the response from the API
        String jsonResponse = "[{\"id\":1,\"name\":\"Product1\"},{\"id\":2,\"name\":\"Product2\"}]";
        when(productService.makeGetRequest(anyString())).thenReturn(jsonResponse);

        // Call the method
        List<Product> products = productService.getSortedProducts(3806794L, "name");

        // Verify the results
        assertNotNull(products);
        assertEquals(2, products.size());
        assertEquals(1, products.get(0).getId());
        assertEquals("Product1", products.get(0).getName());
    }

    @Test
    public void testGetFilteredProducts() {
        String jsonResponse = "[{\"id\":1,\"name\":\"Product1\",\"variants\":[{\"price\":\"100.0\"}]},{\"id\":2,\"name\":\"Product2\",\"variants\":[{\"price\":\"200.0\"}]}]";
        when(restTemplate.exchange(
            anyString(),
            eq(HttpMethod.GET),
            any(HttpEntity.class),
            eq(String.class),
            any(Object[].class)
        )).thenReturn(new ResponseEntity<>(jsonResponse, HttpStatus.OK));

        // Call the method
        List<Product> products = productService.getFilteredProducts(3806794L, null, 50.0, 150.0);

        // Verify the results
        assertNotNull(products);
        assertEquals(1, products.size());
        assertEquals(1L, products.get(0).getId());
        assertEquals("Product1", products.get(0).getName());
    }
}