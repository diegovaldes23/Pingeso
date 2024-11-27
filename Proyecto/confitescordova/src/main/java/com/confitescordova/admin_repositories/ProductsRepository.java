package com.confitescordova.admin_repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.confitescordova.admin_entities.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long>{
}
