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
        //LocalDate order_date = (LocalDate) orderJson.get("order_date"); order.setOrder_date(order_date); // fecha de orden

        String orderDateString = (String) orderJson.get("order_date");
        LocalDate order_date = LocalDate.parse(orderDateString.split("T")[0]);
        order.setOrder_date(order_date);

        order.setCreation_date(LocalDate.now()); // la fecha de creación sería la actual
        String dispatch = (String) orderJson.get("dispatch"); order.setDispatch(dispatch);
        String address = (String) orderJson.get("address"); order.setAddress(address);

        double subtotal = Double.valueOf(orderJson.get("subtotal").toString()); order.setSubtotal(subtotal); // total de los productos
        double shipping_cost = Double.valueOf(orderJson.get("shipping_cost").toString()); order.setShipping_cost(shipping_cost); // costo de envio

        Double total = subtotal + shipping_cost; order.setTotal(total); // productos + costo de envío

        double initialPayment = Double.valueOf(orderJson.get("initial_payment").toString()); order.setInitialPayment(initialPayment); // Pago inicial
        String status = (String) orderJson.get("status"); order.setStatus(status); // Estado
        String customer_type = (String) orderJson.get("customer_type"); order.setCustomer_type(customer_type); // Tipo de cliente (cliente consumo, cliente negocio)
        String source = (String) orderJson.get("source"); order.setSource(source); // Fuente de la compra (Organico, Facebook Adds)
        Orders new_order = ordersRepository.save(order); // Guardo orden
        // List<Integer[]> ola = (List<Integer[]>) orderJson.get("ola");
        ArrayList<Map<String, Object>> orders_cant = (ArrayList<Map<String, Object>>) orderJson.get("orders"); // obtengo detalle de orden
        for(Map<String, Object> obj : orders_cant) { // por cada par orden [id_producto, cantidad]
            Long id_p = ((Number) obj.get("id_product")).longValue();
            Integer quantity = (Integer) obj.get("quantity");


            if(productsRepository.findById(id_p).isPresent()) { // si el id del producto existe

                Products product = productsRepository.findById(id_p).get();
                Double cost_p = product.getCost(); // este costo es acorde al costo anterior del producto (si cambia no cambia este)

                OrderProduct op = new OrderProduct();
                op.setId_order(new_order.getId_order());
                op.setId_product(id_p);
                op.setQuantity(quantity);
                op.setCost(cost_p * quantity);

                if(obj.get("description") != null){ // si tiene descripción
                    String description = (String) obj.get("description");
                    op.setDescription(description);
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
