package com.college.admission.college_admission_server.dto;

import java.util.List;
import java.util.Map;

public class DocumentProcessingResponse {
    private String status;
    private String message;
    private String requestId;
    private String processingId;
    private long timestamp;
    private List<ProcessedDocument> processedDocuments;
    private Map<String, Object> extractedStudentData;

    public DocumentProcessingResponse() {
        this.timestamp = System.currentTimeMillis();
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getProcessingId() {
        return processingId;
    }

    public void setProcessingId(String processingId) {
        this.processingId = processingId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public List<ProcessedDocument> getProcessedDocuments() {
        return processedDocuments;
    }

    public void setProcessedDocuments(List<ProcessedDocument> processedDocuments) {
        this.processedDocuments = processedDocuments;
    }

    public Map<String, Object> getExtractedStudentData() {
        return extractedStudentData;
    }

    public void setExtractedStudentData(Map<String, Object> extractedStudentData) {
        this.extractedStudentData = extractedStudentData;
    }

    public static class ProcessedDocument {
        private String cloudinaryId;
        private String documentType;
        private String classifiedType;
        private double confidence;
        private Map<String, Object> extractedData;
        private String processingStatus;
        private String errorMessage;

        public ProcessedDocument() {}

        public ProcessedDocument(String cloudinaryId, String documentType, String classifiedType, double confidence) {
            this.cloudinaryId = cloudinaryId;
            this.documentType = documentType;
            this.classifiedType = classifiedType;
            this.confidence = confidence;
            this.processingStatus = "SUCCESS";
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

        public String getClassifiedType() {
            return classifiedType;
        }

        public void setClassifiedType(String classifiedType) {
            this.classifiedType = classifiedType;
        }

        public double getConfidence() {
            return confidence;
        }

        public void setConfidence(double confidence) {
            this.confidence = confidence;
        }

        public Map<String, Object> getExtractedData() {
            return extractedData;
        }

        public void setExtractedData(Map<String, Object> extractedData) {
            this.extractedData = extractedData;
        }

        public String getProcessingStatus() {
            return processingStatus;
        }

        public void setProcessingStatus(String processingStatus) {
            this.processingStatus = processingStatus;
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        public void setErrorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
        }
    }
}
