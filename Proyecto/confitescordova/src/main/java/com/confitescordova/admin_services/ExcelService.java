package com.confitescordova.admin_services;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.read.listener.ReadListener;
import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    @Autowired
    private OrdersRepository ordersRepository;

    public void saveOrdersFromExcel(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            EasyExcel.read(is, Orders.class, new OrdersReadListener(ordersRepository)).sheet().doRead();
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar el archivo Excel: " + e.getMessage());
        }
    }

    private static class OrdersReadListener implements ReadListener<Orders> {
        private final OrdersRepository ordersRepository;
        private final List<Orders> ordersList = new ArrayList<>();

        public OrdersReadListener(OrdersRepository ordersRepository) {
            this.ordersRepository = ordersRepository;
        }

        @Override
        public void invoke(Orders order, AnalysisContext context) {
            ordersList.add(order);
        }

        @Override
        public void doAfterAllAnalysed(AnalysisContext context) {
            ordersRepository.saveAll(ordersList);
        }
    }
}
