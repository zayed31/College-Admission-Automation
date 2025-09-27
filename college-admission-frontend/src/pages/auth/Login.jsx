import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Grid
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  School,
  Person,
  Lock
} from '@mui/icons-material'
import { useAuth } from '../../context/AuthContext'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.username, formData.password)
      
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3, md: 5.75 },
        overflow: 'hidden'
      }}
    >
      <Container component="main" maxWidth="xl" sx={{ width: '100%' }}>
        <Grid container spacing={0} alignItems="center" sx={{ height: '100%', maxHeight: '100vh' }}>
          {/* Left Side - Login Form */}
          <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ 
              width: '100%',
              maxWidth: { xs: '100%', sm: '450px', lg: '500px' },
              px: { xs: 3, sm: 4, lg: 6 }
            }}>
              <Paper 
                elevation={20}
                sx={{ 
                  padding: { xs: 2.5, sm: 3.5, md: 4 },
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  width: '100%'
                }}
              >
                {/* Header with Logo */}
                <Box sx={{ textAlign: 'center', mb: { xs: 1.5, sm: 2 } }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      mb: { xs: 0.5, sm: 1 },
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                    }}
                  >
                    <School sx={{ fontSize: { xs: 24, sm: 30 }, color: 'white' }} />
                  </Box>
                  
                  <Typography 
                    component="h1" 
                    variant="h5"
                    sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.25,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}
                  >
                    EduPortal
                  </Typography>
                  
                  <Typography 
                    variant="subtitle1"
                    sx={{ 
                      color: '#6b7280',
                      fontWeight: 400,
                      mb: 0.25,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    College Admission System
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#9ca3af',
                      fontSize: { xs: '0.75rem', sm: '0.8rem' }
                    }}
                  >
                    Admin Dashboard Access
                  </Typography>
                </Box>

                <Divider sx={{ mb: { xs: 1.5, sm: 2 }, opacity: 0.1 }} />
                
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 },
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        color: '#ef4444'
                      }
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: '#9ca3af' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: { xs: 1, sm: 1.5 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#667eea'
                          }
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#667eea',
                            borderWidth: 2
                          }
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#667eea'
                      }
                    }}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#9ca3af' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            sx={{ color: '#9ca3af' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: { xs: 1.5, sm: 2 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#667eea'
                          }
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#667eea',
                            borderWidth: 2
                          }
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#667eea'
                      }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: { xs: 1, sm: 1.5 },
                      mb: { xs: 1.5, sm: 2 },
                      py: { xs: 1, sm: 1.2 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a5 100%)',
                        boxShadow: '0 12px 30px rgba(102, 126, 234, 0.5)',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        background: '#e5e7eb',
                        boxShadow: 'none',
                        transform: 'none'
                      }
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Signing In...</span>
                      </Box>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </Button>
                </Box>

                {/* Demo Credentials */}
                <Paper
                  elevation={0}
                  sx={{ 
                    mt: { xs: 1.5, sm: 2 },
                    p: { xs: 1.5, sm: 2 },
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    border: '1px solid #e2e8f0',
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#475569',
                        fontWeight: 600,
                        mb: { xs: 0.75, sm: 1 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                      />
                      Demo Credentials
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.75, sm: 1 },
                        backgroundColor: 'white',
                        borderRadius: 1,
                        border: '1px solid #e2e8f0'
                      }}>
                        <Person sx={{ fontSize: { xs: 14, sm: 16 }, color: '#667eea' }} />
                        <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          admin
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.75, sm: 1 },
                        backgroundColor: 'white',
                        borderRadius: 1,
                        border: '1px solid #e2e8f0'
                      }}>
                        <Lock sx={{ fontSize: { xs: 14, sm: 16 }, color: '#667eea' }} />
                        <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          admin123
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                {/* Footer */}
                <Box sx={{ textAlign: 'center', mt: { xs: 1.5, sm: 2 } }}>
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                    Secure access to your institution's admission portal
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right Side - Lottie Animation */}
          <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                maxHeight: '100vh',
                padding: 0
              }}
            >
              <DotLottieReact
                src="https://lottie.host/8c0d9e13-c824-4459-9dc4-67b17707b325/PmOvQYYSiA.lottie"
                loop
                autoplay
                style={{ 
                  width: '100%', 
                  height: '100%',
                  maxWidth: '800px',
                  maxHeight: '800px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login