package com.college.admission.college_admission_server.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.college.admission.college_admission_server.dto.DocumentUploadResponse;
import com.college.admission.college_admission_server.dto.DocumentClassificationRequest;
import com.college.admission.college_admission_server.dto.DocumentClassificationResponse;
import com.college.admission.college_admission_server.dto.DocumentProcessingRequest;
import com.college.admission.college_admission_server.dto.DocumentProcessingResponse;
import com.college.admission.college_admission_server.service.DocumentProcessingService;
import com.college.admission.college_admission_server.service.ExternalDocumentProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DocumentUploadController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private DocumentProcessingService documentProcessingService;

    @Autowired
    private ExternalDocumentProcessingService externalDocumentProcessingService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("Upload request received for file: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize() + " bytes");
            
            // Validate file
            if (file.isEmpty()) {
                System.out.println("File is empty");
                Map<String, String> error = new HashMap<>();
                error.put("error", "File is empty");
                return ResponseEntity.badRequest().body(error);
            }

            // Check file size (10MB limit)
            if (file.getSize() > 10 * 1024 * 1024) {
                System.out.println("File size exceeds limit: " + file.getSize());
                Map<String, String> error = new HashMap<>();
                error.put("error", "File size exceeds 10MB limit");
                return ResponseEntity.badRequest().body(error);
            }

            // Upload to Cloudinary using upload preset
            System.out.println("Uploading to Cloudinary...");
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                    "upload_preset", "college_admissions",
                    "folder", "college_admissions",
                    "tags", "admission_documents",
                    "resource_type", "auto"
                )
            );
            System.out.println("Cloudinary upload successful: " + uploadResult.get("public_id"));

            // Extract upload information
            String publicId = (String) uploadResult.get("public_id");
            String secureUrl = (String) uploadResult.get("secure_url");
            String format = (String) uploadResult.get("format");
            Long bytes = (Long) uploadResult.get("bytes");

            // Create response
            DocumentUploadResponse response = new DocumentUploadResponse();
            response.setPublicId(publicId);
            response.setSecureUrl(secureUrl);
            response.setFormat(format);
            response.setSize(bytes);
            response.setFileName(file.getOriginalFilename());
            response.setMessage("File uploaded successfully");
            
            System.out.println("Returning response: " + response.getPublicId());

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            System.out.println("IOException during upload: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        } catch (Exception e) {
            System.out.println("Unexpected error during upload: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Unexpected error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @PostMapping("/classify-documents")
    public ResponseEntity<?> classifyDocuments(@RequestBody DocumentClassificationRequest request) {
        try {
            // Process documents through the second model
            DocumentClassificationResponse response = documentProcessingService.classifyDocuments(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to classify documents: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @DeleteMapping("/documents/{publicId}")
    public ResponseEntity<?> deleteDocument(@PathVariable String publicId) {
        try {
            Map<String, Object> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete document: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/documents/{publicId}/info")
    public ResponseEntity<?> getDocumentInfo(@PathVariable String publicId) {
        try {
            Map<String, Object> result = cloudinary.api().resource(publicId, ObjectUtils.emptyMap());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get document info: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/test-cloudinary")
    public ResponseEntity<?> testCloudinary() {
        try {
            System.out.println("Testing Cloudinary connection...");
            // Try to get account info to test connection
            Map<String, Object> result = cloudinary.api().ping(ObjectUtils.emptyMap());
            System.out.println("Cloudinary connection successful");
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Cloudinary connection is working",
                "cloudName", cloudinary.config.cloudName
            ));
        } catch (Exception e) {
            System.out.println("Cloudinary connection failed: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Cloudinary connection failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @PostMapping("/process-student-documents")
    public ResponseEntity<?> processStudentDocuments(@RequestBody Map<String, Object> request) {
        try {
            System.out.println("Processing student documents...");
            
            String studentId = (String) request.get("studentId");
            String admissionSessionId = (String) request.get("admissionSessionId");
            @SuppressWarnings("unchecked")
            java.util.List<Map<String, Object>> documents = (java.util.List<Map<String, Object>>) request.get("documents");
            
            if (studentId == null || documents == null || documents.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Missing required fields: studentId and documents");
                return ResponseEntity.badRequest().body(error);
            }

            // Convert frontend document data to DocumentProcessingRequest
            java.util.List<DocumentProcessingRequest.DocumentInfo> documentInfos = new java.util.ArrayList<>();
            
            for (Map<String, Object> doc : documents) {
                String cloudinaryId = (String) doc.get("cloudinaryId");
                String fileName = (String) doc.get("name");
                String fileType = (String) doc.get("type");
                String documentType = (String) doc.get("documentType");
                
                if (cloudinaryId != null) {
                    // Construct Cloudinary URL
                    String cloudinaryUrl = "https://res.cloudinary.com/dal5z9kro/image/upload/" + cloudinaryId;
                    
                    DocumentProcessingRequest.DocumentInfo docInfo = new DocumentProcessingRequest.DocumentInfo(
                        cloudinaryId, cloudinaryUrl, fileName, fileType, documentType
                    );
                    documentInfos.add(docInfo);
                }
            }

            // Create processing request
            DocumentProcessingRequest processingRequest = new DocumentProcessingRequest(
                studentId, admissionSessionId, documentInfos
            );

            // Send to external document processing server
            DocumentProcessingResponse response = externalDocumentProcessingService.processDocuments(processingRequest);

            System.out.println("Document processing completed with status: " + response.getStatus());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Error processing student documents: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to process documents: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/test-document-processing-server")
    public ResponseEntity<?> testDocumentProcessingServer() {
        try {
            System.out.println("Testing connection to document processing server...");
            boolean isConnected = externalDocumentProcessingService.testConnection();
            
            if (isConnected) {
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Document processing server is accessible"
                ));
            } else {
                return ResponseEntity.status(503).body(Map.of(
                    "status", "error",
                    "message", "Document processing server is not accessible"
                ));
            }
        } catch (Exception e) {
            System.err.println("Error testing document processing server: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to test document processing server: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
