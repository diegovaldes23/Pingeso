package com.confitescordova.entities;

import java.util.List;
import java.util.Map;

public class Store {
    private Long id;
    private List<String> name;
    private List<String> description;
    private String type;
    private String email;
    private String logo;
    private String contact_email; // Correo de contacto de la tienda
    private String facebook; // URL de Facebook de la tienda
    private String twitter; // URL de Twitter de la tienda
    private String google_plus; // URL de Google+ de la tienda
    private String instagram; // URL de Instagram de la tienda
    private String pinterest; // URL de Pinterest de la tienda
    private String blog; // URL del blog de la tienda
    private String address; // Dirección de la tienda
    private String phone; // Teléfono de la tienda
    private String whatsapp_phone_number; // Número de WhatsApp de contacto de la tienda
    private String business_id; // Identificador del negocio (CPF, CNPJ, DNI, CUIL o CUIT según el país)
    private String business_name; // Nombre de la empresa propietaria de la tienda
    private String business_address; // Dirección de la empresa propietaria
    private String customer_accounts; // "optional" si el cliente puede pagar como invitado; "mandatory" si no
    private String plan_name; // Nombre del plan de Tiendanube/Nuvemshop de la tienda
    private String country; // País de la tienda en formato ISO 3166-1
    private List<Map<String, Object>> languages; // Idiomas disponibles con moneda y estado (activo o no)
    private List<String> domains; // Lista de dominios de la tienda
    private String original_domain; // Dominio original de Tiendanube o Nuvemshop
    private String current_theme; // Tema actual de la tienda
    private String main_language; // Idioma principal de la tienda
    private String main_currency; // Moneda principal de la tienda en formato ISO 4217
    private String admin_language; // Idioma de administración de la tienda
    private Boolean has_multicd; // Indica si la tienda tiene la función Multi CD habilitada
    private List<String> features; // Lista de características de API habilitadas en la tienda
    private String created_at; // Fecha de creación de la tienda en formato ISO 8601
}
