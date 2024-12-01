package com.confitescordova.admin_repositories;

import com.confitescordova.admin_services.ProductSalesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.confitescordova.admin_entities.OrderProduct;

import java.util.List;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {

    List<OrderProduct> findAllByOrderByCostDesc();

    @Query("SELECT new com.confitescordova.admin_services.ProductSalesDTO(op.id_product, SUM(op.quantity), SUM(op.cost), p.name) " +
            "FROM OrderProduct op JOIN Products p ON op.id_product = p.id_product " +
            "GROUP BY op.id_product, p.name")
    List<ProductSalesDTO> findProductSales();
}