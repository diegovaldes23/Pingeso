package com.confitescordova.admin_controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.confitescordova.admin_entities.*;
import com.confitescordova.admin_services.CommuneOrderCountDTO;
import com.confitescordova.admin_services.SalesByChannelDTO;
import com.confitescordova.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.confitescordova.admin_services.OrdersService;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin/orders")
public class OrdersController {
    @Autowired
    OrdersService orderService;


    @GetMapping()
    public List<Orders> getAllProductsQuantities() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getProductQuantityById(@PathVariable Long id) {
        Optional<Orders> productQuantity = orderService.getOrderById(id);
        return productQuantity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/salesByCommune")
    public List<CommuneOrderCountDTO> salesByCommune(){
        return orderService.salesByCommune();
    }

    @GetMapping("/salesByChannel")
    public List<SalesByChannelDTO> salesByChannel(){
        return orderService.salesByChannel();
    }



    /*
    @PostMapping("/post")
    public ResponseEntity<OrderProduct> create2(@RequestBody Map<String, Object> order) {

    }

     */

    /*
    @PostMapping
    public ResponseEntity<Orders> createOrder(@RequestBody OrderRequest orderRequest) {
        Orders order = new Orders();
        // Mapear los datos del request a la entidad Orders
        order.setName(orderRequest.getName());
        order.setPhone(orderRequest.getPhone());
        order.setOrder_date(orderRequest.getOrder_date());
        order.setCreation_date(orderRequest.getCreation_date());
        order.setDispatch(orderRequest.getDispatch());
        order.setAddress(orderRequest.getAddress());
        order.setTotal(orderRequest.getTotal());
        order.setSubtotal(orderRequest.getSubtotal());
        order.setShipping_cost(orderRequest.getShipping_cost());
        order.setInitialPayment(orderRequest.getInitialPayment());
        order.setStatus(orderRequest.getStatus());
        order.setCustomer_type(orderRequest.getCustomer_type());
        order.setSource(orderRequest.getSource());

        // Mapear los productos
        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProductRequest op : orderRequest.getOrders()) {
            OrderProduct orderProduct = new OrderProduct();
            Products product = new Products();
            product.setId_product(op.getId_product()); // Solo necesitas el ID
            orderProduct.setProduct(product);
            orderProduct.setCant(op.getCant());
            orderProducts.add(orderProduct);
        }

        Orders savedOrder = orderService.createOrder(order, orderProducts);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

     */

    /*
    @PostMapping
    public OrderAdm createProductQuantity(@RequestBody OrderAdm orderAdm) {
        // Asociar los productos con la orden
        if (orderAdm.getProducts() != null) {
            for (OrderProduct product : orderAdm.getProducts()) {
                product.setOrder(orderAdm);
            }
        }
        return order_Service.saveOrder(orderAdm);
    }*/


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductQuantity(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/store")
    public ResponseEntity<String> handleStoreEvent(@RequestBody String payload) {
        // Aquí procesas el payload de Tiendanube para los eventos de la tienda
        System.out.println("Evento recibido en store: " + payload);
        return ResponseEntity.ok("Evento procesado");
    }

    @PostMapping("/customers")
    public ResponseEntity<String> handleCustomerEvent(@RequestBody String payload) {
        // Aquí procesas el payload de Tiendanube para los eventos de los clientes
        System.out.println("Evento recibido en customers: " + payload);
        return ResponseEntity.ok("Evento procesado");
    }

    @PostMapping("/customers/data-request")
    public ResponseEntity<String> handleCustomerDataRequest(@RequestBody String payload) {
        // Aquí procesas el payload de Tiendanube para las solicitudes de datos del cliente
        System.out.println("Solicitud de datos del cliente: " + payload);
        // Devuelves los datos del cliente según lo solicitado
        return ResponseEntity.ok("Datos del cliente enviados");
    }

    @PutMapping("/delivery-date")
    public ResponseEntity<Orders> changeDeliveryDate(@RequestBody OrdersRequest order) {

        Long orderId = order.getId_order();
        String delivery_date = order.getDelivery_date();
        Orders newOrder = orderService.changeDeliveryDate(orderId, delivery_date);

        return ResponseEntity.ok(newOrder);
    }

    @PutMapping("/status")
    public ResponseEntity<Orders> changeStatus(@RequestBody OrderStatus order) {
        Long orderId = order.getId_order();
        String status = order.getStatus();

        Orders updatedOrder = orderService.changeStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/top-customers")
    public ResponseEntity<List<Map<String, Object>>> getTopTenCustomers(){
        List<Map<String, Object>> topCustomers = orderService.getTopTenCustomers();
        return ResponseEntity.ok(topCustomers);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long orderId, @RequestBody Orders order) {
        Orders updatedOrder = orderService.updateOrder(order);
        System.out.println("Pasó la prueba de fuego");
        return ResponseEntity.ok(updatedOrder);

    }
}
