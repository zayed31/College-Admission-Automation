# College Admission Automation System

> A comprehensive college admission management system built for the MIT Hackathon, featuring a modern React frontend and robust Spring Boot backend with JWT authentication.

## Project Overview

The College Admission Automation System is a full-stack web application designed to streamline the college admission process. It provides an intuitive dashboard for administrators to manage student applications, track admission statistics, and automate administrative tasks.

### Key Features

- **Secure Authentication**: JWT-based authentication with role-based access control
- **Interactive Dashboard**: Real-time statistics and analytics for admission management
- **Modern UI**: Material-UI components with responsive design
- **RESTful API**: Well-structured backend API with comprehensive validation
- **File Upload Support**: Integration with Cloudinary for document management
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Security First**: Spring Security with CORS configuration and password encryption

## 🏗️ System Architecture

### Frontend (React + Vite)

- **Framework**: React 19 with Vite for fast development
- **UI Library**: Material-UI (MUI) for consistent design
- **State Management**: React Context API for authentication state
- **Routing**: React Router DOM for navigation
- **HTTP Client**: Axios with request/response interceptors
- **Form Handling**: React Hook Form with validation

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.5.6 with Java 17
- **Database**: MongoDB with Spring Data MongoDB
- **Security**: Spring Security with JWT authentication
- **File Storage**: Cloudinary integration for file uploads
- **Build Tool**: Maven for dependency management
- **API Documentation**: RESTful endpoints with validation

## Project Structure

```
College-Admission-Automation/
├── college-admission-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/                  # Reusable React components
│   │   │   ├── common/
│   │   │   │   └── ProtectedRoute.jsx   # Route protection component
│   │   │   └── layout/
│   │   │       └── Layout.jsx           # Main layout component
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx            # Main dashboard page
│   │   │   └── auth/
│   │   │       └── Login.jsx            # Login page
│   │   ├── services/
│   │   │   ├── api.js                   # Axios configuration
│   │   │   └── authService.js           # Authentication service
│   │   ├── App.jsx                      # Main App component
│   │   └── main.jsx                     # Application entry point
│   ├── package.json                     # Frontend dependencies
│   └── vite.config.js                   # Vite configuration
│
├── college-admission-server/            # Spring Boot backend
│   ├── src/main/java/com/college/admission/college_admission_server/
│   │   ├── config/
│   │   │   └── SecurityConfig.java      # Security configuration
│   │   ├── controller/
│   │   │   └── AuthController.java      # Authentication endpoints
│   │   ├── dto/                         # Data Transfer Objects
│   │   │   ├── LoginRequest.java
│   │   │   └── LoginResponse.java
│   │   ├── service/
│   │   │   └── AuthService.java         # Authentication business logic
│   │   ├── util/
│   │   │   └── JwtUtil.java            # JWT utility functions
│   │   └── CollegeAdmissionServerApplication.java
│   ├── src/main/resources/
│   │   └── application.properties       # Application configuration
│   ├── pom.xml                         # Maven dependencies
│   └── mvnw                            # Maven wrapper
│
├── System Architecture.docx             # System architecture documentation
└── README.md                           # This file
```

## Quick Start

### Prerequisites

- **Java 17 or higher**
- **Node.js 18+ and npm/yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/zayed31/College-Admission-Automation.git
cd College-Admission-Automation
```

### 2. Backend Setup

```bash
# Navigate to the server directory
cd college-admission-server

# Install dependencies and build (using Maven wrapper)
./mvnw clean install

# Configure MongoDB and other settings in application.properties
# Update the following configurations:
# - MongoDB connection details
# - Cloudinary credentials (for file uploads)
# - JWT secret key

# Run the Spring Boot application
./mvnw spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd college-admission-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:3000`

## ⚙️ Configuration

### Backend Configuration (application.properties)

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# MongoDB Configuration
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=college_admission
spring.data.mongodb.authentication-database=admin

# Cloudinary Configuration (for file uploads)
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret

# JWT Configuration
jwt.secret=your_jwt_secret_key_here
jwt.expiration=86400000  # 24 hours

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging
logging.level.com.college.admission=DEBUG
logging.level.org.springframework.web=DEBUG
```

### Frontend Configuration

The frontend is configured to connect to the backend API at `http://localhost:8080/api`. Update the `API_BASE_URL` in `src/services/api.js` if your backend is running on a different port or domain.

## Authentication

The system uses JWT (JSON Web Tokens) for authentication:

### Default Credentials (Demo)

- **Username**: `admin`
- **Password**: `admin123`

### Authentication Flow

1. User submits login credentials
2. Backend validates credentials and generates JWT token
3. Token is stored in localStorage and included in all API requests
4. Protected routes validate token before granting access

## API Documentation

### Authentication Endpoints

#### POST /api/auth/login

Login with username and password.

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "type": "Bearer",
  "username": "admin",
  "role": "ADMIN"
}
```

#### POST /api/auth/validate

Validate JWT token.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "valid": true,
  "username": "admin",
  "role": "ADMIN"
}
```

#### GET /api/auth/test

Test endpoint to verify API connectivity.

**Response:**

```json
{
  "message": "Auth service is working!"
}
```

## 🛠️ Development

### Backend Development

```bash
# Run in development mode with hot reload
cd college-admission-server
./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=dev"

# Run tests
./mvnw test

# Build for production
./mvnw clean package
```

### Frontend Development

```bash
# Run development server
cd college-admission-frontend
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Key Technologies & Dependencies

#### Frontend Dependencies

- **React 19**: Modern React with latest features
- **Material-UI**: Component library for consistent UI
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client with interceptors
- **React Hook Form**: Form handling and validation
- **React Dropzone**: File upload component
- **Vite**: Fast build tool and dev server

#### Backend Dependencies

- **Spring Boot**: Main framework
- **Spring Security**: Authentication and authorization
- **Spring Data MongoDB**: Database integration
- **JWT (jsonwebtoken)**: Token-based authentication
- **Cloudinary**: File upload and management
- **Lombok**: Code generation for Java
- **Jackson**: JSON processing
- **Maven**: Build and dependency management

## 🚀 Deployment

### Backend Deployment

1. **Build the JAR file:**

```bash
./mvnw clean package
```

2. **Run the JAR file:**

```bash
java -jar target/college-admission-server-0.0.1-SNAPSHOT.jar
```

3. **Environment Variables:**
   Set the following environment variables for production:

```bash
export MONGODB_URI=mongodb://your-mongodb-uri
export JWT_SECRET=your-production-jwt-secret
export CLOUDINARY_CLOUD_NAME=your-cloudinary-name
export CLOUDINARY_API_KEY=your-api-key
export CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend Deployment

1. **Build the application:**

```bash
npm run build
```

2. **Deploy the `dist/` folder** to your preferred hosting service (Netlify, Vercel, etc.)

3. **Environment Configuration:**
   Update the API base URL for production in `src/services/api.js`

## 🧪 Testing

### Backend Testing

```bash
cd college-admission-server
./mvnw test
```

### Frontend Testing

```bash
cd college-admission-frontend
npm run test  # (if test scripts are added)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 MIT Hackathon

This project was developed for the MIT Hackathon, showcasing modern web development practices and technologies in the education domain.

## 📞 Support

For support and questions, please open an issue on the GitHub repository or contact the development team.

---

**Built with ❤️ for MIT Hackathon**
