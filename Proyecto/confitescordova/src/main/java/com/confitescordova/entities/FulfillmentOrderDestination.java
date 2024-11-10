package com.confitescordova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FulfillmentOrderDestination {
    private String zipcode; // Código postal
    private String street; // Calle
    private String number; // Número de la calle
    private String floor; // Piso
    private String locality; // Localidad
    private String city; // Ciudad
    private String reference; // Referencia
    private String between_streets; // Entre calles
    private Province province; // Provincia
    private Region region; // Región
    private Country country; // País
}
