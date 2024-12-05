package com.confitescordova.admin_repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.confitescordova.admin_entities.Products;

import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long>{
    Optional<Products> findByName(String name);
}
