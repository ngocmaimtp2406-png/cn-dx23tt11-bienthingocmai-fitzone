package com.fitzone.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RegistrationController {

    private final EmailService emailService;

    public RegistrationController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegistrationRequest request) {

        System.out.println("===== THÔNG TIN ĐĂNG KÝ =====");
        System.out.println("Họ tên: " + request.getFullname());
        System.out.println("Số điện thoại: " + request.getPhone());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Khóa học: " + request.getCourse());
        System.out.println("Cấp độ: " + request.getLevel());
        System.out.println("=============================");

        // Gửi thông tin đăng ký về Gmail quản lý
        emailService.sendRegistrationEmail(
                request.getFullname(),
                request.getPhone(),
                request.getEmail(),
                request.getCourse(),
                request.getLevel()
        );

        return "Đăng ký thành công!";
    }
}


class RegistrationRequest {

    private String fullname;
    private String phone;
    private String email;
    private String course;
    private String level;

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}