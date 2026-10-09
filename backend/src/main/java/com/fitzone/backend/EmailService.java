package com.fitzone.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final HttpClient httpClient =
            HttpClient.newHttpClient();

    public void sendRegistrationEmail(
            String fullname,
            String phone,
            String email,
            String course,
            String level) {

        try {

            // API Key lấy từ Render Environment Variable
            String apiKey = System.getenv("RESEND_API_KEY");

            if (apiKey == null || apiKey.isBlank()) {
                throw new RuntimeException(
                        "Chưa cấu hình RESEND_API_KEY trên Render."
                );
            }

            // Nội dung email
            String emailContent =
                    "THÔNG TIN ĐĂNG KÝ FITZONE\n\n" +
                    "Họ tên: " + fullname + "\n" +
                    "Số điện thoại: " + phone + "\n" +
                    "Email: " + email + "\n" +
                    "Khóa học: " + course + "\n" +
                    "Cấp độ: " + level + "\n\n" +
                    "Vui lòng liên hệ học viên để xác nhận đăng ký.";

            // Tạo nội dung gửi Resend
            Map<String, Object> emailData =
                    new HashMap<>();

            emailData.put(
                    "from",
                    "FITZONE <onboarding@resend.dev>"
            );

            emailData.put(
                    "to",
                    List.of("ngocmaimtp2406@gmail.com")
            );

            emailData.put(
                    "subject",
                    "FITZONE - Có đăng ký khóa học mới"
            );

            emailData.put(
                    "text",
                    emailContent
            );

            // Chuyển thành JSON
            String json =
                    objectMapper.writeValueAsString(emailData);

            // Gửi request đến Resend
            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(
                                    URI.create(
                                            "https://api.resend.com/emails"
                                    )
                            )
                            .header(
                                    "Authorization",
                                    "Bearer " + apiKey
                            )
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofString(json)
                            )
                            .build();

            // Gửi
            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            // Kiểm tra kết quả
            if (response.statusCode() < 200 ||
                    response.statusCode() >= 300) {

                System.out.println(
                        "Resend trả về lỗi: "
                                + response.statusCode()
                );

                System.out.println(
                        "Chi tiết: "
                                + response.body()
                );

                throw new RuntimeException(
                        "Không thể gửi email qua Resend."
                );
            }

            System.out.println(
                    "===== GỬI EMAIL THÀNH CÔNG ====="
            );

            System.out.println(
                    "Resend response: "
                            + response.body()
            );

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Không thể gửi email đăng ký FITZONE.",
                    e
            );
        }
    }
}