package com.confitescordova.services_test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.confitescordova.entities.Category;
import com.confitescordova.services.BaseService;
import com.confitescordova.services.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private CategoryService categoryService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testGetAllCategories() throws Exception {
        Long storeID = 1L;
        String url = "https://api.tiendanube.com/v1/" + storeID + "/products";
        String expectedResponse = "[{\"id\":1,\"name\":[\"Category 1\"]}]";

        HttpHeaders headers = categoryService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.GET), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makeGetRequestMethod = BaseService.class.getDeclaredMethod("makeGetRequest", String.class);
        makeGetRequestMethod.setAccessible(true);
        String responseBody = (String) makeGetRequestMethod.invoke(categoryService, url);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Category[] categoriesArray = (Category[]) parseResponseMethod.invoke(categoryService, responseBody, Category[].class);

        List<Category> categories = Arrays.asList(categoriesArray);
        assertEquals(1, categories.size());
        assertEquals("Category 1", categories.get(0).getName().get(0));
    }

    @Test
    public void testCreateCategory() throws Exception {
        Long storeId = 1L;
        Category category = new Category();
        category.setName(Arrays.asList("New Category"));
        String url = "https://api.tiendanube.com/v1/" + storeId + "/products";
        String expectedResponse = "{\"id\":1,\"name\":[\"New Category\"]}";

        HttpHeaders headers = categoryService.getHeaders();
        String jsonBody = objectMapper.writeValueAsString(category);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.POST), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makePostRequestMethod = BaseService.class.getDeclaredMethod("makePostRequest", String.class, Object.class);
        makePostRequestMethod.setAccessible(true);
        String responseBody = (String) makePostRequestMethod.invoke(categoryService, url, category);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Category createdCategory = (Category) parseResponseMethod.invoke(categoryService, responseBody, Category.class);

        assertNotNull(createdCategory);
        assertEquals("New Category", createdCategory.getName().get(0));
    }

    @Test
    public void testUpdateCategory() throws Exception {
        Long storeId = 1L;
        Long categoryId = 1L;
        Category category = new Category();
        category.setName(Arrays.asList("Updated Category"));
        String url = "https://api.tiendanube.com/v1/" + storeId + "/products/" + categoryId;
        String expectedResponse = "{\"id\":1,\"name\":[\"Updated Category\"]}";

        HttpHeaders headers = categoryService.getHeaders();
        String jsonBody = objectMapper.writeValueAsString(category);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.PUT), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        Method makePutRequestMethod = BaseService.class.getDeclaredMethod("makePutRequest", String.class, Object.class);
        makePutRequestMethod.setAccessible(true);
        String responseBody = (String) makePutRequestMethod.invoke(categoryService, url, category);

        Method parseResponseMethod = BaseService.class.getDeclaredMethod("parseResponse", String.class, Class.class);
        parseResponseMethod.setAccessible(true);
        Category updatedCategory = (Category) parseResponseMethod.invoke(categoryService, responseBody, Category.class);

        assertNotNull(updatedCategory);
        assertEquals("Updated Category", updatedCategory.getName().get(0));
    }

    @Test
    public void testDeleteCategory() throws Exception {
        Long storeId = 1L;
        Long categoryId = 1L;
        String url = "https://api.tiendanube.com/v1/" + storeId + "/products/" + categoryId;

        HttpHeaders headers = categoryService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        doNothing().when(restTemplate).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));

        Method makeDeleteRequestMethod = BaseService.class.getDeclaredMethod("makeDeleteRequest", String.class);
        makeDeleteRequestMethod.setAccessible(true);
        makeDeleteRequestMethod.invoke(categoryService, url);

        verify(restTemplate, times(1)).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));
    }
}