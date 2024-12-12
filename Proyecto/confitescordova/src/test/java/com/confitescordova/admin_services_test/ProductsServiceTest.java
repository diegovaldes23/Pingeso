package com.confitescordova.admin_services_test;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_repositories.ProductsRepository;
import com.confitescordova.admin_services.ProductsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ProductsServiceTest {

    @Mock
    private ProductsRepository productsRepository;

    @InjectMocks
    private ProductsService productsService;

    private Products product;

    @BeforeEach
    void setUp() {
        product = new Products();
        product.setId_product(1L);
        product.setName("Producto 1");
        product.setDescription("Descripción del producto");
        product.setCost(100.0);
    }

    @Test
    public void testGetAllProducts() {
        List<Products> productList = Arrays.asList(product);
        when(productsRepository.findAll()).thenReturn(productList);

        List<Products> result = productsService.getAllProducts();
        assertEquals(1, result.size());
        assertEquals("Producto 1", result.get(0).getName());
    }

    @Test
    public void testGetProductById() {
        when(productsRepository.findById(1L)).thenReturn(Optional.of(product));

        Optional<Products> result = productsService.getProductById(1L);
        assertTrue(result.isPresent());
        assertEquals("Producto 1", result.get().getName());
    }

    @Test
    public void testSaveProduct() {
        when(productsRepository.save(any(Products.class))).thenReturn(product);

        Products newProduct = new Products();
        newProduct.setDescription("Descripción muy larga que debe ser recortada a 255 caracteres...");
        Products result = productsService.saveProduct(newProduct);

        assertNotNull(result);
        assertEquals("Descripción muy larga que debe ser recortada a 255 caracteres...".substring(0, 255), result.getDescription());
    }

    @Test
    public void testDeleteProduct() {
        doNothing().when(productsRepository).deleteById(1L);

        productsService.deleteProduct(1L);
        verify(productsRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetProductByName() {
        when(productsRepository.findByName("Producto 1")).thenReturn(Optional.of(product));

        Optional<Products> result = productsService.getProductByName("Producto 1");
        assertTrue(result.isPresent());
        assertEquals("Producto 1", result.get().getName());
    }
}