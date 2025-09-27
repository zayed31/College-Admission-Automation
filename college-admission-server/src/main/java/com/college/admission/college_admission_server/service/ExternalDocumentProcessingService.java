package com.college.admission.college_admission_server.service;

import com.college.admission.college_admission_server.dto.DocumentProcessingRequest;
import com.college.admission.college_admission_server.dto.DocumentProcessingResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.Map;

@Service
public class ExternalDocumentProcessingService {

    @Value("${document.processing.server.url}")
    private String documentProcessingServerUrl;

    @Value("${document.processing.server.endpoint}")
    private String documentProcessingEndpoint;

    @Value("${document.processing.server.timeout}")
    private int timeout;

    private final RestTemplate restTemplate;

    public ExternalDocumentProcessingService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Send documents to external processing server for text extraction and classification
     * @param request Document processing request containing Cloudinary URLs
     * @return Document processing response with extracted data
     */
    public DocumentProcessingResponse processDocuments(DocumentProcessingRequest request) {
        try {
            System.out.println("Sending documents to external processing server...");
            System.out.println("Server URL: " + documentProcessingServerUrl + documentProcessingEndpoint);
            System.out.println("Documents count: " + request.getDocuments().size());

            // Set up headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("User-Agent", "College-Admission-Server/1.0");

            // Create HTTP entity with request body
            HttpEntity<DocumentProcessingRequest> entity = new HttpEntity<>(request, headers);

            // Make the request
            ResponseEntity<DocumentProcessingResponse> response = restTemplate.exchange(
                documentProcessingServerUrl + documentProcessingEndpoint,
                HttpMethod.POST,
                entity,
                DocumentProcessingResponse.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                System.out.println("Document processing successful");
                return response.getBody();
            } else {
                System.out.println("Document processing failed with status: " + response.getStatusCode());
                return createErrorResponse("Processing failed with status: " + response.getStatusCode());
            }

        } catch (HttpClientErrorException e) {
            System.err.println("Client error when calling document processing server: " + e.getMessage());
            System.err.println("Response body: " + e.getResponseBodyAsString());
            return createErrorResponse("Client error: " + e.getMessage());
        } catch (HttpServerErrorException e) {
            System.err.println("Server error when calling document processing server: " + e.getMessage());
            System.err.println("Response body: " + e.getResponseBodyAsString());
            return createErrorResponse("Server error: " + e.getMessage());
        } catch (ResourceAccessException e) {
            System.err.println("Connection timeout or network error: " + e.getMessage());
            return createErrorResponse("Connection error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error when calling document processing server: " + e.getMessage());
            e.printStackTrace();
            return createErrorResponse("Unexpected error: " + e.getMessage());
        }
    }

    /**
     * Test connection to external document processing server
     * @return true if connection is successful, false otherwise
     */
    public boolean testConnection() {
        try {
            System.out.println("Testing connection to document processing server...");
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "College-Admission-Server/1.0");
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                documentProcessingServerUrl + "/health",
                HttpMethod.GET,
                entity,
                String.class
            );

            System.out.println("Connection test successful: " + response.getStatusCode());
            return response.getStatusCode() == HttpStatus.OK;
        } catch (Exception e) {
            System.err.println("Connection test failed: " + e.getMessage());
            return false;
        }
    }

    /**
     * Create error response when processing fails
     */
    private DocumentProcessingResponse createErrorResponse(String errorMessage) {
        DocumentProcessingResponse errorResponse = new DocumentProcessingResponse();
        errorResponse.setStatus("ERROR");
        errorResponse.setMessage(errorMessage);
        errorResponse.setProcessedDocuments(new java.util.ArrayList<>());
        return errorResponse;
    }
}
