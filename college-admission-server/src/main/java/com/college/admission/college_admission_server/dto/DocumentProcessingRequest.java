package com.college.admission.college_admission_server.dto;

import java.util.List;

public class DocumentProcessingRequest {
    private String studentId;
    private String admissionSessionId;
    private List<DocumentInfo> documents;
    private String requestId;
    private long timestamp;

    public DocumentProcessingRequest() {
        this.timestamp = System.currentTimeMillis();
        this.requestId = "REQ_" + System.currentTimeMillis();
    }

    public DocumentProcessingRequest(String studentId, String admissionSessionId, List<DocumentInfo> documents) {
        this();
        this.studentId = studentId;
        this.admissionSessionId = admissionSessionId;
        this.documents = documents;
    }

    // Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getAdmissionSessionId() {
        return admissionSessionId;
    }

    public void setAdmissionSessionId(String admissionSessionId) {
        this.admissionSessionId = admissionSessionId;
    }

    public List<DocumentInfo> getDocuments() {
        return documents;
    }

    public void setDocuments(List<DocumentInfo> documents) {
        this.documents = documents;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public static class DocumentInfo {
        private String cloudinaryId;
        private String cloudinaryUrl;
        private String fileName;
        private String fileType;
        private String documentType;
        private long fileSize;
        private String uploadTimestamp;

        public DocumentInfo() {}

        public DocumentInfo(String cloudinaryId, String cloudinaryUrl, String fileName, String fileType, String documentType) {
            this.cloudinaryId = cloudinaryId;
            this.cloudinaryUrl = cloudinaryUrl;
            this.fileName = fileName;
            this.fileType = fileType;
            this.documentType = documentType;
            this.uploadTimestamp = String.valueOf(System.currentTimeMillis());
        }

        // Getters and Setters
        public String getCloudinaryId() {
            return cloudinaryId;
        }

        public void setCloudinaryId(String cloudinaryId) {
            this.cloudinaryId = cloudinaryId;
        }

        public String getCloudinaryUrl() {
            return cloudinaryUrl;
        }

        public void setCloudinaryUrl(String cloudinaryUrl) {
            this.cloudinaryUrl = cloudinaryUrl;
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

        public String getDocumentType() {
            return documentType;
        }

        public void setDocumentType(String documentType) {
            this.documentType = documentType;
        }

        public long getFileSize() {
            return fileSize;
        }

        public void setFileSize(long fileSize) {
            this.fileSize = fileSize;
        }

        public String getUploadTimestamp() {
            return uploadTimestamp;
        }

        public void setUploadTimestamp(String uploadTimestamp) {
            this.uploadTimestamp = uploadTimestamp;
        }
    }
}
