package com.confitescordova.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.confitescordova.entities.Products_Quantity;

public interface ProductsQuantityRepository extends CrudRepository<Products_Quantity, Long> {

}