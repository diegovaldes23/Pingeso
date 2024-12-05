package com.confitescordova.admin_services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.confitescordova.admin_entities.Products;
import com.confitescordova.admin_repositories.ProductsRepository;

@Service
public class ProductsService {
    @Autowired
    ProductsRepository productsRepository;

    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    public Optional<Products> getProductById(Long id) {
        return productsRepository.findById(id);
    }

    public Products saveProduct(Products order) {
        if (order.getDescription() != null && order.getDescription().length() > 255) {
            order.setDescription(order.getDescription().substring(0, 255));  // Recorta a 255 caracteres
        }
        return productsRepository.save(order);
    }

    public void deleteProduct(Long id) {
        productsRepository.deleteById(id);
    }

    public Optional<Products> getProductByName(String name) {
        return productsRepository.findByName(name);
    }



}
