import axios from 'axios';

// API Base URLs from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'; // Spring Boot backend
export const DOTNET_API_BASE_URL = import.meta.env.VITE_DOTNET_API_BASE_URL || 'https://localhost:7231/api'; // DotNet backend

// API Endpoints constants
export const API_ENDPOINTS = {
  // Spring Boot User Management endpoints
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  UPDATE_USER: (id) => `/users/${id}`,
  DELETE_USER: (id) => `/users/${id}`,
  CREATE_USER: '/users/create',  // Use new DTO endpoint
  
  // DotNet Authentication endpoints
  AUTH: {
    LOGIN: `${DOTNET_API_BASE_URL}/Auth/Login`,
    REGISTER: `${DOTNET_API_BASE_URL}/Auth/Register`,
    LOGOUT: `${DOTNET_API_BASE_URL}/Auth/Logout`,
    TEST_ADMIN: `${DOTNET_API_BASE_URL}/Auth/testAdmin`,
    TEST_CLIENT: `${DOTNET_API_BASE_URL}/Auth/testClient`
  }
};

// Create main API client (for Spring Boot - User Management)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  // Basic authentication credentials for Spring Boot
  auth: {
    username: 'admin',
    password: 'admin123'
  }
});

// Add request interceptor to include JWT token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      throw new Error(`HTTP ${error.response.status}: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

// Simple API request handler
export const apiRequest = {
  get: async (endpoint) => {
    return apiClient.get(endpoint);
  },

  post: async (endpoint, data) => {
    return apiClient.post(endpoint, data);
  },

  put: async (endpoint, data) => {
    return apiClient.put(endpoint, data);
  },

  delete: async (endpoint) => {
    return apiClient.delete(endpoint);
  },
};

export default apiClient;
