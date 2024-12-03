package com.confitescordova.controllers;

import com.confitescordova.services.OrderSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webhook/tiendanube")
public class TiendanubeWebhookController {
    @Autowired
    private OrderSyncService orderSyncService;

}
