import axios from 'axios';

// API Base URL - Spring Boot backend
export const API_BASE_URL = 'http://localhost:8080';

// API Endpoints constants
export const API_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  UPDATE_USER: (id) => `/users/${id}`,
  DELETE_USER: (id) => `/users/${id}`,
  CREATE_USER: '/users/create'  // Use new DTO endpoint
};

// Create main API client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  // Basic authentication credentials
  auth: {
    username: 'admin',
    password: 'admin123'
  }
});

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
