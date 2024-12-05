package com.confitescordova.services;

import com.confitescordova.entities.Order;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class OrderService extends BaseService{

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/orders";

    // Método para obtener todas las órdenes con paginación
    public List<Order> getOrders(Long storeID, int page, int pageSize) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString()) + "?page=" + page + "&limit=" + pageSize;
        String responseBody = makeGetRequest(url);
        return Arrays.asList(parseResponse(responseBody, Order[].class));
    }

    // En el método getAllOrders
    public List<Order> getAllOrders(Long storeID) {
        int page = 1;  // Página inicial
        int pageSize = 100;  // Número de órdenes por página
        List<Order> allOrders = new ArrayList<>();
        List<Order> ordersOnCurrentPage;

        // Continuar pidiendo órdenes hasta que no haya más órdenes
        do {
            System.out.println("Solicitando página: " + page);  // Agrega un log para ver qué página se está solicitando
            ordersOnCurrentPage = getOrders(storeID, page, pageSize);
            System.out.println("Órdenes en la página " + page + ": " + ordersOnCurrentPage.size());  // Agrega un log para ver cuántas órdenes se recuperan

            if (ordersOnCurrentPage != null && !ordersOnCurrentPage.isEmpty()) {
                allOrders.addAll(ordersOnCurrentPage);
                page++;  // Incrementar la página para la siguiente solicitud
            } else {
                System.out.println("No hay más órdenes en la página " + page);  // Agrega un log para confirmar cuándo no hay más órdenes
            }

        } while (ordersOnCurrentPage != null && !ordersOnCurrentPage.isEmpty());

        System.out.println("Total de órdenes recuperadas: " + allOrders.size());  // Agrega un log al final para ver cuántas órdenes se han recuperado
        return allOrders;
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
