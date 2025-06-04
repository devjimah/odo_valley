import axios from "axios";
import Cookies from "js-cookie";
import { getAuthToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor to add auth token and handle request standardization
api.interceptors.request.use(
  (config) => {
    // Add authentication token to requests
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching issues
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: new Date().getTime(),
      };
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to standardize error handling and token management
api.interceptors.response.use(
  (response) => {
    // Validate response structure
    if (!response.data) {
      console.warn("API response missing data property");
      return Promise.reject(new Error("Invalid API response format"));
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle expired tokens or other auth errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      Cookies.remove("auth_token");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Retry the request once if network error
    if (error.message === "Network Error" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        return await api(originalRequest);
      } catch (retryError) {
        console.error("Retry failed:", retryError);
        return Promise.reject(retryError);
      }
    }

    // Handle server errors
    if (error.response && error.response.status >= 500) {
      console.error("Server error:", error.response.data);
      return Promise.reject(new Error("Server error, please try again later"));
    }

    return Promise.reject(error);
  }
);

// Service layer methods for common operations
export const apiService = {
  // Generic GET with error handling and caching options
  async get(endpoint, params = {}, options = {}) {
    try {
      const response = await api.get(endpoint, { params, ...options });
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error);
      throw error;
    }
  },

  // Generic POST with error handling
  async post(endpoint, data = {}, options = {}) {
    try {
      const response = await api.post(endpoint, data, options);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error);
      throw error;
    }
  },

  // Generic PUT with error handling
  async put(endpoint, data = {}, options = {}) {
    try {
      const response = await api.put(endpoint, data, options);
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} error:`, error);
      throw error;
    }
  },

  // Generic DELETE with error handling
  async delete(endpoint, options = {}) {
    try {
      const response = await api.delete(endpoint, options);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error);
      throw error;
    }
  },
};

export default api;
