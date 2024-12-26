package com.confitescordova.services;

import com.confitescordova.admin_entities.Customer;
import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_services.CustomersService;
import com.confitescordova.admin_services.OrderProductService;
import com.confitescordova.admin_services.OrdersService;
import com.confitescordova.admin_services.ProductsService;
import com.confitescordova.entities.Order;
import com.confitescordova.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
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

    @Autowired
    private ProductsService productsService;

    @Autowired
    private ProductService productService;

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

                // Ordenar los pedidos por fecha de creación
                tiendanubeOrders.sort(Comparator.comparing(Order::getCreated_at));

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

    public Orders convertTiendanubeOrder(Order tnOrder) {
        // Inicialización de nueva orden en base de datos local
        Orders localOrder = new Orders();
        // Inicialización de lista de productos de la orden
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
        LocalDate orderDateFormatted = convertToLocalDate(createdAtString);

        // Establecer la fecha en la orden
        localOrder.setOrder_date(orderDateFormatted); // Solo la fecha

        localOrder.setStatus("Completada");
        localOrder.setPurchase_source("Tiendanube");
        localOrder.setAddress(tnOrder.getShipping_address().getAddress() + " " + tnOrder.getShipping_address().getNumber() + ", " + tnOrder.getShipping_address().getFloor());
        localOrder.setEmail(tnOrder.getCustomer().getEmail());
        localOrder.setCreation_date(LocalDate.now());
        localOrder.setExternalOrderId(tnOrder.getId());

        // Verificar si 'note' es null antes de usarlo
        if (tnOrder.getNote() != null) {
            localOrder.setDescription(tnOrder.getNote().length() > 255 ? tnOrder.getNote().substring(0, 255) : tnOrder.getNote());
        } else {
            localOrder.setDescription("Sin descripción");  // O puedes asignar un valor predeterminado
        }

        Double subtotal = 0.0;

        for (Product product : tnOrder.getProducts()) {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setId_product(product.getId());

            if(!product.getName().equals("Nombre desconocido")){
                orderProduct.setName(product.getName());
            }

            orderProduct.setDescription("No disponible");
            orderProduct.setQuantity(product.getQuantity());

            saveProductIfNotExists(product.getName(), product.getPrice());

            double discount = tnOrder.getDiscount() / tnOrder.getSubtotal();
            orderProduct.setUnit_cost(product.getPrice() * (1 - discount));
            orderProduct.setCost(orderProduct.getUnit_cost() * product.getQuantity());
            orderProduct.setOrder(localOrder);

            subtotal = subtotal + orderProduct.getCost();
            orderProducts.add(orderProduct);
        }

        if(tnOrder.getBilling_province().equals("Metropolitana de Santiago")){
            localOrder.setSubtotal(subtotal - 5000);
            localOrder.setShipping_cost(5000.0);
        } else {
            localOrder.setSubtotal(subtotal);
            localOrder.setShipping_cost(tnOrder.getShipping_cost_owner());
        }

        localOrder.setTotal(localOrder.getSubtotal() + localOrder.getShipping_cost());

        localOrder.setOrderProducts(orderProducts);

        deleteNullProducts();

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
        }
    }

    public String formatPhoneNumber(String phone) {
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
        Optional<Customer> existingCustomer = customersService.getCustomerByPhoneAndName(phone, name);
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

    private void saveProductIfNotExists(String name, Double cost){
        // Validar que el nombre no esté vacío ni sea "Nombre desconocido"
        if (name == null || name.trim().isEmpty() || "Nombre desconocido".equals(name)) {
            return; // No guardes el producto si el nombre es inválido
        }

        Optional<Products> existingProduct = productsService.getProductByName(name);
        if(existingProduct.isPresent()){

        } else {
            // Si no existe, lo insertas
            Products newProducts = new Products();
            System.out.println(name);
            newProducts.setName(name);
            newProducts.setCost(cost);
            productsService.saveProduct(newProducts);
        }
    }

    public LocalDate convertToLocalDate(String createdAtString) {
        // Paso 1: Parsear la fecha con el formato original
        DateTimeFormatter originalFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
        ZonedDateTime createdAt = ZonedDateTime.parse(createdAtString, originalFormatter);

        // Paso 2: Convertir la fecha a formato "dd-MM-yyyy'T'HH:mm:ssZ" (esto es solo para mostrar el formato)
        DateTimeFormatter newFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
        String formattedDate = createdAt.format(newFormatter);

        // Paso 3: Convertir la fecha a LocalDate (sin la hora)
        LocalDate localDate = createdAt.toLocalDate();

        return localDate;
    }

    private void deleteNullProduct(Products products) {
        if (products.getName() == null || products.getName().trim().isEmpty() || "Nombre desconocido".equals(products.getName())) {
            productsService.deleteProduct(products.getId_product());
        }
    }

    private void deleteNullProducts(){
        List<Products> products = productsService.getAllProducts();
        for (Products product : products) {
            deleteNullProduct(product);
        }
    }
}
