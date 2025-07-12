package com.example.book;

import com.example.book.model.Student;
import com.example.book.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final StudentRepository studentRepository;

    public DataLoader(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) {
        if (studentRepository.count() == 0) {
            studentRepository.save(new Student("test@mail.valenciacollege.edu", "Test", "User", "pass123"));
            studentRepository.save(new Student("student@mail.valenciacollege.edu", "Sample", "Student", "abc123"));
        }
    }
}