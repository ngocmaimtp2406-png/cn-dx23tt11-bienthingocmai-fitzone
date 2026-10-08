package com.fitzone.backend;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationEmail(
            String fullname,
            String phone,
            String email,
            String course,
            String level) {

        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom("ngocmaimtp2406@gmail.com");
            helper.setTo("ngocmaimtp2406@gmail.com");

            helper.setSubject(
                    "FITZONE - Có đăng ký khóa học mới"
            );

            helper.setText(
                    "THÔNG TIN ĐĂNG KÝ FITZONE\n\n" +
                    "Họ tên: " + fullname + "\n" +
                    "Số điện thoại: " + phone + "\n" +
                    "Email: " + email + "\n" +
                    "Khóa học: " + course + "\n" +
                    "Cấp độ: " + level + "\n\n" +
                    "Vui lòng liên hệ học viên để xác nhận đăng ký."
            );

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(
                    "Không thể tạo email đăng ký FITZONE", e
            );
        }
    }
}