package com.phegondev.PhegonHotel.service;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * This class is no longer used. Replaced by LocalFileStorageService.
 * Kept as a placeholder for backward compatibility.
 */
@Service
public class AwsS3Service {

    public String saveImageToS3(MultipartFile photo) {
        // No-op implementation
        return null;
    }
}

















