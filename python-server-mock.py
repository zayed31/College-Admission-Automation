#!/usr/bin/env python3
"""
Mock Python Document Processing Server
This simulates your actual Python server for testing communication
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Document processing server is running",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.route('/api/process-doc', methods=['POST'])
def process_documents():
    """Main document processing endpoint"""
    try:
        # Get request data
        data = request.get_json()
        
        if not data:
            return jsonify({
                "status": "ERROR",
                "message": "No JSON data provided"
            }), 400
        
        # Extract request information
        student_id = data.get('studentId', 'UNKNOWN')
        admission_session_id = data.get('admissionSessionId', 'UNKNOWN')
        documents = data.get('documents', [])
        request_id = data.get('requestId', str(uuid.uuid4()))
        
        print(f"Processing request for student: {student_id}")
        print(f"Session ID: {admission_session_id}")
        print(f"Documents count: {len(documents)}")
        
        if not documents:
            return jsonify({
                "status": "ERROR",
                "message": "No documents provided for processing"
            }), 400
        
        # Simulate processing time
        time.sleep(2)  # Simulate 2 seconds of processing
        
        # Process each document
        processed_documents = []
        extracted_student_data = {}
        
        for doc in documents:
            cloudinary_id = doc.get('cloudinaryId', '')
            document_type = doc.get('documentType', 'unknown')
            file_name = doc.get('fileName', 'unknown')
            
            print(f"Processing document: {file_name} (Type: {document_type})")
            
            # Mock document processing based on document type
            processed_doc = {
                "cloudinaryId": cloudinary_id,
                "documentType": document_type,
                "classifiedType": document_type,
                "confidence": 0.95,
                "processingStatus": "SUCCESS",
                "extractedData": extract_mock_data(document_type, file_name)
            }
            
            processed_documents.append(processed_doc)
        
        # Combine extracted data into student profile
        extracted_student_data = combine_student_data(processed_documents)
        
        # Create response
        response = {
            "status": "SUCCESS",
            "message": "Documents processed successfully",
            "requestId": request_id,
            "processingId": f"PROC_{uuid.uuid4().hex[:8].upper()}",
            "timestamp": int(time.time() * 1000),
            "processedDocuments": processed_documents,
            "extractedStudentData": extracted_student_data
        }
        
        print(f"Processing completed successfully for student: {student_id}")
        return jsonify(response)
        
    except Exception as e:
        print(f"Error processing documents: {str(e)}")
        return jsonify({
            "status": "ERROR",
            "message": f"Processing failed: {str(e)}"
        }), 500

def extract_mock_data(document_type, file_name):
    """Extract mock data based on document type"""
    
    if document_type == 'marksheet_10th':
        return {
            "rollNo": "12345",
            "board": "CBSE",
            "year": "2020",
            "marks": {
                "math": 85,
                "science": 90,
                "english": 88,
                "social": 82
            },
            "totalMarks": 345,
            "percentage": 86.25
        }
    
    elif document_type == 'marksheet_12th':
        return {
            "rollNo": "67890",
            "board": "CBSE",
            "year": "2022",
            "subjects": ["Physics", "Chemistry", "Mathematics", "English"],
            "marks": {
                "physics": 92,
                "chemistry": 88,
                "mathematics": 95,
                "english": 85
            },
            "totalMarks": 360,
            "percentage": 90.0
        }
    
    elif document_type == 'passing_certificate':
        return {
            "name": "John Doe",
            "roll": "12345",
            "yearOfPassing": "2020",
            "institution": "ABC School",
            "verificationStamp": True
        }
    
    elif document_type == 'entrance_exam_scorecard':
        return {
            "examName": "JEE Main",
            "roll": "JEE123456",
            "rank": 1500,
            "score": 98.5,
            "year": "2022"
        }
    
    elif document_type == 'transfer_migration_certificate':
        return {
            "previousInstitution": "ABC School",
            "dateOfLeaving": "2020-06-15",
            "verificationStamp": True,
            "migrationNumber": "MIG123456"
        }
    
    elif document_type == 'caste_domicile_certificate':
        return {
            "category": "OBC",
            "issuingAuthority": "District Collector",
            "state": "Karnataka",
            "verificationFlag": True,
            "certificateNumber": "CERT123456"
        }
    
    elif document_type == 'aadhar_card':
        return {
            "maskedAadhar": "XXXX XXXX 1234",
            "name": "John Doe",
            "verificationStatus": "Verified"
        }
    
    elif document_type == 'passport_photo':
        return {
            "description": "Student passport photo",
            "dimensions": "2x2 inches",
            "quality": "Good"
        }
    
    else:
        return {
            "info": "Generic document data",
            "documentType": document_type,
            "fileName": file_name
        }

def combine_student_data(processed_documents):
    """Combine extracted data from all documents into student profile"""
    
    student_data = {
        "studentName": "John Doe",
        "rollNumber": "12345",
        "board": "CBSE",
        "yearOfPassing": "2020",
        "totalMarks": 0,
        "percentage": 0,
        "documentsProcessed": len(processed_documents),
        "extractionTimestamp": datetime.now().isoformat()
    }
    
    # Combine marks from different documents
    total_marks = 0
    total_subjects = 0
    
    for doc in processed_documents:
        extracted_data = doc.get('extractedData', {})
        
        if 'marks' in extracted_data:
            marks = extracted_data['marks']
            if isinstance(marks, dict):
                for subject, mark in marks.items():
                    total_marks += mark
                    total_subjects += 1
        
        if 'totalMarks' in extracted_data:
            student_data['totalMarks'] = max(student_data['totalMarks'], extracted_data['totalMarks'])
        
        if 'percentage' in extracted_data:
            student_data['percentage'] = max(student_data['percentage'], extracted_data['percentage'])
    
    if total_subjects > 0:
        student_data['averageMarks'] = total_marks / total_subjects
    
    return student_data

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Simple test endpoint"""
    return jsonify({
        "message": "Python server is working!",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("Starting Mock Python Document Processing Server...")
    print("Server will be available at: http://localhost:5000")
    print("Health check: http://localhost:5000/health")
    print("Process documents: http://localhost:5000/api/process-doc")
    print("\nPress Ctrl+C to stop the server")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
