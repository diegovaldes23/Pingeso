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
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.*;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@ExtendWith(MockitoExtension.class)
public class BaseServiceTest {


    @Mock
    private RestTemplate restTemplate;

    @Spy
    private BaseService baseService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        baseService = Mockito.spy(new BaseService()); // Usamos un nuevo spy de BaseService

        // Inicializamos el campo 'restTemplate' directamente en baseService
        ReflectionTestUtils.setField(baseService, "restTemplate", restTemplate);
    }

    @Test
    public void testGetHeaders() {
        // Mockear el comportamiento del método getHeaders
        HttpHeaders mockedHeaders = new HttpHeaders();
        mockedHeaders.set("Authorization", "bearer c37f1e0d618fc3dd6fb74c78f15975a89a55f022");
        mockedHeaders.set("User-Agent", "MyApp (name@email.com)");
        mockedHeaders.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        mockedHeaders.setContentType(MediaType.APPLICATION_JSON);

        doReturn(mockedHeaders).when(baseService).getHeaders(); // Simular el método

        // Invocar el método
        HttpHeaders headers = baseService.getHeaders();

        // Verificar los valores
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

        // Usamos un Map en lugar de un Object, ya que es fácilmente serializable
        Map<String, String> body = Map.of("key", "value");
        String jsonBody = objectMapper.writeValueAsString(body); // Convertimos el Map a JSON
        String expectedResponse = "{\"key\":\"value\"}";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        // Simulamos la respuesta del RestTemplate mockeado
        when(restTemplate.exchange(eq(url), eq(HttpMethod.POST), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        // Ejecutamos la prueba
        String response = baseService.makePostRequest(url, body);

        // Aseguramos que la respuesta sea la esperada
        assertEquals(expectedResponse, response);
    }

     @Test
    public void testMakePutRequest() throws JsonProcessingException {
        String url = "http://example.com";
        Map<String, String> body = Map.of("key", "value");
        String jsonBody = objectMapper.writeValueAsString(body);
        String expectedResponse = "{\"key\":\"value\"}";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        // Simulamos la respuesta del RestTemplate mockeado
        when(restTemplate.exchange(eq(url), eq(HttpMethod.PUT), eq(entity), eq(String.class)))
                .thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));

        // Ejecutamos la prueba
        String response = baseService.makePutRequest(url, body);

        // Aseguramos que la respuesta sea la esperada
        assertEquals(expectedResponse, response);
    }

    @Test
    public void testMakeDeleteRequest() {
        String url = "http://example.com";

        HttpHeaders headers = baseService.getHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Simulamos la respuesta del RestTemplate exchange para un método DELETE
        when(restTemplate.exchange(eq(url), eq(HttpMethod.DELETE), eq(entity), eq(Void.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.NO_CONTENT)); // Aquí devolvemos una respuesta vacía

        // Llamamos al método a probar
        baseService.makeDeleteRequest(url);

        // Verificamos que exchange() haya sido llamado una vez con los parámetros correctos
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