package com.confitescordova.admin_services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_repositories.OrdersRepository;
import com.confitescordova.admin_repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_repositories.OrderProductRepository;

@Service
public class OrderProductService {
    @Autowired
    OrderProductRepository orderProductRepository;

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    ProductsRepository productsRepository;

    public List<OrderProduct> getOrderProducts() {
        return (List<OrderProduct>) orderProductRepository.findAll();
    }

    public Optional<OrderProduct> getOrdersProductsById(Long id) {
        return orderProductRepository.findById(id);
    }

    public OrderProduct saveOrdersProducts(OrderProduct orderproduct) {
        return orderProductRepository.save(orderproduct);
    }

    public void deleteOrdersProducts(Long id) {
        orderProductRepository.deleteById(id);
    }

    public Orders special_createOrder(Map<String, Object> orderJson) {
        Orders order = new Orders();
        String name = (String) orderJson.get("name"); order.setName(name);// Nombre del cliente
        String phone = (String) orderJson.get("phone"); order.setPhone(phone);// Telefono
        String region = (String) orderJson.get("region"); order.setRegion(region); // Región
        String commune = (String) orderJson.get("commune"); order.setCommune(commune); // Comuna
        String orderDateString = (String) orderJson.get("order_date");
        LocalDate order_date = LocalDate.parse(orderDateString.split("T")[0]);
        order.setOrder_date(order_date); // Fecha de la orden
        // Tipo de cliente (cliente consumo, cliente negocio)
        String customer_type = (String) orderJson.get("customer_type"); order.setCustomer_type(customer_type);
        // Fuente de la compra (Organico, Facebook Adds)
        String purchase_source = (String) orderJson.get("purchase_source"); order.setPurchase_source(purchase_source);

        // Costo de envio
        double shipping_cost = Double.valueOf(orderJson.get("shipping_cost").toString()); order.setShipping_cost(shipping_cost);
        double subtotal = Double.valueOf(orderJson.get("subtotal").toString()); order.setSubtotal(subtotal); // total de los productos
        Double total = subtotal + shipping_cost; order.setTotal(total); // productos + costo de envío
        // Pago inicial
        double initialPayment = Double.valueOf(orderJson.get("initial_payment").toString()); order.setInitial_payment(initialPayment);
        String status = (String) orderJson.get("status"); order.setStatus(status); // Estado del pedido
        String description = (String) orderJson.get("description"); order.setDescription(description);
        String address = (String) orderJson.get("address"); order.setAddress(address);

        String email = (String) orderJson.get("email"); order.setEmail(email);
        order.setCreation_date(LocalDate.now()); // la fecha de creación sería la actual
        String comment = (String) orderJson.get("comment"); order.setComment(comment);
        Orders new_order = ordersRepository.save(order); // Guardo orden

        ArrayList<Map<String, Object>> orders_cant = (ArrayList<Map<String, Object>>) orderJson.get("orders"); // obtengo detalle de orden
        for(Map<String, Object> obj : orders_cant) { // por cada par orden [id_producto, cantidad]
            Long id_p = ((Number) obj.get("id_product")).longValue();
            Integer quantity = (Integer) obj.get("quantity");


            if(productsRepository.findById(id_p).isPresent()) { // si el id del producto existe
                Products product = productsRepository.findById(id_p).get();
                Double cost_p = product.getCost(); // este costo es acorde al costo anterior del producto (si cambia no cambia este)

                OrderProduct op = new OrderProduct();
                op.setId_order(new_order.getId());
                op.setId_product(id_p);
                op.setQuantity(quantity);
                op.setCost(cost_p * quantity);

                if(obj.get("product_specification") != null){ // si tiene descripción
                    String product_specification = (String) obj.get("product_specification");
                    op.setDescription(product_specification);
                }

                orderProductRepository.save(op); // guardo combinación
            }
        }
        return new_order;
    }


    // Para obtener las ordenes mas costosas
    public List<OrderProduct> getOrderProductsOrderedByCost() {
        return orderProductRepository.findAllByOrderByCostDesc();
    }

    // Para obtener los productos mas vendidos
    public List<ProductSalesDTO> getProductSales() {
        return orderProductRepository.findProductSales();
    }
}
