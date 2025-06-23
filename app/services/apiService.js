import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Configure axios instance with defaults
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Add request interceptor for standardization
 */
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching for GET requests
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

/**
 * Add response interceptor for error handling
 */
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

    // Retry once on network error
    if (error.message === "Network Error" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        return await api(originalRequest);
      } catch (retryError) {
        console.error("Retry failed:", retryError);
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Main API service for the website
 */
const apiService = {
  /**
   * Get destinations with optional filtering
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of destinations
   */
  async getDestinations(params = {}) {
    try {
      const response = await api.get("/destinations", { params });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch destinations"
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      throw error;
    }
  },

  /**
   * Get tours with optional filtering
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of tours
   */
  async getTours(params = {}) {
    try {
      const response = await api.get("/tours", { params });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch tours");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching tours:", error);
      throw error;
    }
  },

  /**
   * Get testimonials with optional filtering
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of testimonials
   */
  async getTestimonials(params = {}) {
    try {
      const response = await api.get("/testimonials", { params });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch testimonials"
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }
  },

  /**
   * Get gallery images with optional filtering
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of gallery images
   */
  async getGallery(params = {}) {
    try {
      const response = await api.get("/gallery", { params });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch gallery");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching gallery:", error);
      throw error;
    }
  },

  /**
   * Get hero cards for carousel
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of hero cards
   */
  async getHeroCards(params = {}) {
    try {
      const response = await api.get("/hero-cards", { params });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch hero cards");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching hero cards:", error);
      throw error;
    }
  },

  /**
   * Submit contact form
   * @param {Object} data - Form data
   * @returns {Promise<Object>} Response data
   */
  async submitContact(data) {
    try {
      const response = await api.post("/contact", data);

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to submit contact form"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  },
};

export default apiService;
