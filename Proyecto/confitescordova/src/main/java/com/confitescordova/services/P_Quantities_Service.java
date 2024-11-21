package com.confitescordova.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.confitescordova.entities.Products_Quantity;
import com.confitescordova.repositories.ProductsQuantityRepository;


@Service
public class P_Quantities_Service {

    @Autowired
    ProductsQuantityRepository productsQuantityRepository;

    public List<Products_Quantity> getAllProductsQuantities() {
        return (List<Products_Quantity>) productsQuantityRepository.findAll();
    }

    public Optional<Products_Quantity> getProductQuantityById(Long id) {
        return productsQuantityRepository.findById(id);
    }

    public Products_Quantity saveProductQuantity(Products_Quantity productQuantity) {
        return productsQuantityRepository.save(productQuantity);
    }

    public void deleteProductQuantity(Long id) {
        productsQuantityRepository.deleteById(id);
    }
}