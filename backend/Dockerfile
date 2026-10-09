# ================================
# FITZONE BACKEND - SPRING BOOT
# ================================

# Giai đoạn build
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy toàn bộ Backend
COPY . .

# Xử lý xuống dòng Windows và cấp quyền chạy Maven Wrapper
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Build Spring Boot
RUN ./mvnw clean package -DskipTests


# ================================
# Giai đoạn chạy
# ================================

FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy file JAR đã build
COPY --from=build /app/target/*.jar app.jar

# Chạy Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]