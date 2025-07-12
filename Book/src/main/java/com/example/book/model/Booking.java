package com.example.book.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relationship to student (many bookings per student)
    @ManyToOne
    @JoinColumn(name = "student_email", nullable = false)
    private Student student;

    // Relationship to resource (many bookings per resource)
    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Booking() {}

    public Booking(Student student, Resource resource, LocalDateTime startTime, LocalDateTime endTime) {
        this.student = student;
        this.resource = resource;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    // no setter for id (auto-generated)

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}