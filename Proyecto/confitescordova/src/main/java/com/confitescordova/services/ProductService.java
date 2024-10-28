package com.confitescordova.services;

import com.confitescordova.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ProductService {
    @Autowired
    private RestTemplate restTemplate;

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/products";
    private static final String ACCESS_TOKEN = "f7fa59a6079ceb67895851ee330f7a9d97e407ad";

    public Product getAllProducts(Long storeID){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + ACCESS_TOKEN);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = API_BASE_URL.replace("{store_id}", storeID.toString());

        ResponseEntity<Product> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Product.class
        );

        return response.getBody();
    }
}
