package com.phegondev.PhegonHotel.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

// คลาสที่ใช้เก็บข้อมูลห้องพักในโรงแรม
@Data
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // รหัสห้องพัก

    private String roomType; // ประเภทห้องพัก
    private BigDecimal roomPrice; // ราคาห้องพัก
    private String roomPhotoUrl; // URL รูปภาพห้องพัก
    private String roomDescription; // รายละเอียดห้องพัก

    // ความสัมพันธ์แบบ One-to-Many กับตาราง Booking
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", roomPrice=" + roomPrice +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", roomDescription='" + roomDescription + '\'' +
                '}';
    }
}
