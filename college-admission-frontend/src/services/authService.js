import api from './api'

export const authService = {
  // Login user
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      })
      
      const { token, username: user, role } = response.data
      
      // Store token and user info in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({ username: user, role }))
      
      return { success: true, user: { username: user, role } }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token')
    return !!token
  },

  // Validate token
  validateToken: async () => {
    try {
      const response = await api.post('/auth/validate')
      return response.data.valid
    } catch (error) {
      return false
    }
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token')
  }
}
