package com.confitescordova.services;

import com.confitescordova.entities.Order;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;


@Service
public class OrderService extends BaseService{

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/orders";

    public List<Order> getAllOrders(Long storeID) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString());
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Order[].class));
    }

    public Order getOrderById(Long storeId, Long orderId) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + orderId;
        String responseBody = makeGetRequest(url);
        return parseResponse(responseBody, Order.class);
    }

    public Order createOrder(Long storeId, Order order) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString());
        String responseBody = makePostRequest(url, order);
        return parseResponse(responseBody, Order.class);
    }

    public Order updateOrder(Long storeId, Long orderId, Order updatedOrder) {
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + orderId;
        String responseBody = makePutRequest(url, updatedOrder);
        return parseResponse(responseBody, Order.class);
    }

    public void deleteOrder(Long storeId, Long orderId){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "/" + orderId;
        makeDeleteRequest(url);
    }

    public List<Order> getSortedOrders(Long storeId, String sortBy){
        String url = API_BASE_URL.replace("{store_id}", storeId.toString()) + "?sort_by=" + sortBy;
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Order[].class));
    }

}
