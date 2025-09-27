package com.college.admission.college_admission_server.dto;

public class DocumentUploadResponse {
    private String publicId;
    private String secureUrl;
    private String format;
    private Long size;
    private String fileName;
    private String message;

    // Constructors
    public DocumentUploadResponse() {}

    public DocumentUploadResponse(String publicId, String secureUrl, String format, Long size, String fileName, String message) {
        this.publicId = publicId;
        this.secureUrl = secureUrl;
        this.format = format;
        this.size = size;
        this.fileName = fileName;
        this.message = message;
    }

    // Getters and Setters
    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getSecureUrl() {
        return secureUrl;
    }

    public void setSecureUrl(String secureUrl) {
        this.secureUrl = secureUrl;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
