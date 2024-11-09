package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Order {
    private long id;
    private String token;
    private String store_id;
    private String contact_email;
    private String contact_phone;
    private String contact_identification;
    private Integer number;
    private String completed_at;
    private List<String> attributes;
    private Customer customer;
    private List<Product> products;
    private String note;
    private String owner_note;
    private List<Coupon> coupon;
    private Double discount;
    private Double subtotal;
    private Double total;
    private Double total_usd;
    private String currency;
    private String language;
    private Long gateway;
    private String gateway_id;
    private String gateway_name;
    private String shipping;
    private String shipping_pickup_type;
    private String shipping_store_branch_name;
    private String gateway_link;
    private String shipping_carrier_name;
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
