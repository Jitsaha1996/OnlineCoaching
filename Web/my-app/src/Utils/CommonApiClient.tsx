// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically include token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or from cookies/context
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;
