import React from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid
} from '@mui/material'
import {
  PersonAdd as PersonAddIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon
} from '@mui/icons-material'

const Dashboard = () => {
  const { user, logout } = useAuth()

  const stats = [
    { title: 'Total Students', value: '1,234', icon: <PeopleIcon />, color: '#1976d2' },
    { title: 'New Applications', value: '45', icon: <PersonAddIcon />, color: '#dc004e' },
    { title: 'Approved', value: '1,189', icon: <CheckCircleIcon />, color: '#2e7d32' },
    { title: 'Pending', value: '45', icon: <PendingIcon />, color: '#ed6c02' },
  ]

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Welcome, {user?.username}!
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: stat.color,
                color: 'white',
                minHeight: 150,
                justifyContent: 'center'
              }}
            >
              <Box sx={{ fontSize: 48, mb: 2 }}>{stat.icon}</Box>
              <Typography variant="h3" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="h6" align="center">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" startIcon={<PersonAddIcon />}>
            New Admission
          </Button>
          <Button variant="outlined" startIcon={<PeopleIcon />}>
            View Students
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Dashboard
