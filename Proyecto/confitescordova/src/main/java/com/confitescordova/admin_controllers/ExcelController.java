package com.confitescordova.admin_controllers;

import com.confitescordova.admin_services.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/excel")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (!file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            return ResponseEntity.badRequest().body("Por favor, sube un archivo Excel válido (.xlsx)");
        }

        excelService.saveOrdersFromExcel(file);
        return ResponseEntity.ok("Datos cargados correctamente a la base de datos");
    }
}