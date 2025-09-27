import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Chip
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Send as SendIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material'

const Analytics = () => {
  // Mock data for analytics
  const branchStats = [
    { name: 'Computer Science', total: 45, approved: 38, pending: 5, rejected: 2 },
    { name: 'Data Science', total: 32, approved: 28, pending: 3, rejected: 1 },
    { name: 'AI/ML', total: 28, approved: 24, pending: 3, rejected: 1 },
    { name: 'Cybersecurity', total: 15, approved: 12, pending: 2, rejected: 1 }
  ]

  const monthlyStats = [
    { month: 'Jan 2024', applications: 45, approved: 38 },
    { month: 'Feb 2024', applications: 52, approved: 44 },
    { month: 'Mar 2024', applications: 38, approved: 32 },
    { month: 'Apr 2024', applications: 41, approved: 35 },
    { month: 'May 2024', applications: 48, approved: 42 },
    { month: 'Jun 2024', applications: 35, approved: 30 }
  ]

  const genderStats = [
    { gender: 'Male', count: 78, percentage: 65 },
    { gender: 'Female', count: 42, percentage: 35 }
  ]

  const statusStats = [
    { status: 'Approved', count: 102, percentage: 85, color: '#10b981' },
    { status: 'Pending', count: 13, percentage: 11, color: '#f59e0b' },
    { status: 'Sent to University', count: 3, percentage: 2.5, color: '#3b82f6' },
    { status: 'Rejected', count: 2, percentage: 1.5, color: '#ef4444' }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircleIcon />
      case 'Pending': return <PendingIcon />
      case 'Sent to University': return <SendIcon />
      case 'Rejected': return <CancelIcon />
      default: return <PendingIcon />
    }
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
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
          Comprehensive insights and statistics for student admissions
        </Typography>
      </Box>

      {/* Key Metrics Cards */}
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
                120
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Applications
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
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                85%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approval Rate
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
                <CalendarIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                2.3
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Avg. Processing Days
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
                <SchoolIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                4
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Active Branches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Branch-wise Statistics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BarChartIcon sx={{ color: '#667eea', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
                Branch-wise Statistics
              </Typography>
            </Box>
            
            {branchStats.map((branch, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {branch.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    {branch.total} students
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(branch.approved / branch.total) * 100}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: 4
                    }
                  }}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip 
                    label={`${branch.approved} Approved`} 
                    size="small" 
                    color="success"
                    variant="outlined"
                  />
                  <Chip 
                    label={`${branch.pending} Pending`} 
                    size="small" 
                    color="warning"
                    variant="outlined"
                  />
                  <Chip 
                    label={`${branch.rejected} Rejected`} 
                    size="small" 
                    color="error"
                    variant="outlined"
                  />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Application Status Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PieChartIcon sx={{ color: '#667eea', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
                Application Status
              </Typography>
            </Box>
            
            {statusStats.map((status, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(status.status)}
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {status.status}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    {status.count} ({status.percentage}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={status.percentage}
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: status.color,
                      borderRadius: 3
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Monthly Trends */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUpIcon sx={{ color: '#667eea', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
                Monthly Trends
              </Typography>
            </Box>
            
            <List>
              {monthlyStats.map((month, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText 
                    primary={month.month}
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {month.applications} applications • {month.approved} approved
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={(month.approved / month.applications) * 100}
                          sx={{ 
                            height: 4, 
                            borderRadius: 2,
                            mt: 1,
                            backgroundColor: '#e5e7eb',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              borderRadius: 2
                            }
                          }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Gender Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssessmentIcon sx={{ color: '#667eea', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
                Gender Distribution
              </Typography>
            </Box>
            
            {genderStats.map((gender, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {gender.gender}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    {gender.count} ({gender.percentage}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={gender.percentage}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      background: index === 0 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                        : 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Analytics
