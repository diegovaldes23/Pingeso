package com.confitescordova.services_test;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_repositories.ProductsRepository;
import com.confitescordova.entities.Product;
import com.confitescordova.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

public class ProductServiceTest {

    @Mock
    private ProductsRepository productsRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
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
        // Mock the response from the API
        String jsonResponse = "{\"id\":1,\"name\":\"Product1\"}";
        when(productService.makeGetRequest(anyString())).thenReturn(jsonResponse);

        // Call the method
        Product product = productService.getProductById(3806794L, 1L);

        // Verify the results
        assertNotNull(product);
        assertEquals(1L, product.getId());
        assertEquals("Product1", product.getName());
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
        // Mock the response from the API
        String jsonResponse = "[{\"id\":1,\"name\":\"Product1\",\"variants\":[{\"price\":\"100.0\"}]},{\"id\":2,\"name\":\"Product2\",\"variants\":[{\"price\":\"200.0\"}]}]";
        when(productService.makeGetRequest(anyString())).thenReturn(jsonResponse);

        // Call the method
        List<Product> products = productService.getFilteredProducts(3806794L, null, 50.0, 150.0);

        // Verify the results
        assertNotNull(products);
        assertEquals(1, products.size());
        assertEquals(1L, products.get(0).getId());
        assertEquals("Product1", products.get(0).getName());
    }
}