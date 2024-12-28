package com.confitescordova.admin_services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

import com.confitescordova.admin_entities.Customer;
import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.entities.Order;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;



@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepository;
    @Autowired
    private OrderProductService orderProductService;

    public List<Orders> getAllOrders() {
        List<Orders> orders = (List<Orders>) orderRepository.findAll();

        orders.sort(Comparator.comparing(Orders::getOrder_date).reversed());

        return orders;
    }

    public Optional<Orders> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    // Para obtener los productos mas vendidos
    public List<CommuneOrderCountDTO> salesByCommune() {
        return orderRepository.countOrdersByCommune();
    }

    public List<SalesByChannelDTO> salesByChannel() {
        return orderRepository.salesByChannel();
    }

    public Orders save(Orders order){
        return orderRepository.save(order);
    }

    public Optional<Orders> getOrderByExternalId(Long externalOrderId) {
        // Supongamos que tienes un campo 'externalOrderId' en tu entidad Orders para almacenar este ID único.
        return orderRepository.findByExternalOrderId(externalOrderId);
    }


    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Orders changeDeliveryDate(Long orderId, String deliveryDate) {
        // Verificar si la orden existe
        Optional<Orders> optionalOrder = orderRepository.findById(orderId);

        // Si no existe la orden, lanzar una excepción o manejar el error
        if (optionalOrder.isEmpty()) {
            throw new EntityNotFoundException("La orden con ID " + orderId + " no fue encontrada.");
        }

        // Obtener la orden
        Orders order = optionalOrder.get();

        order.setDelivery_date(LocalDate.parse(deliveryDate));
        return orderRepository.save(order);
    }

    public Orders changeStatus(Long orderId, String status) {
        // Verificar si la orden existe
        Optional<Orders> optionalOrder = orderRepository.findById(orderId);

        // Si no existe la orden, lanzar una excepción o manejar el error
        if (optionalOrder.isEmpty()) {
            throw new EntityNotFoundException("La orden con ID " + orderId + " no fue encontrada.");
        }

        // Obtener la orden
        Orders order = optionalOrder.get();

        // Actualizar solo el estado de la orden
        order.setStatus(status);

        // Usar save() para actualizar la orden existente
        return orderRepository.save(order); // Esto actualiza la orden con el mismo ID
    }

    public List<Map<String, Object>> getTopTenCustomers() {
        Pageable top10 = PageRequest.of(0, 10); // Limita los resultados a los 10 primeros
        List<Object[]> results = orderRepository.findTopCustomers(top10);

        // Transforma los resultados en una lista de mapas o un DTO
        List<Map<String, Object>> topCustomers = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> customerData = new HashMap<>();
            customerData.put("name", row[0]);
            customerData.put("phone", row[1]);
            customerData.put("totalSpent", row[2]);
            topCustomers.add(customerData);
        }
        return topCustomers;
    }

    public Orders updateOrder(Orders order) {
        // Verificar si la orden existe
        Optional<Orders> optionalOrder = orderRepository.findById(order.getId());

        // Si no existe la orden, lanzar una excepción o manejar el error
        if (optionalOrder.isEmpty()) {
            throw new EntityNotFoundException("La orden con ID " + order.getId() + " no fue encontrada.");
        }

        // Obtener la orden
        Orders newOrder = optionalOrder.get();

        // Actualizar solo el estado de la orden
        newOrder.setOrder_date(order.getOrder_date());
        newOrder.setPhone(order.getPhone());
        newOrder.setShipping_cost(order.getShipping_cost());
        newOrder.setStatus(order.getStatus());
        newOrder.setDelivery_date(order.getDelivery_date());
        newOrder.setDescription(order.getDescription());
        newOrder.setAddress(order.getAddress());
        newOrder.setEmail(order.getEmail());
        newOrder.setPhone(order.getPhone());
        newOrder.setCommune(order.getCommune());
        newOrder.setRegion(order.getRegion());
        newOrder.setSubtotal(order.getSubtotal());
        newOrder.setTotal(order.getTotal());

        newOrder.getOrderProducts().clear();

        List<OrderProduct> updatedProducts = order.getOrderProducts();
        for(OrderProduct product : updatedProducts){
            product.setOrder(newOrder);
            newOrder.getOrderProducts().add(product);
        }

        // Usar save() para actualizar la orden existente
        return orderRepository.save(order); // Esto actualiza la orden con el mismo ID
    }

    public Orders saveLocal(Orders order) {
        order.setCreation_date(LocalDate.now());
        order.setOrder_date(transformDate(order.getOrder_date().toString()));
        
        return orderRepository.save(order);
    }

    public LocalDate transformDate(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Define el patrón de la fecha

        // Convertir String a LocalDate
        LocalDate date = LocalDate.parse(dateString, formatter);

        // Imprimir la fecha
        System.out.println("LocalDate: " + date);

        return date;
    }

    // Método para obtener las órdenes por el username_creator
    public List<Orders> getOrdersByUsernameCreator(String usernameCreator) {
        return orderRepository.findByUsernameCreator(usernameCreator);
    }

    public List<Orders> getOrdersByFiltering(
            String region,
            String commune,
            String startDateString,
            String endDateString,
            String customerType,
            String purchaseSource,
            String status,
            String productName,
            Integer year,
            Integer month,
            String searchTerm
    ){
        // Usa Specifications para construir dinámicamente la consulta
        Specification<Orders> spec = Specification.where(null);

        LocalDate startDate = null;
        LocalDate endDate = null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            if (startDateString != null && !startDateString.isEmpty()) {
                startDate = LocalDate.parse(startDateString, formatter);
            }
            if (endDateString != null && !endDateString.isEmpty()) {
                endDate = LocalDate.parse(endDateString, formatter);
            }
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Error al parsear las fechas: " + e.getMessage());
        }

        // Variables finales efectivas
        final LocalDate finalStartDate = startDate;
        final LocalDate finalEndDate = endDate;

        // Agregar los filtros de fecha
        if (startDate != null && endDate != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.between(root.get("order_date"), finalStartDate, finalEndDate)
            );
        } else if (startDate != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("order_date"), finalStartDate)
            );
        } else if (endDate != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("order_date"), finalEndDate)
            );
        }

        if (region != null && !region.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("region"), region));
        }

        if (commune != null && !commune.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("commune"), commune));
        }

        if (customerType != null && !customerType.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("customer_type"), customerType));
        }

        if (purchaseSource != null && !purchaseSource.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("purchase_source"), purchaseSource));
        }

        if (status != null && !status.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status));
        }

        if (productName != null && !productName.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.join("orderProducts").get("name")), "%" + productName.toLowerCase() + "%"));
        }

        if (year != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(criteriaBuilder.function("YEAR", Integer.class, root.get("order_date")), year));
        }

        if (month != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(criteriaBuilder.function("MONTH", Integer.class, root.get("order_date")), month));
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> {
                String search = "%" + searchTerm.toLowerCase() + "%";
                return criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), search),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("address")), search),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("region")), search),
                        criteriaBuilder.like(criteriaBuilder.lower(root.join("orderProducts").get("name")), search)
                );
            });
        }

        List<Orders> orders = orderRepository.findAll(spec);

        orders.sort(Comparator.comparing(Orders::getOrder_date).reversed());

        return orders;
    }
}
