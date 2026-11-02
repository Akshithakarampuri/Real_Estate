# EstateAI — Backend (Phase 1: Authentication & Core Architecture)

Production-ready backend service for **EstateAI**, built with **Spring Boot 3.3.4**, **Java 17**, **Spring Data MongoDB**, and **Spring Security 6 with JWT**.

---

## 🚀 Features

- **JWT Authentication**: Stateless authentication using HMAC-SHA256 (`jjwt 0.12.6`).
- **Role-Based Access Control (RBAC)**: Support for `BUYER`, `SELLER`, `AGENT`, and `ADMIN`.
- **Public Registration Protection**: Direct registration as `ADMIN` via the public API is forbidden (returns HTTP 400 Bad Request).
- **Secure Password Hashing**: Passwords hashed using BCrypt before storing.
- **MongoDB Persistence**: Stored under the `users` collection with unique index on `email`.
- **Auditing**: Automatic capture of `createdAt` and `updatedAt` timestamps using Spring Data Mongo auditing.
- **Global Exception Handling**: Uniform error responses with standard error envelope and validation failure maps.
- **CORS Configured**: Pre-configured for Vite/React frontend at `http://localhost:5173`.

---

## 🛠 Tech Stack

- **Java**: 17 LTS
- **Framework**: Spring Boot 3.3.4
- **Security**: Spring Security 6 + JJWT 0.12.6 + BCrypt
- **Database**: MongoDB (Local or Atlas)
- **Validation**: Jakarta Bean Validation (`@Valid`, `@Email`, `@NotBlank`, etc.)
- **Build Tool**: Apache Maven 3.9+
- **Boilerplate Reduction**: Project Lombok

---

## 📁 Project Structure

```text
estateai-backend/
├── pom.xml
├── README.md
└── src/
    ├── main/
    │   ├── java/com/estateai/
    │   │   ├── EstateAiApplication.java
    │   │   ├── config/
    │   │   │   └── CorsConfig.java
    │   │   ├── controller/
    │   │   │   └── AuthController.java
    │   │   ├── dto/
    │   │   │   ├── ApiResponse.java
    │   │   │   ├── AuthResponse.java
    │   │   │   ├── ErrorResponse.java
    │   │   │   ├── LoginRequest.java
    │   │   │   ├── RegisterRequest.java
    │   │   │   └── UserResponse.java
    │   │   ├── exception/
    │   │   │   ├── BadRequestException.java
    │   │   │   ├── DuplicateResourceException.java
    │   │   │   ├── GlobalExceptionHandler.java
    │   │   │   ├── ResourceNotFoundException.java
    │   │   │   └── UnauthorizedException.java
    │   │   ├── model/
    │   │   │   ├── Role.java
    │   │   │   └── User.java
    │   │   ├── repository/
    │   │   │   └── UserRepository.java
    │   │   ├── security/
    │   │   │   ├── CustomUserDetails.java
    │   │   │   ├── CustomUserDetailsService.java
    │   │   │   ├── JwtAuthenticationFilter.java
    │   │   │   ├── JwtService.java
    │   │   │   └── SecurityConfig.java
    │   │   └── service/
    │   │       ├── AuthService.java
    │   │       └── impl/
    │   │           └── AuthServiceImpl.java
    │   └── resources/
    │       ├── application.properties
    │       └── .env.example
    └── test/
        └── java/com/estateai/
            ├── AuthServiceTest.java
            ├── AuthControllerTest.java
            └── JwtServiceTest.java
```

---

## ⚙️ Configuration

Environment variables can be supplied in `application.properties` or as OS environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `server.port` | `8080` | Backend port |
| `spring.data.mongodb.uri` | `mongodb://localhost:27017/estateai_db` | MongoDB connection URI |
| `application.security.jwt.secret-key` | *(256-bit Hex Key)* | Secret key for JWT signing |
| `application.security.jwt.expiration` | `86400000` (24h in ms) | JWT validity duration |
| `application.cors.allowed-origins` | `http://localhost:5173` | Allowed CORS frontend URL |

---

## 🔌 API Endpoints

### 1. Register User
`POST /api/auth/register` (Public)

**Request Body:**
```json
{
  "name": "Kavitha Reddy",
  "email": "kavitha@example.com",
  "phone": "+919876543210",
  "password": "Password123",
  "role": "BUYER"
}
```
*Note: Accepted roles are `BUYER`, `SELLER`, `AGENT`. Passing `ADMIN` returns `400 Bad Request`.*

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "673f...",
      "name": "Kavitha Reddy",
      "email": "kavitha@example.com",
      "phone": "+919876543210",
      "role": "BUYER",
      "profileImage": null,
      "verified": false,
      "createdAt": "2026-10-03T07:35:00Z"
    }
  }
}
```

---

### 2. Login
`POST /api/auth/login` (Public)

**Request Body:**
```json
{
  "email": "kavitha@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "673f...",
      "name": "Kavitha Reddy",
      "email": "kavitha@example.com",
      "phone": "+919876543210",
      "role": "BUYER",
      "profileImage": null,
      "verified": false,
      "createdAt": "2026-10-03T07:35:00Z"
    }
  }
}
```

---

### 3. Get Current User Profile
`GET /api/auth/me` (Protected — requires `Bearer <token>`)

**Headers:**
```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Current user profile retrieved successfully",
  "data": {
    "id": "673f...",
    "name": "Kavitha Reddy",
    "email": "kavitha@example.com",
    "phone": "+919876543210",
    "role": "BUYER",
    "profileImage": null,
    "verified": false,
    "createdAt": "2026-10-03T07:35:00Z"
  }
}
```

---

## 🧪 Testing & Execution

### Run Automated Tests
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
& "C:\Users\Dell\.gemini\antigravity\scratch\apache-maven-3.9.9\bin\mvn.cmd" test
```

### Run Backend Application
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
& "C:\Users\Dell\.gemini\antigravity\scratch\apache-maven-3.9.9\bin\mvn.cmd" spring-boot:run
```
