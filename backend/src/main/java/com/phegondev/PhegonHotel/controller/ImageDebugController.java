package com.phegondev.PhegonHotel.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Controller to debug image access issues
 */
@RestController
@RequestMapping("/debug")
public class ImageDebugController {
    private static final Logger logger = LoggerFactory.getLogger(ImageDebugController.class);
    
    @Value("${file.upload.dir}")
    private String uploadDir;
    
    @GetMapping("/image-info/{filename}")
    public ResponseEntity<String> getImageInfo(@PathVariable String filename) {
        Path imagePath = Paths.get(uploadDir).resolve(filename);
        File imageFile = imagePath.toFile();
        
        StringBuilder info = new StringBuilder();
        info.append("Image path: ").append(imagePath.toString()).append("\n");
        info.append("File exists: ").append(imageFile.exists()).append("\n");
        
        if (imageFile.exists()) {
            info.append("File size: ").append(imageFile.length()).append(" bytes\n");
            info.append("Can read: ").append(imageFile.canRead()).append("\n");
            try {
                String contentType = Files.probeContentType(imagePath);
                info.append("Content type: ").append(contentType).append("\n");
            } catch (IOException e) {
                info.append("Error determining content type: ").append(e.getMessage()).append("\n");
            }
        }
        
        // List all files in the directory
        info.append("\nAll files in directory:\n");
        File dir = new File(uploadDir);
        if (dir.exists() && dir.isDirectory()) {
            for (File file : dir.listFiles()) {
                info.append(" - ").append(file.getName())
                    .append(" (").append(file.length()).append(" bytes)\n");
            }
        } else {
            info.append("Directory does not exist or is not a directory\n");
        }
        
        return ResponseEntity.ok(info.toString());
    }
    
    @GetMapping("/direct-image/{filename}")
    public ResponseEntity<Resource> getImageDirect(@PathVariable String filename) {
        Path imagePath = Paths.get(uploadDir).resolve(filename);
        File imageFile = imagePath.toFile();
        
        logger.info("Attempting to serve image from: {}", imagePath.toString());
        
        if (!imageFile.exists()) {
            logger.error("Image file does not exist: {}", imagePath.toString());
            return ResponseEntity.notFound().build();
        }
        
        if (!imageFile.canRead()) {
            logger.error("Cannot read image file: {}", imagePath.toString());
            return ResponseEntity.status(403).build();
        }
        
        Resource resource = new FileSystemResource(imageFile);
        String contentType;
        try {
            contentType = Files.probeContentType(imagePath);
        } catch (IOException e) {
            contentType = "application/octet-stream";
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
} 