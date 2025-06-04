import { apiService } from "../utils/api";
import syncMonitor from "../utils/syncMonitor";
import { validateDestination } from "../utils/validation";

const RESOURCE_TYPE = "destinations";

/**
 * Service for managing destinations data
 */
const destinationService = {
  /**
   * Get all destinations with optional filtering
   * @param {Object} params - Query parameters
   * @param {boolean} params.forceRefresh - Force data refresh regardless of cache
   * @returns {Promise<Array>} - List of destinations
   */
  async getAll(params = {}) {
    try {
      const { forceRefresh, ...queryParams } = params;

      // Check if we need to refresh data
      if (!forceRefresh && !syncMonitor.needsSync(RESOURCE_TYPE)) {
        // We can use cached data if available
        const cachedData = localStorage.getItem(`${RESOURCE_TYPE}_cache`);
        if (cachedData) {
          return JSON.parse(cachedData);
        }
      }

      const result = await apiService.get("/destinations", queryParams);
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch destinations");
      }

      // Record successful sync
      syncMonitor.recordSync(RESOURCE_TYPE, { clearAllPending: true });

      // Cache the data
      localStorage.setItem(
        `${RESOURCE_TYPE}_cache`,
        JSON.stringify(result.data)
      );

      return result.data;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      throw error;
    }
  },

  /**
   * Get a destination by ID
   * @param {string} id - Destination ID
   * @param {boolean} forceRefresh - Force data refresh regardless of cache
   * @returns {Promise<Object>} - Destination data
   */
  async getById(id, forceRefresh = false) {
    try {
      if (!id) throw new Error("Destination ID is required");

      // Check if we need to refresh data
      if (!forceRefresh && !syncMonitor.needsSync(RESOURCE_TYPE, { id })) {
        // We can use cached data if available
        const cachedData = localStorage.getItem(`${RESOURCE_TYPE}_${id}_cache`);
        if (cachedData) {
          return JSON.parse(cachedData);
        }
      }

      const result = await apiService.get(`/destinations/${id}`);
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch destination");
      }

      // Record successful sync
      syncMonitor.recordSync(RESOURCE_TYPE, { id });

      // Cache the data
      localStorage.setItem(
        `${RESOURCE_TYPE}_${id}_cache`,
        JSON.stringify(result.data)
      );

      return result.data;
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new destination
   * @param {Object} data - Destination data
   * @returns {Promise<Object>} - Created destination
   */
  async create(data) {
    try {
      // Client-side validation
      const validation = validateDestination(data);
      if (!validation.isValid) {
        throw new Error(
          `Validation failed: ${Object.values(validation.errors).join(", ")}`
        );
      }

      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key] instanceof File) {
          formData.append("image", data[key]);
        } else if (key === "tags" || key === "highlights") {
          formData.append(key, JSON.stringify(data[key] || []));
        } else {
          formData.append(key, data[key]);
        }
      });

      const result = await apiService.post("/destinations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to create destination");
      }

      // Record successful creation
      syncMonitor.recordSync(RESOURCE_TYPE, { id: result.data._id });
      syncMonitor.recordSync(RESOURCE_TYPE); // Also mark collection as updated

      // Clear cache for collection to force refresh
      localStorage.removeItem(`${RESOURCE_TYPE}_cache`);

      // Cache the new item
      localStorage.setItem(
        `${RESOURCE_TYPE}_${result.data._id}_cache`,
        JSON.stringify(result.data)
      );

      return result.data;
    } catch (error) {
      console.error("Error creating destination:", error);
      throw error;
    }
  },

  /**
   * Update an existing destination
   * @param {string} id - Destination ID
   * @param {Object} data - Updated destination data
   * @returns {Promise<Object>} - Updated destination
   */
  async update(id, data) {
    try {
      if (!id) throw new Error("Destination ID is required");

      // Client-side validation
      const validation = validateDestination(data);
      if (!validation.isValid) {
        throw new Error(
          `Validation failed: ${Object.values(validation.errors).join(", ")}`
        );
      }

      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key] instanceof File) {
          formData.append("image", data[key]);
        } else if (key === "tags" || key === "highlights") {
          formData.append(key, JSON.stringify(data[key] || []));
        } else {
          formData.append(key, data[key]);
        }
      });

      // Record pending change before API call
      syncMonitor.recordPendingChange(RESOURCE_TYPE, id, "update");

      const result = await apiService.put(`/destinations/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to update destination");
      }

      // Record successful update
      syncMonitor.recordSync(RESOURCE_TYPE, { id });
      syncMonitor.recordSync(RESOURCE_TYPE); // Also mark collection as updated

      // Clear caches to force refresh
      localStorage.removeItem(`${RESOURCE_TYPE}_cache`);
      localStorage.removeItem(`${RESOURCE_TYPE}_${id}_cache`);

      // Cache the updated item
      localStorage.setItem(
        `${RESOURCE_TYPE}_${id}_cache`,
        JSON.stringify(result.data)
      );

      return result.data;
    } catch (error) {
      console.error(`Error updating destination ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a destination
   * @param {string} id - Destination ID
   * @returns {Promise<Object>} - Delete operation result
   */
  async delete(id) {
    try {
      if (!id) throw new Error("Destination ID is required");

      // Record pending change before API call
      syncMonitor.recordPendingChange(RESOURCE_TYPE, id, "delete");

      const result = await apiService.delete(`/destinations/${id}`);

      if (!result.success) {
        throw new Error(result.message || "Failed to delete destination");
      }

      // Record successful deletion
      syncMonitor.recordSync(RESOURCE_TYPE, { id });
      syncMonitor.recordSync(RESOURCE_TYPE); // Also mark collection as updated

      // Clear caches
      localStorage.removeItem(`${RESOURCE_TYPE}_cache`);
      localStorage.removeItem(`${RESOURCE_TYPE}_${id}_cache`);

      return result;
    } catch (error) {
      console.error(`Error deleting destination ${id}:`, error);
      throw error;
    }
  },

  /**
   * Check if any destinations need syncing
   * @returns {boolean} - Whether any destinations need syncing
   */
  needsSync() {
    return syncMonitor.needsSync(RESOURCE_TYPE);
  },
};

export default destinationService;
