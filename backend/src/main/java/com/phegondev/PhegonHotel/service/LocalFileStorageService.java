package com.phegondev.PhegonHotel.service;

import com.phegondev.PhegonHotel.exception.OurException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalFileStorageService {
    private static final Logger logger = LoggerFactory.getLogger(LocalFileStorageService.class);

    @Value("${file.upload.dir}")
    private String uploadDir;

    public String saveImageToLocal(MultipartFile photo) {
        try {
            if (photo == null || photo.isEmpty()) {
                logger.error("Failed to save image: File is empty or null");
                throw new OurException("Cannot save empty file");
            }

            // Create directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                logger.info("Creating directory: {}", directory.getAbsolutePath());
                boolean created = directory.mkdirs();
                if (!created) {
                    logger.error("Failed to create directory: {}", directory.getAbsolutePath());
                    throw new OurException("Failed to create directory for storing images");
                }
            }
            
            logger.debug("Directory exists and is writable: {}", directory.canWrite());
            logger.debug("Directory absolute path: {}", directory.getAbsolutePath());

            // Generate unique filename to avoid overwriting
            String originalFileName = photo.getOriginalFilename();
            if (originalFileName == null) {
                originalFileName = "unknown.jpg";
            }
            
            String fileExtension = originalFileName.contains(".") ? 
                originalFileName.substring(originalFileName.lastIndexOf(".")) : ".jpg";
            String newFileName = UUID.randomUUID() + fileExtension;
            
            // Save file
            Path targetLocation = Paths.get(uploadDir).resolve(newFileName);
            logger.info("Saving file to: {}", targetLocation);
            logger.info("Target file path exists: {}", Files.exists(targetLocation.getParent()));
            
            Files.copy(photo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            // Return the URL where the image can be accessed
            String imageUrl = "/images/" + newFileName;
            logger.info("File saved successfully. Image URL: {}", imageUrl);
            
            // Verify file was actually created
            File savedFile = targetLocation.toFile();
            logger.info("File exists after save: {}, Size: {}", savedFile.exists(), savedFile.length());
            
            return imageUrl;
            
        } catch (IOException e) {
            logger.error("Failed to save image: {}", e.getMessage(), e);
            throw new OurException("Unable to save image locally: " + e.getMessage());
        }
    }
    
    public boolean deleteImage(String imageUrl) {
        try {
            if (imageUrl == null || imageUrl.isEmpty()) {
                return false;
            }
            
            // Extract file name from image URL
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            
            // Delete file if it exists
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                logger.info("Deleted image file: {}", filePath);
                return true;
            }
            return false;
        } catch (IOException e) {
            logger.error("Failed to delete image: {}", e.getMessage(), e);
            return false;
        }
    }
} 