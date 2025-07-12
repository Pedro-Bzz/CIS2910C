package com.example.book.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g., "Tutor John", "Lab A", "Study Room 101"
    private String type;        // e.g., "Tutoring", "Computer Lab", "Study Room"

    public Resource() {}

    public Resource(String name, String type) {
        this.name = name;
        this.type = type;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    // no setter for id because it's generated

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}