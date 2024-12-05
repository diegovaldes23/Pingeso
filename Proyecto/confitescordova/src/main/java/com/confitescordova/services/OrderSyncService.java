package com.confitescordova.services;

import com.confitescordova.admin_entities.Customer;
import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_services.CustomersService;
import com.confitescordova.admin_services.OrderProductService;
import com.confitescordova.admin_services.OrdersService;
import com.confitescordova.entities.Order;
import com.confitescordova.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderSyncService implements CommandLineRunner {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private CustomersService customersService;

    @Autowired
    private OrderProductService orderProductService;

    @Override
    public void run(String... args) throws Exception {
        // Esto asegura que la sincronización de pedidos se ejecute al inicio
        syncOrders();
    }

    @Scheduled(fixedRate = 9000) // Ejecutar cada 15 minutos
    public void syncOrders() {
        Long storeID = 3806794L;
        int page = 1;
        int pageSize = 50; // O el tamaño de página que corresponda a la API

        try {
            while (true) {
                List<Order> tiendanubeOrders = orderService.getOrders(storeID, page, pageSize);

                if (tiendanubeOrders.isEmpty()) {
                    break; // Si no hay más órdenes, se detiene la paginación
                }

                for (Order tnOrder : tiendanubeOrders) {
                    Orders localOrder = convertTiendanubeOrder(tnOrder);
                    saveOrderIfNotExists(localOrder, Long.valueOf(tnOrder.getId()));
                }

                page++; // Avanza a la siguiente página
            }
        } catch (Exception e) {
            System.err.println("Error sincronizando pedidos: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private Orders convertTiendanubeOrder(Order tnOrder) {
        Orders localOrder = new Orders();
        ArrayList<OrderProduct> orderProducts = new ArrayList<>();

        localOrder.setName(tnOrder.getCustomer().getName());
        String formattedPhone = formatPhoneNumber(tnOrder.getCustomer().getPhone());
        localOrder.setPhone(formattedPhone);

        saveCustomerIfNotExists(tnOrder.getCustomer().getId(), tnOrder.getCustomer().getName(), formattedPhone);

        if(customersService.existsCustomerById(tnOrder.getCustomer().getId())){
            localOrder.setCustomer_type("Antiguo");
        } else {
            localOrder.setCustomer_type("Nuevo");
        }

        localOrder.setRegion(tnOrder.getBilling_province());
        localOrder.setCommune(tnOrder.getCustomer().getBilling_city());
        localOrder.setInitial_payment(0.0);

        // Usar un formato adecuado para la fecha con zona horaria
        String createdAtString = tnOrder.getCreated_at();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");

        // Convertir la fecha usando el formateador
        OffsetDateTime createdAt = OffsetDateTime.parse(createdAtString, formatter);

        // Establecer la fecha en la orden
        localOrder.setOrder_date(createdAt.toLocalDate()); // Solo la fecha
        localOrder.setShipping_cost(tnOrder.getShipping_cost_owner());
        localOrder.setSubtotal(tnOrder.getTotal());
        localOrder.setTotal(tnOrder.getTotal() + tnOrder.getShipping_cost_owner());
        localOrder.setStatus("Pendiente");
        localOrder.setPurchase_source("Tiendanube");
        localOrder.setAddress(tnOrder.getShipping_address().getAddress() + " " + tnOrder.getShipping_address().getNumber() + ", " + tnOrder.getShipping_address().getFloor());
        localOrder.setEmail(tnOrder.getCustomer().getEmail());
        localOrder.setCreation_date(LocalDate.now());
        localOrder.setDelivery_date(LocalDate.now());
        localOrder.setExternalOrderId(tnOrder.getId());

        // Verificar si 'note' es null antes de usarlo
        if (tnOrder.getNote() != null) {
            localOrder.setDescription(tnOrder.getNote().length() > 255 ? tnOrder.getNote().substring(0, 255) : tnOrder.getNote());
        } else {
            localOrder.setDescription("Sin descripción");  // O puedes asignar un valor predeterminado
        }

        for (Product product : tnOrder.getProducts()) {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setId_product(product.getId());
            orderProduct.setName(product.getName());
            orderProduct.setDescription("No disponible");
            orderProduct.setQuantity(product.getQuantity());

            double discount = tnOrder.getDiscount() / tnOrder.getSubtotal();
            orderProduct.setUnit_cost(product.getPrice() * (1 - discount));
            orderProduct.setCost(orderProduct.getUnit_cost() * product.getQuantity());
            orderProduct.setOrder(localOrder);

            orderProducts.add(orderProduct);
        }

        localOrder.setOrderProducts(orderProducts);

        return localOrder;
    }

    private void saveOrderIfNotExists(Orders order, Long externalOrderId) {
        // Verificar si ya existe la orden por ID de pedido externo
        Optional<Orders> existingOrderOpt = ordersService.getOrderByExternalId(externalOrderId); // Cambié la búsqueda a buscar por externalOrderId

        if (existingOrderOpt.isPresent()) {
            // Si la orden ya existe, actualízala si es necesario
            Orders existingOrder = existingOrderOpt.get();
            updateOrderIfNeeded(existingOrder, order); // Si hay diferencias, se actualiza el pedido
        } else {
            // Si la orden no existe, guárdala
            Orders savedOrder = ordersService.save(order);

            // Asegúrate de que la lista de productos no sea null o vacía antes de guardarlos
            if (order.getOrderProducts() != null && !order.getOrderProducts().isEmpty()) {
                // Asocia el Order a los productos antes de persistirlos
                for (OrderProduct product : order.getOrderProducts()) {
                    product.setOrder(savedOrder);  // Establecer la relación
                }
                saveOrderProducts(savedOrder, order.getOrderProducts());
            }
        }
    }


    private void updateOrderIfNeeded(Orders existingOrder, Orders newOrder) {
        // Compara y actualiza los campos necesarios
        if (!existingOrder.getStatus().equals(newOrder.getStatus())) {
            existingOrder.setStatus(newOrder.getStatus());
            ordersService.save(existingOrder);
        }
    }

    private String formatPhoneNumber(String phone) {
        // Eliminar cualquier espacio, guión u otros caracteres no numéricos
        phone = phone.replaceAll("[^0-9]", "");

        // Verificar si ya comienza con +569
        if (phone.length() == 8) {
            // Si empieza con 9 y tiene 8 dígitos, agregar +569
            return "+569" + phone;
        } else if (phone.startsWith("+569")) {
            // Si ya empieza con +569, devolverlo tal cual
            return phone;
        } else if (phone.startsWith("569")) {
            return "+" + phone;
        } else if (phone.startsWith("9") && phone.length() == 9) {
            return "+56" + phone;
        } else {
            // Si no empieza con +569, agregar +569 al principio
            return "+569" + phone;
        }
    }

    private void saveCustomerIfNotExists(Long customerId, String name, String phone){
        Optional<Customer> existingCustomer = customersService.getCustomerById(customerId);
        if(existingCustomer.isPresent()){
            // Si el cliente ya existe, puedes actualizar la información si es necesario
            Customer customer = existingCustomer.get();
            customer.setName(name);
            customer.setPhone(phone);
            customersService.saveCustomer(customer);
        } else {
            // Si no existe, lo insertas
            Customer newCustomer = new Customer();
            newCustomer.setId(customerId);
            newCustomer.setName(name);
            newCustomer.setPhone(phone);
            customersService.saveCustomer(newCustomer);
        }
    }


    private void saveOrderProducts(Orders order, List<OrderProduct> products) {
        for (OrderProduct product : products) {

            product.setOrder(order);  // Establece la relación con la orden
            orderProductService.save(product);  // Guarda cada producto
        }
    }

}
