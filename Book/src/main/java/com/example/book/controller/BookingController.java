package com.example.book.controller;

import com.example.book.model.Booking;
import com.example.book.model.Resource;
import com.example.book.model.Student;
import com.example.book.repository.BookingRepository;
import com.example.book.repository.ResourceRepository;
import com.example.book.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Show booking form for a given resource type (e.g., "tutoring", "study", "computer")
    @GetMapping("/new")
    public String showBookingForm(@RequestParam String resourceType, Model model) {
        List<Resource> resources = resourceRepository.findByType(resourceType);
        model.addAttribute("resources", resources);
        model.addAttribute("resourceType", resourceType);
        model.addAttribute("booking", new Booking());
        return "booking-form"; // Thymeleaf template for booking form
    }

    // Process booking form submission
    @PostMapping("/new")
    public String submitBooking(@ModelAttribute Booking booking,
                                @RequestParam String studentEmail,
                                Model model) {
        Student student = studentRepository.findById(studentEmail).orElse(null);
        if (student == null) {
            model.addAttribute("error", "Student not found. Please login again.");
            return "login";
        }

        booking.setStudent(student);
        bookingRepository.save(booking);

        return "redirect:/booking/list?studentEmail=" + studentEmail;
    }

    // List bookings for a student
    @GetMapping("/list")
    public String listBookings(@RequestParam String studentEmail, Model model) {
        Student student = studentRepository.findById(studentEmail).orElse(null);
        if (student == null) {
            return "redirect:/login";
        }
        List<Booking> bookings = bookingRepository.findByStudentEmail(studentEmail);
        model.addAttribute("bookings", bookings);
        model.addAttribute("student", student);
        return "booking-list";  // Thymeleaf template for booking list
    }
}