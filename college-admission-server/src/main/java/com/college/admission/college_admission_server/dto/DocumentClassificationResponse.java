package com.college.admission.college_admission_server.dto;

import java.util.List;
import java.util.Map;

public class DocumentClassificationResponse {
    private List<DocumentClassification> classifications;
    private String message;
    private boolean success;

    // Constructors
    public DocumentClassificationResponse() {}

    public DocumentClassificationResponse(List<DocumentClassification> classifications, String message, boolean success) {
        this.classifications = classifications;
        this.message = message;
        this.success = success;
    }

    // Getters and Setters
    public List<DocumentClassification> getClassifications() {
        return classifications;
    }

    public void setClassifications(List<DocumentClassification> classifications) {
        this.classifications = classifications;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    // Inner class for document classification result
    public static class DocumentClassification {
        private String cloudinaryId;
        private String documentType;
        private Map<String, Object> extractedData;
        private double confidence;
        private String status;

        // Constructors
        public DocumentClassification() {}

        public DocumentClassification(String cloudinaryId, String documentType, Map<String, Object> extractedData, double confidence, String status) {
            this.cloudinaryId = cloudinaryId;
            this.documentType = documentType;
            this.extractedData = extractedData;
            this.confidence = confidence;
            this.status = status;
        }

        // Getters and Setters
        public String getCloudinaryId() {
            return cloudinaryId;
        }

        public void setCloudinaryId(String cloudinaryId) {
            this.cloudinaryId = cloudinaryId;
        }

        public String getDocumentType() {
            return documentType;
        }

        public void setDocumentType(String documentType) {
            this.documentType = documentType;
        }

        public Map<String, Object> getExtractedData() {
            return extractedData;
        }

        public void setExtractedData(Map<String, Object> extractedData) {
            this.extractedData = extractedData;
        }

        public double getConfidence() {
            return confidence;
        }

        public void setConfidence(double confidence) {
            this.confidence = confidence;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
