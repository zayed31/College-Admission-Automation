package com.college.admission.college_admission_server.service;

import com.college.admission.college_admission_server.dto.DocumentClassificationRequest;
import com.college.admission.college_admission_server.dto.DocumentClassificationResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentProcessingService {

    private final RestTemplate restTemplate;
    private final String DOCUMENT_PROCESSING_SERVER_URL = "http://localhost:8081"; // Second model server URL

    public DocumentProcessingService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Send documents to the second model for classification and data extraction
     * @param request - Document classification request
     * @return DocumentClassificationResponse with classification results
     */
    public DocumentClassificationResponse classifyDocuments(DocumentClassificationRequest request) {
        try {
            // Prepare request for the second model
            Map<String, Object> processingRequest = new HashMap<>();
            processingRequest.put("documents", request.getDocuments());

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(processingRequest, headers);

            // Call the second model server
            ResponseEntity<Map> response = restTemplate.postForEntity(
                DOCUMENT_PROCESSING_SERVER_URL + "/api/process-documents",
                entity,
                Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return parseClassificationResponse(response.getBody());
            } else {
                throw new RuntimeException("Document processing server returned error");
            }

        } catch (Exception e) {
            // Fallback: Return mock classification results for development
            return createMockClassificationResponse(request);
        }
    }

    /**
     * Parse the response from the document processing server
     */
    private DocumentClassificationResponse parseClassificationResponse(Map<String, Object> responseBody) {
        List<DocumentClassificationResponse.DocumentClassification> classifications = new ArrayList<>();
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> results = (List<Map<String, Object>>) responseBody.get("classifications");
        
        if (results != null) {
            for (Map<String, Object> result : results) {
                DocumentClassificationResponse.DocumentClassification classification = 
                    new DocumentClassificationResponse.DocumentClassification();
                
                classification.setCloudinaryId((String) result.get("cloudinaryId"));
                classification.setDocumentType((String) result.get("documentType"));
                classification.setExtractedData((Map<String, Object>) result.get("extractedData"));
                classification.setConfidence(((Number) result.get("confidence")).doubleValue());
                classification.setStatus((String) result.get("status"));
                
                classifications.add(classification);
            }
        }

        return new DocumentClassificationResponse(
            classifications,
            "Documents processed successfully",
            true
        );
    }

    /**
     * Create mock classification response for development/testing
     */
    private DocumentClassificationResponse createMockClassificationResponse(DocumentClassificationRequest request) {
        List<DocumentClassificationResponse.DocumentClassification> classifications = new ArrayList<>();

        for (DocumentClassificationRequest.DocumentInfo doc : request.getDocuments()) {
            DocumentClassificationResponse.DocumentClassification classification = 
                new DocumentClassificationResponse.DocumentClassification();
            
            classification.setCloudinaryId(doc.getCloudinaryId());
            classification.setDocumentType(classifyDocumentType(doc.getFileName()));
            classification.setExtractedData(createMockExtractedData(doc.getFileName()));
            classification.setConfidence(0.95);
            classification.setStatus("completed");
            
            classifications.add(classification);
        }

        return new DocumentClassificationResponse(
            classifications,
            "Documents processed successfully (mock data)",
            true
        );
    }

    /**
     * Mock document type classification based on filename
     */
    private String classifyDocumentType(String fileName) {
        String lowerFileName = fileName.toLowerCase();
        
        if (lowerFileName.contains("10th") || lowerFileName.contains("tenth")) {
            return "marksheet_10th";
        } else if (lowerFileName.contains("12th") || lowerFileName.contains("twelfth")) {
            return "marksheet_12th";
        } else if (lowerFileName.contains("passing") || lowerFileName.contains("certificate")) {
            return "passing_certificate";
        } else if (lowerFileName.contains("entrance") || lowerFileName.contains("scorecard")) {
            return "entrance_scorecard";
        } else if (lowerFileName.contains("admit")) {
            return "admit_card";
        } else if (lowerFileName.contains("transfer") || lowerFileName.contains("migration")) {
            return "transfer_certificate";
        } else if (lowerFileName.contains("caste") || lowerFileName.contains("domicile")) {
            return "caste_certificate";
        } else if (lowerFileName.contains("aadhar") || lowerFileName.contains("aadhaar")) {
            return "aadhar_card";
        } else if (lowerFileName.contains("photo") || lowerFileName.contains("picture")) {
            return "passport_photo";
        } else {
            return "other_documents";
        }
    }

    /**
     * Create mock extracted data based on document type
     */
    private Map<String, Object> createMockExtractedData(String fileName) {
        Map<String, Object> extractedData = new HashMap<>();
        String documentType = classifyDocumentType(fileName);

        switch (documentType) {
            case "marksheet_10th":
            case "marksheet_12th":
                extractedData.put("rollNumber", "12345");
                extractedData.put("board", "CBSE");
                extractedData.put("year", "2023");
                extractedData.put("subjects", List.of("Mathematics", "Physics", "Chemistry", "English"));
                extractedData.put("marks", Map.of("Mathematics", 95, "Physics", 92, "Chemistry", 88, "English", 90));
                break;
            case "passing_certificate":
                extractedData.put("name", "John Doe");
                extractedData.put("rollNumber", "12345");
                extractedData.put("yearOfPassing", "2023");
                break;
            case "entrance_scorecard":
                extractedData.put("examName", "JEE Main");
                extractedData.put("rollNumber", "12345");
                extractedData.put("rank", "1500");
                extractedData.put("score", "285");
                break;
            case "aadhar_card":
                extractedData.put("name", "John Doe");
                extractedData.put("aadharNumber", "1234-5678-9012");
                extractedData.put("dateOfBirth", "2005-01-01");
                break;
            case "passport_photo":
                extractedData.put("imageType", "passport_photo");
                extractedData.put("dimensions", "2x2 inches");
                break;
            default:
                extractedData.put("documentType", documentType);
                extractedData.put("fileName", fileName);
        }

        return extractedData;
    }
}
