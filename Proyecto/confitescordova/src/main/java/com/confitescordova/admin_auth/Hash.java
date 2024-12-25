package com.confitescordova.admin_auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Hash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode("hola");
        System.out.println("Hash generado: " + hash);
    }
}
