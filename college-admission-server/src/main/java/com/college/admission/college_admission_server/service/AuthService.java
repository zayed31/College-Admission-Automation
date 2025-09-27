package com.college.admission.college_admission_server.service;

import com.college.admission.college_admission_server.dto.LoginRequest;
import com.college.admission.college_admission_server.dto.LoginResponse;
import com.college.admission.college_admission_server.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Hardcoded admin credentials for hackathon
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123"; // In real app, this would be hashed
    private static final String ADMIN_ROLE = "ADMIN";
    
    public LoginResponse authenticate(LoginRequest loginRequest) {
        // Debug logging
        System.out.println("Login attempt - Username: " + loginRequest.getUsername() + ", Password: " + loginRequest.getPassword());
        System.out.println("Expected - Username: " + ADMIN_USERNAME + ", Password: " + ADMIN_PASSWORD);
        
        // Check hardcoded credentials
        if (ADMIN_USERNAME.equals(loginRequest.getUsername()) && 
            ADMIN_PASSWORD.equals(loginRequest.getPassword())) {
            
            // Generate JWT token
            String token = jwtUtil.generateToken(loginRequest.getUsername(), ADMIN_ROLE);
            System.out.println("Token generated successfully");
            
            return new LoginResponse(token, loginRequest.getUsername(), ADMIN_ROLE);
        }
        
        System.out.println("Authentication failed - credentials don't match");
        throw new RuntimeException("Invalid username or password");
    }
    
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }
    
    public String getUsernameFromToken(String token) {
        return jwtUtil.getUsernameFromToken(token);
    }
    
    public String getRoleFromToken(String token) {
        return jwtUtil.getRoleFromToken(token);
    }
}
