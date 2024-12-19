package com.confitescordova.admin_services;

import com.confitescordova.admin_entities.Orders;
import com.confitescordova.admin_repositories.OrdersRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    @Autowired
    private OrdersRepository ordersRepository;

    public void saveOrdersFromExcel(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(is);
            Sheet sheet = workbook.getSheetAt(0); // Suponemos que los datos están en la primera hoja

            List<Orders> ordersList = new ArrayList<>();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            for (Row row : sheet) {
                if (row.getRowNum() == 0) { // Ignorar encabezados
                    continue;
                }

                Orders order = new Orders();
                order.setName(row.getCell(0).getStringCellValue());
                order.setPhone(row.getCell(1).getStringCellValue());
                order.setRegion(row.getCell(2).getStringCellValue());
                order.setCommune(row.getCell(3).getStringCellValue());
                order.setOrder_date(LocalDate.parse(row.getCell(4).getStringCellValue(), dateFormatter));
                order.setCustomer_type(row.getCell(5).getStringCellValue());
                order.setPurchase_source(row.getCell(6).getStringCellValue());
                order.setShipping_cost(row.getCell(7).getNumericCellValue());
                order.setSubtotal(row.getCell(8).getNumericCellValue());
                order.setTotal(row.getCell(9).getNumericCellValue());
                order.setInitial_payment(row.getCell(10).getNumericCellValue());
                order.setStatus(row.getCell(11).getStringCellValue());
                order.setDelivery_date(LocalDate.parse(row.getCell(12).getStringCellValue(), dateFormatter));
                order.setDescription(row.getCell(13).getStringCellValue());
                order.setAddress(row.getCell(14).getStringCellValue());
                order.setEmail(row.getCell(15).getStringCellValue());
                order.setCreation_date(LocalDate.parse(row.getCell(16).getStringCellValue(), dateFormatter));
                order.setExternalOrderId((long) row.getCell(17).getNumericCellValue());

                ordersList.add(order);
            }

            ordersRepository.saveAll(ordersList);
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar el archivo Excel: " + e.getMessage());
        }
    }
}