package com.confitescordova.services;

import com.confitescordova.entities.Order;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class OrderService extends BaseService{

    private static final String API_BASE_URL = "https://api.tiendanube.com/v1/{store_id}/orders";

    // Método para obtener todas las órdenes con paginación
    public List<Order> getOrders(Long storeID, int page, int pageSize) {
        String url = API_BASE_URL.replace("{store_id}", storeID.toString()) + "?page=" + page + "&limit=" + pageSize;
        String responseBody = makeGetRequest(url);
        Order[] orders = parseResponse(responseBody, Order[].class);

        LocalDate minDate = LocalDate.of(2024, 12, 1); // CAMBIAR ESTA FECHA SEGÚN LO QUE SE REQUIERA

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ"); // Formato original

        // Filtrar las órdenes para obtener solo aquellas cuyo payment_status sea "paid"
        // Filtrar las órdenes para obtener solo aquellas cuyo payment_status sea "paid" y el nombre del cliente no sea "Sebastian Cordova" ni "Cliente anónimo"
        return Arrays.stream(orders)
                .filter(order -> "paid".equals(order.getPayment_status()))  // Filtro por estado de pago
                .filter(order -> !("Sebastian Cordova".equals(order.getCustomer().getName()) || "Cliente anónimo".equals(order.getCustomer().getName())))  // Filtro por nombre del cliente
                .filter(order -> {
                    try {
                        // Parsear la fecha de la orden al formato "yyyy-MM-dd"
                        ZonedDateTime zonedDateTime = ZonedDateTime.parse(order.getCreated_at(), formatter);
                        LocalDate orderDate = zonedDateTime.toLocalDate();

                        // Filtrar por fecha mínima
                        return !orderDate.isBefore(minDate);
                    } catch (Exception e) {
                        System.err.println("Error al parsear la fecha: " + order.getCreated_at());
                        return false; // Excluir órdenes con fechas inválidas
                    }
                })
                .collect(Collectors.toList());
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
