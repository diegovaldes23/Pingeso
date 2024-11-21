package com.confitescordova.entities;

import lombok.Data;

@Data
public class Address {
    private String zipcode; // Código postal
    private String street; // Calle de la dirección
    private String number; // Número de la dirección
    private String floor; // Piso o complemento (para Brasil)
    private String locality; // Localidad o vecindario (para Brasil)
    private String city; // Nombre de la ciudad
    private String reference; // Referencia de la dirección
    private String between_streets; // Entre calles de referencia
    private Province province; // Provincia de la dirección
    private Region region; // Región de la dirección
    private Country country; // País de la dirección
    private String verified_at; // Fecha de verificación en formato ISO 8601
}

