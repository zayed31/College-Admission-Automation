import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material'
import {
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

// Import section components (we'll create these next)
import AdmissionsIntake from '../components/dashboard/AdmissionsIntake'
import StudentDashboard from '../components/dashboard/StudentDashboard'
import Analytics from '../components/dashboard/Analytics'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleProfileMenuClose()
    logout()
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <AdmissionsIntake />
      case 1:
        return <StudentDashboard />
      case 2:
        return <Analytics />
      default:
        return <AdmissionsIntake />
    }
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh', 
      backgroundColor: '#f5f7fa', 
      width: '100vw',
      maxWidth: '100%',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <SchoolIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              EduPortal
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  textTransform: 'none',
                  minWidth: 120,
                  '&.Mui-selected': {
                    color: 'white',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white',
                  height: 3,
                  borderRadius: '2px 2px 0 0'
                }
              }}
            >
              <Tab 
                icon={<PersonAddIcon />} 
                label="Admissions Intake" 
                iconPosition="start"
              />
              <Tab 
                icon={<DashboardIcon />} 
                label="Dashboard" 
                iconPosition="start"
              />
              <Tab 
                icon={<AnalyticsIcon />} 
                label="Analytics" 
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* User Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Welcome, {user?.username}
            </Typography>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, px: 2, pb: 1 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'none',
                minWidth: 'auto',
                px: 1,
                '&.Mui-selected': {
                  color: 'white',
                  fontWeight: 600
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
                height: 2
              }
            }}
          >
            <Tab 
              icon={<PersonAddIcon />} 
              label="Intake" 
              iconPosition="top"
            />
            <Tab 
              icon={<DashboardIcon />} 
              label="Dashboard" 
              iconPosition="top"
            />
            <Tab 
              icon={<AnalyticsIcon />} 
              label="Analytics" 
              iconPosition="top"
            />
          </Tabs>
        </Box>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151' }}>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Admin User
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <AccountCircleIcon sx={{ mr: 2, color: '#6b7280' }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <SettingsIcon sx={{ mr: 2, color: '#6b7280' }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#dc2626' }}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Main Content Area */}
      <Box sx={{ width: '100%', py: 3, px: 3 }}>
        {renderTabContent()}
      </Box>
    </Box>
  )
}

export default Dashboard