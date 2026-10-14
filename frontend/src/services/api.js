// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Your Laravel backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const register = (userData) => api.post('/register', userData);
export const login = (credentials) => api.post('/login', credentials);
export const logout = () => api.post('/logout');

export default api;
