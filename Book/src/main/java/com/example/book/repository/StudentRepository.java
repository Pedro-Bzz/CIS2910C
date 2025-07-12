package com.example.book.repository;

import com.example.book.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
    // String because Student's ID is email (String)
}