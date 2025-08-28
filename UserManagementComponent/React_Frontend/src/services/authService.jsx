import axios from 'axios';

// DotNet API Base URL
const DOTNET_API_BASE_URL = 'https://localhost:7231/api/Auth';

// JWT decode helper function
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Create axios instance for auth requests
const authClient = axios.create({
  baseURL: DOTNET_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add response interceptor for error handling
authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Auth API Error:', error);
    if (error.response) {
      throw new Error(`HTTP ${error.response.status}: ${error.response.data || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error - please check your connection to DotNet API');
    } else {
      throw new Error(error.message || 'An unexpected authentication error occurred');
    }
  }
);

// Auth Service
export const authService = {
  
  // Login function
  login: async (loginData) => {
    try {
      console.log('Attempting login with:', { username: loginData.username });
      
      const response = await authClient.post('/Login', {
        username: loginData.username,
        password: loginData.password
      });

      if (response.status === 200) {
        const { userData, token, expiration } = response.data;
        
        // Extract role from JWT token
        const tokenPayload = decodeJWT(token);
        let userRole = 'Client'; // Default role
        
        if (tokenPayload) {
          // Check for role in different possible claim names
          userRole = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
                    tokenPayload.role ||
                    tokenPayload.roles ||
                    'Client';
          
          console.log('JWT Payload:', tokenPayload);
          console.log('Extracted role:', userRole);
        }
        
        // Add role to userData
        const enrichedUserData = {
          ...userData,
          role: userRole
        };
        
        // Store auth data in localStorage
        localStorage.setItem('access-token', token);
        localStorage.setItem('user-data', JSON.stringify(enrichedUserData));
        localStorage.setItem('expiration', expiration);
        
        console.log('Login successful:', { 
          username: enrichedUserData.userName, 
          role: enrichedUserData.role 
        });
        
        return {
          success: true,
          userData: enrichedUserData,
          token,
          expiration
        };
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  },

  // Register function (optional - reuse existing pattern)
  register: async (registerData) => {
    try {
      console.log('Attempting registration with:', { username: registerData.username, email: registerData.email });
      
      const response = await authClient.post('/Register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        address: registerData.address,
        gender: registerData.gender,
        role: registerData.role || 'Client'
      });

      if (response.status === 201 || response.status === 200) {
        const { userData, token, expiration } = response.data;
        
        // Store auth data in localStorage
        localStorage.setItem('access-token', token);
        localStorage.setItem('user-data', JSON.stringify(userData));
        localStorage.setItem('expiration', expiration);
        
        console.log('Registration successful:', { username: userData.userName });
        return {
          success: true,
          userData,
          token,
          expiration
        };
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    try {
      const token = localStorage.getItem('access-token');
      
      if (token) {
        // Call logout endpoint with token
        await authClient.get('/Logout', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Clear localStorage regardless of API call result
      localStorage.removeItem('access-token');
      localStorage.removeItem('user-data');
      localStorage.removeItem('expiration');
      
      console.log('Logout successful');
      return { success: true };
    } catch (error) {
      // Still clear localStorage even if API call fails
      localStorage.removeItem('access-token');
      localStorage.removeItem('user-data');
      localStorage.removeItem('expiration');
      
      console.error('Logout error (but localStorage cleared):', error.message);
      return { success: true }; // Consider logout successful if localStorage is cleared
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('access-token');
    const expiration = localStorage.getItem('expiration');
    
    if (!token || !expiration) {
      return false;
    }
    
    // Check if token is expired
    const expirationDate = new Date(expiration);
    const now = new Date();
    
    if (now >= expirationDate) {
      // Token expired, clean up
      localStorage.removeItem('access-token');
      localStorage.removeItem('user-data');
      localStorage.removeItem('expiration');
      return false;
    }
    
    return true;
  },

  // Check if user has admin role
  isAdmin: () => {
    try {
      // First try to get role from stored user data
      const userData = localStorage.getItem('user-data');
      if (userData) {
        const user = JSON.parse(userData);
        if (user && user.role) {
          return user.role.toLowerCase() === 'admin';
        }
      }
      
      // Fallback: Extract role from JWT token
      const roleFromToken = authService.getRoleFromToken();
      return roleFromToken && roleFromToken.toLowerCase() === 'admin';
      
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  },

  // Check if user has specific role
  hasRole: (requiredRole) => {
    try {
      // First try to get role from stored user data
      const userData = localStorage.getItem('user-data');
      if (userData) {
        const user = JSON.parse(userData);
        if (user && user.role) {
          return user.role.toLowerCase() === requiredRole.toLowerCase();
        }
      }
      
      // Fallback: Extract role from JWT token
      const roleFromToken = authService.getRoleFromToken();
      return roleFromToken && roleFromToken.toLowerCase() === requiredRole.toLowerCase();
      
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  },

  // Get current user data
  getCurrentUser: () => {
    const userData = localStorage.getItem('user-data');
    return userData ? JSON.parse(userData) : null;
  },

  // Get current token
  getToken: () => {
    return localStorage.getItem('access-token');
  },

  // Get role from JWT token (fallback method)
  getRoleFromToken: () => {
    try {
      const token = localStorage.getItem('access-token');
      if (!token) return null;
      
      const tokenPayload = decodeJWT(token);
      if (!tokenPayload) return null;
      
      // Check for role in different possible claim names
      return tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
             tokenPayload.role ||
             tokenPayload.roles ||
             'Client';
    } catch (error) {
      console.error('Error getting role from token:', error);
      return 'Client';
    }
  },

  // Test admin role (for role-based access)
  testAdmin: async () => {
    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await authClient.get('/testAdmin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.status === 200;
    } catch (error) {
      console.error('Admin test failed:', error.message);
      return false;
    }
  },

  // Debug function to inspect JWT token content
  debugToken: () => {
    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        console.log('No token found');
        return null;
      }
      
      const payload = decodeJWT(token);
      console.log('JWT Token Payload:', payload);
      console.log('Available claims:', Object.keys(payload || {}));
      
      const role = authService.getRoleFromToken();
      console.log('Extracted role:', role);
      
      return payload;
    } catch (error) {
      console.error('Error debugging token:', error);
      return null;
    }
  }
};

export default authService;
