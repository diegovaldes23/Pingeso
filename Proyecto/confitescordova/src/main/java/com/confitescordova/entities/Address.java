package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Address {
    private String address;
    private String zipcode; // Código postal
    private String street; // Calle de la dirección
    private String number; // Número de la dirección
    private String floor; // Piso o complemento (para Brasil)
    private String locality; // Localidad o vecindario (para Brasil)
    private String city; // Nombre de la ciudad
    private String reference; // Referencia de la dirección
    private String between_streets; // Entre calles de referencia
    private String province; // Provincia de la dirección
    private String region; // Región de la dirección
    private String country; // País de la dirección
    private String verified_at; // Fecha de verificación en formato ISO 8601
}

