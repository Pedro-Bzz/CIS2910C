package com.example.book.controller;

import com.example.book.model.Student;
import com.example.book.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired
    private StudentRepository studentRepository;

    // Show login form
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    // Add this annotation so Spring maps POST /login to this method
    @PostMapping("/login")
    public String processLogin(@RequestParam String email,
                               @RequestParam String password,
                               Model model) {
        Student student = studentRepository.findById(email).orElse(null);

        if (student == null) {
            model.addAttribute("loginError", "Student not found. Please login again.");
            return "login";
        }

        if (!student.getPassword().equals(password)) {
            model.addAttribute("loginError", "Invalid password.");
            return "login";
        }

        // Redirect to dashboard passing email as query param
        return "redirect:/dashboard?email=" + email;
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }
}