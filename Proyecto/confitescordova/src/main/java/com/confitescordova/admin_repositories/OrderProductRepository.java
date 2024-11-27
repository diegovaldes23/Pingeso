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

    @Query("SELECT new com.confitescordova.admin_services.ProductSalesDTO(op.id_product, SUM(op.quantity)) " +
            "FROM OrderProduct op GROUP BY op.id_product")
    List<ProductSalesDTO> findProductSales();
}