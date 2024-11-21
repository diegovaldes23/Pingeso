package com.confitescordova.entities;



import jakarta.persistence.Entity;
import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;




@Entity
@Data
public class ClienteAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String telefono;
    private String correo;
    private Long idComuna;
    private Long idRegion;
}
