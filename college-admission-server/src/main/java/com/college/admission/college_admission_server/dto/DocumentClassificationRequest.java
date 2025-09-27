package com.college.admission.college_admission_server.dto;

import java.util.List;

public class DocumentClassificationRequest {
    private List<DocumentInfo> documents;

    // Constructors
    public DocumentClassificationRequest() {}

    public DocumentClassificationRequest(List<DocumentInfo> documents) {
        this.documents = documents;
    }

    // Getters and Setters
    public List<DocumentInfo> getDocuments() {
        return documents;
    }

    public void setDocuments(List<DocumentInfo> documents) {
        this.documents = documents;
    }

    // Inner class for document information
    public static class DocumentInfo {
        private String cloudinaryId;
        private String fileName;
        private String fileType;

        // Constructors
        public DocumentInfo() {}

        public DocumentInfo(String cloudinaryId, String fileName, String fileType) {
            this.cloudinaryId = cloudinaryId;
            this.fileName = fileName;
            this.fileType = fileType;
        }

        // Getters and Setters
        public String getCloudinaryId() {
            return cloudinaryId;
        }

        public void setCloudinaryId(String cloudinaryId) {
            this.cloudinaryId = cloudinaryId;
        }

        public String getFileName() {
            return fileName;
        }

        public void setFileName(String fileName) {
            this.fileName = fileName;
        }

        public String getFileType() {
            return fileType;
        }

        public void setFileType(String fileType) {
            this.fileType = fileType;
        }
    }
}
