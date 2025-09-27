import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Send as SendIcon
} from '@mui/icons-material'

const StudentDashboard = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [branchFilter, setBranchFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Mock data for demonstration
  const mockStudents = [
    {
      id: 'STU001',
      name: 'John Doe',
      branch: 'Computer Science',
      gender: 'Male',
      status: 'Approved',
      admissionDate: '2024-01-15',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8900',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Aadhar Card', 'Passport Photo']
    },
    {
      id: 'STU002',
      name: 'Jane Smith',
      branch: 'Data Science',
      gender: 'Female',
      status: 'Pending',
      admissionDate: '2024-01-14',
      email: 'jane.smith@email.com',
      phone: '+1 234-567-8901',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Entrance Score', 'Passport Photo']
    },
    {
      id: 'STU003',
      name: 'Mike Johnson',
      branch: 'AI/ML',
      gender: 'Male',
      status: 'Sent to University',
      admissionDate: '2024-01-13',
      email: 'mike.johnson@email.com',
      phone: '+1 234-567-8902',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Transfer Certificate', 'Passport Photo']
    },
    {
      id: 'STU004',
      name: 'Sarah Wilson',
      branch: 'Computer Science',
      gender: 'Female',
      status: 'Rejected',
      admissionDate: '2024-01-12',
      email: 'sarah.wilson@email.com',
      phone: '+1 234-567-8903',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Aadhar Card', 'Passport Photo']
    },
    {
      id: 'STU005',
      name: 'David Brown',
      branch: 'Data Science',
      gender: 'Male',
      status: 'Approved',
      admissionDate: '2024-01-11',
      email: 'david.brown@email.com',
      phone: '+1 234-567-8904',
      documents: ['Marksheet 10th', 'Marksheet 12th', 'Entrance Score', 'Passport Photo']
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <PendingIcon />
      case 'Approved': return <CheckCircleIcon />
      case 'Sent to University': return <SendIcon />
      case 'Rejected': return <CancelIcon />
      default: return <PendingIcon />
    }
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setDrawerOpen(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Filter and sort students
  const filteredStudents = mockStudents
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBranch = !branchFilter || student.branch === branchFilter
      const matchesGender = !genderFilter || student.gender === genderFilter
      const matchesStatus = !statusFilter || student.status === statusFilter
      
      return matchesSearch && matchesBranch && matchesGender && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'date':
          return new Date(b.admissionDate) - new Date(a.admissionDate)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

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
          Student Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
          Manage and track all student admissions and records
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <PeopleIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {mockStudents.length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <CheckCircleIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {mockStudents.filter(s => s.status === 'Approved').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <PendingIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {mockStudents.filter(s => s.status === 'Pending').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                width: 56, 
                height: 56, 
                mx: 'auto', 
                mb: 2 
              }}>
                <SendIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {mockStudents.filter(s => s.status === 'Sent to University').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Sent to University
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Bar */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' 
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Branch</InputLabel>
              <Select
                value={branchFilter}
                label="Branch"
                onChange={(e) => setBranchFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">All Branches</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="AI/ML">AI/ML</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                value={genderFilter}
                label="Gender"
                onChange={(e) => setGenderFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Sent to University">Sent to University</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="date">Date (Newest)</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Student Records Table */}
      <Paper sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f9fafb' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Student ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Branch</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Admission Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow 
                  key={student.id}
                  sx={{ 
                    '&:hover': { backgroundColor: '#f9fafb' },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell sx={{ fontWeight: 500, color: '#667eea' }}>
                    {student.id}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        width: 32,
                        height: 32
                      }}>
                        <PersonIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {student.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          {student.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={student.branch} 
                      size="small" 
                      variant="outlined"
                      icon={<SchoolIcon />}
                    />
                  </TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>
                    <Chip 
                      label={student.status} 
                      size="small" 
                      color={getStatusColor(student.status)}
                      icon={getStatusIcon(student.status)}
                    />
                  </TableCell>
                  <TableCell>{student.admissionDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleViewStudent(student)}
                        sx={{ 
                          color: '#667eea',
                          '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        sx={{ color: '#6b7280' }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Student Details Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 400, p: 0 }
        }}
      >
        {selectedStudent && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Student Details
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Avatar sx={{ 
                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2
              }}>
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 600, mb: 1 }}>
                {selectedStudent.name}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', color: '#6b7280', mb: 2 }}>
                {selectedStudent.id}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chip 
                  label={selectedStudent.status} 
                  color={getStatusColor(selectedStudent.status)}
                  icon={getStatusIcon(selectedStudent.status)}
                />
              </Box>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: '#667eea' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Branch" 
                  secondary={selectedStudent.branch}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon sx={{ color: '#667eea' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Gender" 
                  secondary={selectedStudent.gender}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon sx={{ color: '#667eea' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Admission Date" 
                  secondary={selectedStudent.admissionDate}
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Email" 
                  secondary={selectedStudent.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Phone" 
                  secondary={selectedStudent.phone}
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Uploaded Documents
            </Typography>
            <List>
              {selectedStudent.documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={doc}
                    secondary="Click to preview"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}

export default StudentDashboard
