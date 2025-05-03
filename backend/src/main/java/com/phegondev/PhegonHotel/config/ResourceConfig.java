package com.phegondev.PhegonHotel.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(ResourceConfig.class);

    @Value("${file.upload.dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // สร้างโฟลเดอร์ถ้ายังไม่มี
        createUploadDirectoryIfNeeded();
        
        Path uploadPath = Paths.get(uploadDir);
        String uploadAbsolutePath = uploadPath.toFile().getAbsolutePath();
        
        logger.info("Configuring static resource handling for images");
        logger.info("Image directory path: {}", uploadAbsolutePath);
        
        // กำหนด URL pattern และตำแหน่งไฟล์
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + uploadAbsolutePath + File.separator)
                .setCachePeriod(0);
        
        logger.info("Resource handler configured: URL pattern=/images/**, Location=file:{}", uploadAbsolutePath);
    }
    
    private void createUploadDirectoryIfNeeded() {
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            logger.info("Creating image upload directory: {}", directory.getAbsolutePath());
            boolean created = directory.mkdirs();
            if (created) {
                logger.info("Directory created successfully");
            } else {
                logger.warn("Failed to create directory. Make sure the application has write permissions.");
            }
        }
    }
} 