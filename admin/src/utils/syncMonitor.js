/**
 * Data synchronization monitoring utility
 * This helps track when data was last synchronized with the server
 * and provides methods to check if data needs to be refreshed
 */

// Store last sync timestamps by resource type
const syncTimestamps = {
  destinations: null,
  tours: null,
  gallery: null,
  testimonials: null,
};

// Store pending changes that need to be synced
const pendingChanges = {
  destinations: {},
  tours: {},
  gallery: {},
  testimonials: {},
};

// Default sync expiration (30 minutes)
const DEFAULT_SYNC_EXPIRATION = 30 * 60 * 1000;

/**
 * Record a successful sync operation
 * @param {string} resourceType - Type of resource (destinations, tours, etc.)
 * @param {Object} options - Additional options
 * @returns {void}
 */
const recordSync = (resourceType, options = {}) => {
  if (!syncTimestamps[resourceType]) {
    syncTimestamps[resourceType] = {};
  }

  const timestamp = Date.now();

  // Record specific resource ID if provided, otherwise record collection sync
  if (options.id) {
    syncTimestamps[resourceType][options.id] = timestamp;
  } else {
    syncTimestamps[resourceType].collection = timestamp;
  }

  // Clear any pending changes for this resource
  if (options.id) {
    delete pendingChanges[resourceType][options.id];
  } else if (options.clearAllPending) {
    pendingChanges[resourceType] = {};
  }

  // Log sync event if in development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Sync] ${resourceType}${
        options.id ? ` ID:${options.id}` : ""
      } at ${new Date(timestamp).toLocaleTimeString()}`
    );
  }
};

/**
 * Check if a resource needs syncing based on last sync time
 * @param {string} resourceType - Type of resource
 * @param {Object} options - Additional options
 * @param {string} options.id - Specific resource ID to check
 * @param {number} options.expirationMs - Custom expiration time in milliseconds
 * @returns {boolean} - Whether the resource needs syncing
 */
const needsSync = (resourceType, options = {}) => {
  const { id, expirationMs = DEFAULT_SYNC_EXPIRATION } = options;

  if (!syncTimestamps[resourceType]) {
    return true;
  }

  const now = Date.now();
  let lastSync;

  // Check specific resource or collection
  if (id) {
    lastSync = syncTimestamps[resourceType][id];
  } else {
    lastSync = syncTimestamps[resourceType].collection;
  }

  // If never synced or sync expired, needs sync
  if (!lastSync || now - lastSync > expirationMs) {
    return true;
  }

  // Check if there are pending changes
  if (id && pendingChanges[resourceType][id]) {
    return true;
  }

  // If checking collection and any pending changes exist
  if (!id && Object.keys(pendingChanges[resourceType]).length > 0) {
    return true;
  }

  return false;
};

/**
 * Record a pending change that needs to be synced
 * @param {string} resourceType - Type of resource
 * @param {string} id - Resource ID
 * @param {string} changeType - Type of change (create, update, delete)
 * @returns {void}
 */
const recordPendingChange = (resourceType, id, changeType) => {
  if (!pendingChanges[resourceType]) {
    pendingChanges[resourceType] = {};
  }

  pendingChanges[resourceType][id] = {
    changeType,
    timestamp: Date.now(),
  };

  // Log pending change if in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Pending Change] ${resourceType} ID:${id} - ${changeType}`);
  }
};

/**
 * Get all resources that need syncing
 * @returns {Object} - Map of resource types to arrays of IDs that need syncing
 */
const getAllPendingChanges = () => {
  const pending = {};

  Object.keys(pendingChanges).forEach((resourceType) => {
    const resourceChanges = Object.keys(pendingChanges[resourceType]);
    if (resourceChanges.length > 0) {
      pending[resourceType] = resourceChanges;
    }
  });

  return pending;
};

/**
 * Get the last sync time for a resource
 * @param {string} resourceType - Type of resource
 * @param {Object} options - Additional options
 * @returns {number|null} - Timestamp of last sync or null if never synced
 */
const getLastSyncTime = (resourceType, options = {}) => {
  const { id } = options;

  if (!syncTimestamps[resourceType]) {
    return null;
  }

  if (id) {
    return syncTimestamps[resourceType][id] || null;
  }

  return syncTimestamps[resourceType].collection || null;
};

export default {
  recordSync,
  needsSync,
  recordPendingChange,
  getAllPendingChanges,
  getLastSyncTime,
};
