package com.confitescordova.admin_repositories;

import com.confitescordova.admin_entities.OrderProduct;
import com.confitescordova.admin_services.CityOrderCountDTO;
import com.confitescordova.admin_services.SalesByChannelDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.confitescordova.admin_entities.Orders;

import java.util.List;

public interface OrdersRepository extends CrudRepository<Orders, Long>{
    @Query("SELECT new com.confitescordova.admin_services.CityOrderCountDTO(o.city, COUNT(o), SUM(o.total)) " +
            "FROM Orders o " +
            "GROUP BY o.city")
    List<CityOrderCountDTO> countOrdersByCity();

    @Query("SELECT new com.confitescordova.admin_services.SalesByChannelDTO(o.source, COUNT(o), SUM(o.total)) " +
            "FROM Orders o " +
            "GROUP BY o.source")
    List<SalesByChannelDTO> salesByChannel();

    //List<Orders> findAllByOrdersByTotalDesc();
} 