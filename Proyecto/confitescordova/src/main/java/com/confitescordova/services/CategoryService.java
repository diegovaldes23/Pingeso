package com.confitescordova.services;

import com.confitescordova.entities.Category;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService extends BaseService{

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/products";

    public List<Category> getAllCategories(Long storeID){
        String url = API_BASE_URL.replace("{store_id}", storeID.toString());
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Category[].class));
    }

    public Category createCategory(Long storeId, Category category){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString());
        String responseBody = makePostRequest(url, category);
        return parseResponse(responseBody, Category.class);
    }

    public Category updateCategory(Long storeId, Long categoryId, Category category){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + categoryId;
        String responseBody = makePutRequest(url, category);
        return parseResponse(responseBody, Category.class);
    }

    public void deleteCategory(Long storeId, Long categoryId){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + categoryId;
        makeDeleteRequest(url);
    }
}
