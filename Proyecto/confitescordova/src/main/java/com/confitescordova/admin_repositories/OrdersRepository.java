package com.confitescordova.admin_repositories;

import com.confitescordova.admin_services.CommuneOrderCountDTO;
import com.confitescordova.admin_services.SalesByChannelDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.confitescordova.admin_entities.Orders;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends CrudRepository<Orders, Long>{
    @Query("SELECT new com.confitescordova.admin_services.CommuneOrderCountDTO(o.commune, COUNT(o), SUM(o.total)) " +
            "FROM Orders o " +
            "GROUP BY o.commune")
    List<CommuneOrderCountDTO> countOrdersByCommune();

    @Query("SELECT new com.confitescordova.admin_services.SalesByChannelDTO(o.purchase_source, COUNT(o), SUM(o.total)) " +
            "FROM Orders o " +
            "GROUP BY o.purchase_source")
    List<SalesByChannelDTO> salesByChannel();

    Optional<Orders> findById(Long id);
    //List<Orders> findAllByOrdersByTotalDesc();
} 