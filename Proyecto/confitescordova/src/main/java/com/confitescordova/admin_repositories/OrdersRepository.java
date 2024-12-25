package com.confitescordova.admin_repositories;

import com.confitescordova.admin_entities.Customer;
import com.confitescordova.admin_services.CommuneOrderCountDTO;
import com.confitescordova.admin_services.SalesByChannelDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.confitescordova.admin_entities.Orders;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends CrudRepository<Orders, Long>, JpaSpecificationExecutor<Orders> {
    @Query("SELECT new com.confitescordova.admin_services.CommuneOrderCountDTO(o.commune, COUNT(o), SUM(o.total)) " +
            "FROM Orders o " +
            "GROUP BY o.commune " +
            "ORDER BY COUNT(o) DESC " +
            "LIMIT 10")
    List<CommuneOrderCountDTO> countOrdersByCommune();

    @Query("SELECT new com.confitescordova.admin_services.SalesByChannelDTO(o.purchase_source, COUNT(o), SUM(o.total)) " +
            "FROM Orders o " +
            "GROUP BY o.purchase_source")
    List<SalesByChannelDTO> salesByChannel();

    Optional<Orders> findById(Long id);
    //List<Orders> findAllByOrdersByTotalDesc();

    Optional<Orders> findByExternalOrderId(Long externalOrderId);

    @Query("SELECT o.name AS name, o.phone AS phone, SUM(o.total) AS totalSpent " +
            "FROM Orders o " +
            "GROUP BY o.name, o.phone " +
            "ORDER BY SUM(o.total) DESC")
    List<Object[]> findTopCustomers(Pageable pageable);

    @Query("SELECT o FROM Orders o WHERE o.username_creator = :usernameCreator")
    List<Orders> findByUsernameCreator(@Param("usernameCreator") String usernameCreator);
} 