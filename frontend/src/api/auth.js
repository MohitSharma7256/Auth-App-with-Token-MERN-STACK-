import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is important for sending cookies with cross-origin requests
  timeout: 10000, // 10 seconds timeout
});

// Set withCredentials to true for all requests
api.defaults.withCredentials = true;

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Sending request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config.url,
        data: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (data) => {
  try {
    const response = await api.post('/register', data);
    console.log('Registration successful:', response.data);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    console.log('Attempting login with data:', { email: data.email });
    const response = await api.post('/login', data);
    console.log('Login successful:', response.data);
    return response;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};