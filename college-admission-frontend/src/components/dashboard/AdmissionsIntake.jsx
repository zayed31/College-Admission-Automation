import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material'
import {
  PersonAdd as PersonAddIcon,
  Upload as UploadIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material'
import DocumentUpload from '../forms/DocumentUpload'

const AdmissionsIntake = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  // Mock data for demonstration
  const mockStudents = [
    {
      id: 'STU001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8900',
      branch: 'Computer Science',
      gender: 'Male',
      status: 'Pending',
      admissionDate: '2024-01-15',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Aadhar Card', 'Passport Photo']
    },
    {
      id: 'STU002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 234-567-8901',
      branch: 'Data Science',
      gender: 'Female',
      status: 'Approved',
      admissionDate: '2024-01-14',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Entrance Score', 'Passport Photo']
    },
    {
      id: 'STU003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 234-567-8902',
      branch: 'AI/ML',
      gender: 'Male',
      status: 'Sent to University',
      admissionDate: '2024-01-13',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Transfer Certificate', 'Passport Photo']
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning'
      case 'Approved': return 'success'
      case 'Sent to University': return 'info'
      case 'Rejected': return 'error'
      default: return 'default'
    }
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedStudent(null)
  }

  const handleUploadComplete = (uploadedFiles) => {
    console.log('Upload completed:', uploadedFiles)
    setUploadDialogOpen(false)
    // Here you would typically save the uploaded files data to your backend
    // and potentially create a new student record
  }

  const handleNewAdmission = () => {
    setUploadDialogOpen(true)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
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
          Admissions Intake
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
          Manage new student applications and admission processes
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={handleNewAdmission}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a5 100%)',
              boxShadow: '0 12px 30px rgba(102, 126, 234, 0.5)'
            }
          }}
        >
          New Admission
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4, width: '100%', justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            width: '100%',
            maxWidth: '300px'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <PersonAddIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                24
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                New Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
            width: '100%',
            maxWidth: '300px'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <SchoolIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                18
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
            width: '100%',
            maxWidth: '300px'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <CalendarIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                6
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            width: '100%',
            maxWidth: '300px'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <UploadIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                12
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Sent to University
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Applications */}
      <Paper sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        width: '100%'
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
            Recent Applications
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
            Latest student applications requiring review
          </Typography>
        </Box>
        
        <Box sx={{ p: 0 }}>
          {mockStudents.map((student, index) => (
            <Box key={student.id}>
              <Box sx={{ 
                p: 3, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                '&:hover': {
                  backgroundColor: '#f9fafb'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: 48,
                    height: 48
                  }}>
                    <PersonIcon />
                  </Avatar>
                  
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                      {student.email} • {student.phone}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip 
                        label={student.branch} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip 
                        label={student.gender} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip 
                        label={student.status} 
                        size="small" 
                        color={getStatusColor(student.status)}
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', mr: 2 }}>
                    {student.admissionDate}
                  </Typography>
                  <IconButton 
                    onClick={() => handleViewStudent(student)}
                    sx={{ 
                      color: '#667eea',
                      '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#6b7280' }}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
              {index < mockStudents.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Student Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 600
        }}>
          Student Details
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedStudent && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: '#374151' }}>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Student ID"
                    value={selectedStudent.id}
                    fullWidth
                    disabled
                    size="small"
                  />
                  <TextField
                    label="Full Name"
                    value={selectedStudent.name}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Email"
                    value={selectedStudent.email}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Phone"
                    value={selectedStudent.phone}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: '#374151' }}>
                  Academic Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Branch</InputLabel>
                    <Select value={selectedStudent.branch} label="Branch">
                      <MenuItem value="Computer Science">Computer Science</MenuItem>
                      <MenuItem value="Data Science">Data Science</MenuItem>
                      <MenuItem value="AI/ML">AI/ML</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select value={selectedStudent.gender} label="Gender">
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select value={selectedStudent.status} label="Status">
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Sent to University">Sent to University</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#374151' }}>
                  Uploaded Documents
                </Typography>
                <Grid container spacing={2}>
                  {selectedStudent.documents.map((doc, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ 
                        border: '1px solid #e5e7eb',
                        borderRadius: 2,
                        '&:hover': { borderColor: '#667eea' }
                      }}>
                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                          <UploadIcon sx={{ color: '#667eea', mb: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {doc}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a5 100%)'
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Document Upload Dialog */}
      <Dialog 
        open={uploadDialogOpen} 
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 3,
            minHeight: '80vh'
          }
        }}
      >
        <DocumentUpload 
          onUploadComplete={handleUploadComplete}
          onClose={() => setUploadDialogOpen(false)}
        />
      </Dialog>
    </Box>
  )
}

export default AdmissionsIntake
