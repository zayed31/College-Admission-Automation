import React, { useState, useCallback } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material'
import {
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material'

const DocumentUpload = ({ onUploadComplete, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [errors, setErrors] = useState([])
  const [previewDialog, setPreviewDialog] = useState({ open: false, file: null })
  const [uploadingDocType, setUploadingDocType] = useState(null)

  // Required document types
  const requiredDocuments = [
    { type: 'marksheet_10th', name: '10th Marksheet', required: true },
    { type: 'marksheet_12th', name: '12th Marksheet', required: true },
    { type: 'passing_certificate', name: 'Passing Certificate', required: true },
    { type: 'entrance_scorecard', name: 'Entrance Exam Scorecard', required: true },
    { type: 'admit_card', name: 'Admit Card', required: true },
    { type: 'transfer_certificate', name: 'Transfer/Migration Certificate', required: true },
    { type: 'caste_certificate', name: 'Caste/Domicile Certificate', required: false },
    { type: 'aadhar_card', name: 'Aadhar Card', required: true },
    { type: 'passport_photo', name: 'Passport Photo', required: true },
    { type: 'other_documents', name: 'Other Documents', required: false }
  ]

  const handleIndividualUpload = (documentType) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,application/pdf,.doc,.docx'
    input.multiple = false
    
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        const newFile = {
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          cloudinaryId: null,
          classifiedType: null,
          documentType: documentType,
          preview: URL.createObjectURL(file)
        }
        
        setUploadedFiles(prev => {
          // Remove any existing file of the same document type
          const filtered = prev.filter(f => f.documentType !== documentType)
          return [...filtered, newFile]
        })

        // Upload directly to Cloudinary using upload preset
        try {
          setUploadProgress(prev => ({ ...prev, [newFile.id]: 0 }))
          
          const formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', 'college_admissions')
          formData.append('folder', 'college_admissions')
          formData.append('tags', `admission_documents,${documentType}`)

          const response = await fetch('https://api.cloudinary.com/v1_1/dal5z9kro/upload', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(`Upload failed: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`)
          }

          const result = await response.json()
          
          // Update file status to completed
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? {
              ...f,
              status: 'completed',
              cloudinaryId: result.public_id,
              classifiedType: documentType
            } : f)
          )

        } catch (error) {
          // Update file status to error
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? {
              ...f,
              status: 'error'
            } : f)
          )
          setErrors(prev => [...prev, `Failed to upload ${file.name}: ${error.message}`])
        } finally {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[newFile.id]
            return newProgress
          })
        }
      }
    }
    
    input.click()
  }

  const handleBulkUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,application/pdf,.doc,.docx'
    input.multiple = true
    
    input.onchange = async (e) => {
      const files = Array.from(e.target.files)
      if (files.length > 0) {
        const newFiles = files.map(file => ({
          id: Date.now() + Math.random() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          cloudinaryId: null,
          classifiedType: null,
          documentType: null, // Will be classified by the system
          preview: URL.createObjectURL(file)
        }))
        
        setUploadedFiles(prev => [...prev, ...newFiles])

        // Upload all files to Cloudinary immediately
        for (const fileObj of newFiles) {
          try {
            setUploadProgress(prev => ({ ...prev, [fileObj.id]: 0 }))
            
            const formData = new FormData()
            formData.append('file', fileObj.file)
            formData.append('upload_preset', 'college_admissions')
            formData.append('folder', 'college_admissions')
            formData.append('tags', 'admission_documents,unclassified')

            const response = await fetch('https://api.cloudinary.com/v1_1/dal5z9kro/upload', {
              method: 'POST',
              body: formData,
            })

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}))
              throw new Error(`Upload failed: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`)
            }

            const result = await response.json()
            
            // Update file status to completed
            setUploadedFiles(prev => 
              prev.map(f => f.id === fileObj.id ? {
                ...f,
                status: 'completed',
                cloudinaryId: result.public_id,
                classifiedType: 'unclassified'
              } : f)
            )

          } catch (error) {
            // Update file status to error
            setUploadedFiles(prev => 
              prev.map(f => f.id === fileObj.id ? {
                ...f,
                status: 'error'
              } : f)
            )
            setErrors(prev => [...prev, `Failed to upload ${fileObj.name}: ${error.message}`])
          } finally {
            setUploadProgress(prev => {
              const newProgress = { ...prev }
              delete newProgress[fileObj.id]
              return newProgress
            })
          }
        }
      }
    }
    
    input.click()
  }


  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon />
    if (fileType === 'application/pdf') return <PdfIcon />
    return <FileIcon />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading': return 'info'
      case 'completed': return 'success'
      case 'error': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading': return <UploadIcon />
      case 'completed': return <CheckCircleIcon />
      case 'error': return <ErrorIcon />
      default: return <DescriptionIcon />
    }
  }

  const getUploadedFileForType = (documentType) => {
    return uploadedFiles.find(file => file.documentType === documentType)
  }

  const isDocumentUploaded = (documentType) => {
    return uploadedFiles.some(file => file.documentType === documentType && file.status === 'completed')
  }

  const handleUpload = async () => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed')
    
    if (completedFiles.length === 0) {
      setErrors(['Please upload at least one document'])
      return
    }

    setUploading(true)
    setErrors([])

    try {
      // Send to external document processing server
      const processingData = {
        studentId: `STU_${Date.now()}`, // Generate temporary student ID
        admissionSessionId: `ADM_${Date.now()}`, // Generate session ID
        documents: completedFiles.map(file => ({
          cloudinaryId: file.cloudinaryId,
          name: file.name,
          type: file.type,
          documentType: file.documentType || 'unclassified',
          size: file.size
        }))
      }

      try {
        console.log('Sending documents for processing:', processingData)
        
        const processingResponse = await fetch('http://localhost:8080/api/process-student-documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processingData)
        })

        if (processingResponse.ok) {
          const processingResult = await processingResponse.json()
          console.log('Document processing result:', processingResult)

          // Update files with processing results
          setUploadedFiles(prev => 
            prev.map(file => {
              const processedDoc = processingResult.processedDocuments?.find(
                doc => doc.cloudinaryId === file.cloudinaryId
              )
              return processedDoc ? {
                ...file,
                classifiedType: processedDoc.classifiedType,
                extractedData: processedDoc.extractedData,
                documentType: file.documentType || processedDoc.classifiedType
              } : file
            })
          )

          // Store extracted student data if available
          if (processingResult.extractedStudentData) {
            console.log('Extracted student data:', processingResult.extractedStudentData)
            // You can store this data in state or send it to parent component
          }
        } else {
          const errorData = await processingResponse.json().catch(() => ({}))
          throw new Error(`Processing failed: ${processingResponse.statusText} - ${errorData.error || 'Unknown error'}`)
        }
      } catch (processingError) {
        console.warn('Document processing failed:', processingError)
        setErrors([`Document processing failed: ${processingError.message}`])
      }

      // Call the completion callback with all uploaded files
      onUploadComplete(completedFiles)

    } catch (error) {
      setErrors([`Processing failed: ${error.message}`])
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handlePreview = (file) => {
    setPreviewDialog({ open: true, file })
  }

  const handleClosePreview = () => {
    setPreviewDialog({ open: false, file: null })
  }

  const requiredDocumentsUploaded = requiredDocuments
    .filter(doc => doc.required)
    .every(doc => isDocumentUploaded(doc.type))
  
  const hasUploadedFiles = uploadedFiles.some(f => f.status === 'completed')
  const isUploadReady = hasUploadedFiles && requiredDocumentsUploaded

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1
        }}>
          Document Upload
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 2 }}>
          Upload all required documents for student admission. Documents will be automatically classified and processed.
        </Typography>
        
        {/* Progress Indicator */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Required Documents Progress:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
              {requiredDocuments.filter(doc => doc.required && isDocumentUploaded(doc.type)).length} / {requiredDocuments.filter(doc => doc.required).length}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(requiredDocuments.filter(doc => doc.required && isDocumentUploaded(doc.type)).length / requiredDocuments.filter(doc => doc.required).length) * 100}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: 4
              }
            }}
          />
        </Box>

        {/* Bulk Upload Button */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={handleBulkUpload}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#667eea',
              color: '#667eea',
              '&:hover': {
                borderColor: '#5a67d8',
                backgroundColor: 'rgba(102, 126, 234, 0.04)'
              }
            }}
          >
            Upload All Documents at Once
          </Button>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#6b7280' }}>
            Select multiple files to upload all documents together
          </Typography>
        </Box>
      </Box>

      {/* Document Upload Cards */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Upload Required Documents
        </Typography>
        <Grid container spacing={3}>
          {requiredDocuments.map((doc, index) => {
            const uploadedFile = getUploadedFileForType(doc.type)
            const isUploaded = isDocumentUploaded(doc.type)
            
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  border: isUploaded ? '2px solid #10b981' : '1px solid #e5e7eb',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    borderColor: isUploaded ? '#10b981' : '#667eea',
                    boxShadow: isUploaded ? '0 4px 20px rgba(16, 185, 129, 0.2)' : '0 4px 20px rgba(102, 126, 234, 0.2)'
                  }
                }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {isUploaded ? (
                        <CheckCircleIcon sx={{ color: '#10b981', fontSize: 40 }} />
                      ) : (
                        <DescriptionIcon sx={{ color: '#667eea', fontSize: 40 }} />
                      )}
                    </Box>
                    
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#374151' }}>
                      {doc.name}
                    </Typography>
                    
                    <Chip 
                      label={doc.required ? 'Required' : 'Optional'} 
                      size="small" 
                      color={doc.required ? 'error' : 'default'}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />

                    {uploadedFile && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                          {uploadedFile.name}
                        </Typography>
                        <Chip 
                          icon={getStatusIcon(uploadedFile.status)}
                          label={uploadedFile.status}
                          size="small"
                          color={getStatusColor(uploadedFile.status)}
                        />
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        variant={isUploaded ? "outlined" : "contained"}
                        size="small"
                        onClick={() => handleIndividualUpload(doc.type)}
                        disabled={uploading && uploadingDocType === doc.type}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          ...(isUploaded ? {} : {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a5 100%)'
                            }
                          })
                        }}
                      >
                        {isUploaded ? 'Replace' : 'Upload'}
                      </Button>
                      
                      {uploadedFile && (
                        <IconButton 
                          size="small"
                          onClick={() => handlePreview(uploadedFile)}
                          sx={{ color: '#667eea' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Paper>


      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Upload Errors:
          </Typography>
          {errors.map((error, index) => (
            <Typography key={index} variant="body2">
              • {error}
            </Typography>
          ))}
        </Alert>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Uploaded Files ({uploadedFiles.length})
          </Typography>
          
          <Grid container spacing={2}>
            {uploadedFiles.map((fileObj) => (
              <Grid item xs={12} sm={6} md={4} key={fileObj.id}>
                <Card sx={{ 
                  border: '1px solid #e5e7eb',
                  borderRadius: 2,
                  '&:hover': { boxShadow: 2 }
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getFileIcon(fileObj.type)}
                      <Box sx={{ ml: 2, flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {fileObj.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          {formatFileSize(fileObj.size)}
                        </Typography>
                      </Box>
                    </Box>

                    {fileObj.status === 'uploading' && (
                      <LinearProgress 
                        variant="determinate" 
                        value={uploadProgress[fileObj.id] || 0}
                        sx={{ mb: 2 }}
                      />
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        icon={getStatusIcon(fileObj.status)}
                        label={fileObj.status}
                        size="small"
                        color={getStatusColor(fileObj.status)}
                        sx={{ mr: 1 }}
                      />
                      {fileObj.classifiedType && (
                        <Chip 
                          label={fileObj.classifiedType}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      )}
                    </Box>

                    <CardActions sx={{ p: 0, justifyContent: 'space-between' }}>
                      <IconButton 
                        size="small"
                        onClick={() => handlePreview(fileObj)}
                        disabled={fileObj.status !== 'completed'}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleRemoveFile(fileObj.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
           <Button 
             variant="contained"
             onClick={handleUpload}
             disabled={!isUploadReady || uploading}
             sx={{
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               borderRadius: 2,
               px: 4,
               '&:hover': {
                 background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a5 100%)'
               }
             }}
           >
             {uploading ? 'Processing Documents...' : 
              requiredDocumentsUploaded ? 'Process & Classify Documents' : 
              'Upload Required Documents First'}
           </Button>
      </Box>

      {/* Preview Dialog */}
      <Dialog 
        open={previewDialog.open} 
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          Document Preview
          <IconButton onClick={handleClosePreview}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {previewDialog.file && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {previewDialog.file.name}
              </Typography>
              {previewDialog.file.type.startsWith('image/') ? (
                <Box 
                  component="img" 
                  src={previewDialog.file.preview}
                  alt={previewDialog.file.name}
                  sx={{ 
                    width: '100%', 
                    height: 'auto',
                    borderRadius: 2,
                    maxHeight: '500px',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <Box sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  backgroundColor: '#f9fafb',
                  borderRadius: 2
                }}>
                  {getFileIcon(previewDialog.file.type)}
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Preview not available for this file type
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default DocumentUpload
