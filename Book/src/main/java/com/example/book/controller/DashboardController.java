package com.example.book.controller;

import com.example.book.model.Student;
import com.example.book.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class DashboardController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/dashboard")
    public String showDashboard(@RequestParam(required = false) String email, Model model) {
        if (email == null || email.isEmpty()) {
            return "redirect:/login";
        }
        Student student = studentRepository.findById(email).orElse(null);
        if (student == null) {
            return "redirect:/login";
        }
        model.addAttribute("student", student);
        return "dashboard";
    }
}