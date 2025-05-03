package com.phegondev.PhegonHotel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // อนุญาตให้ frontend ที่รันบน localhost ทุกพอร์ตเข้าถึงได้
        config.addAllowedOrigin("http://localhost:7070");
        config.addAllowedOrigin("http://localhost:3000");
        
        // อนุญาตให้ใช้ header ต่างๆ
        config.addAllowedHeader("*");
        
        // อนุญาต HTTP methods
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        
        // อนุญาตให้ส่ง credentials (cookies, auth headers)
        config.setAllowCredentials(true);
        
        // กำหนดให้การตั้งค่านี้ใช้กับทุก path
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
} 