package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Order {
    private long id; // id del pedido
    private String token; // ubicación del pedido
    private String store_id; // id tienda del pedido
    private String contact_email; // correo comprador
    private String contact_phone; // telefono comprador
    private String contact_identification; // id del comprador (CPF/CNPJ/DNI/CUIT)
    private Integer number; // Número único que identifica un pedido que utilizan el dueño de la tienda y los clientes
    private String completed_at; // información sobre la fecha en la que se creó el pedido
    private List<String> attributes; // lista con los atributos personalizados para este pedido
    private Customer customer; // Cliente que compró este pedido
    private List<Product> products; // Listado de productos adquiridos por el customer
    private String note; // Nota del cliente sobre el pedido
    private String owner_note; // Nota del propietario de la tienda sobre el pedido
    private List<Coupon> coupon; // Lista de cupones aplicados al pedido
    private Double discount; // Valor total del descuento aplicado al precio del pedido
    private Double subtotal; // Precio del pedido antes del envío
    private Double total; // Precio total del pedido incluyendo envío y descuentos
    private Double total_usd; // Precio total del pedido en dólares estadounidenses
    private String currency; // Moneda del gasto total 
    private String language; // Idioma del pedido utilizado por el cliente durante el proceso de pago
    private Long gateway; // ID del proveedor de pagos que procesó la transacción de pago del pedido.
    private String gateway_id; // [Solo lectura] ID de transacción externa utilizada por el proveedor de pagos.
    private String gateway_name; // [Solo lectura] Nombre del proveedor de pago del pedido.
    private String shipping; // El método de envío utilizado
    private String shipping_pickup_type; // "enviar" si el pedido se va a enviar; "recoger" si se va a recoger en una sucursal de la tienda
    private String shipping_store_branch_name; // Si se va a recoger el pedido, muestra el nombre de la sucursal de la tienda.
    private String gateway_link; //	URL de la página de detalles de la transacción (nulo para método de pago personalizado)
    private String shipping_carrier_name; // El nombre del transportista. Si el método de envío es personalizado, entonces es nulo.
    private String shipping_address;
    private String shipping_tracking_number;
    private Integer shipping_min_days;
    private Integer shipping_max_days;
    private Double shipping_cost_owner;
    private Double shipping_cost_customer;
    private String shipping_option;
    private String shipping_option_code;
    private String shipping_option_reference;
    private String shipping_pickup_details;
    private String shipping_tracking_url;
    private String billing_name;
    private String billing_phone;
    private String billing_address;
    private String billing_number;
    private String billing_floor;
    private String billing_locality;
    private String billing_zipcode;
    private String billing_city;
    private String billing_province;
    private String billing_country;
    private String billing_customer_type;
    private String billing_business_name;
    private String billing_fiscal_regime;
    private String billing_invoice_use;
    private String billing_trade_name;
    private String billing_state_registration;
    private String billing_document_type;
    private String shipping_suboption;
    private Map<String, Object> extra;
    private String storefront;
    private Double weight;
    private String cancelled_at;
    private String closed_at;
    private String read_at;
    private String status;
    private String payment_status;
    private String shipping_status;
    private String next_action;
    private Map<String, Object> payment_details;
    private String shipped_at;
    private String paid_at;
    private String cancel_reason;
    private String created_at;
    private String updated_at;
    private String landing_url;
    private Map<String, Object> client_details;
    private String app_id;

    

}
