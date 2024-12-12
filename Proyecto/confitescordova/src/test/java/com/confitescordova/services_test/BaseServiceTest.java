package com.confitescordova.services_test;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.confitescordova.services.BaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@ExtendWith(MockitoExtension.class)
public class BaseServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private BaseService baseService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testGetHeaders() {
        HttpHeaders headers = baseService.getHeaders();
        assertEquals("bearer c37f1e0d618fc3dd6fb74c78f15975a89a55f022", headers.getFirst("Authorization"));
        assertEquals("MyApp (name@email.com)", headers.getFirst("User-Agent"));
        assertEquals(MediaType.APPLICATION_JSON_VALUE, headers.getFirst(HttpHeaders.ACCEPT));
        assertEquals(MediaType.APPLICATION_JSON, headers.getContentType());
    }

    @Test
    public void testMakeGetRequest() {
        String url = "http://example.com";
        String expectedResponse = "{\"key\":\"value\"}";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.GET), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        String response = baseService.makeGetRequest(url);
        assertEquals(expectedResponse, response);
    }

    @Test
    public void testMakePostRequest() throws JsonProcessingException {
        String url = "http://example.com";
        Object body = new Object();
        String jsonBody = objectMapper.writeValueAsString(body);
        String expectedResponse = "{\"key\":\"value\"}";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.POST), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        String response = baseService.makePostRequest(url, body);
        assertEquals(expectedResponse, response);
    }

    @Test
    public void testMakePutRequest() throws JsonProcessingException {
        String url = "http://example.com";
        Object body = new Object();
        String jsonBody = objectMapper.writeValueAsString(body);
        String expectedResponse = "{\"key\":\"value\"}";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        when(restTemplate.exchange(eq(url), eq(HttpMethod.PUT), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        String response = baseService.makePutRequest(url, body);
        assertEquals(expectedResponse, response);
    }

    @Test
    public void testMakeDeleteRequest() {
        String url = "http://example.com";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        doNothing().when(restTemplate).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));

        baseService.makeDeleteRequest(url);
        verify(restTemplate, times(1)).exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class));
    }

    @Test
    public void testParseResponse() throws JsonProcessingException {
        String responseBody = "{\"key\":\"value\"}";
        ResponseType expectedResponse = new ResponseType();
        expectedResponse.setKey("value");

        ResponseType response = baseService.parseResponse(responseBody, ResponseType.class);
        assertEquals(expectedResponse.getKey(), response.getKey());
    }

    // Clase auxiliar para la prueba de parseResponse
    static class ResponseType {
        private String key;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }
    }
}