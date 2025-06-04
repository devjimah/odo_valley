/**
 * Validation utility functions for ensuring data consistency
 */

/**
 * Validate destination data
 * @param {Object} data - Destination data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateDestination = (data) => {
  const errors = {};

  // Required fields
  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required";
  }

  if (!data.price || data.price.trim() === "") {
    errors.price = "Price is required";
  }

  // Numeric validation
  if (data.rating !== undefined) {
    const rating = parseFloat(data.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = "Rating must be a number between 0 and 5";
    }
  }

  // Validate tags and highlights as arrays
  if (data.tags && !Array.isArray(data.tags)) {
    errors.tags = "Tags must be an array";
  }

  if (data.highlights && !Array.isArray(data.highlights)) {
    errors.highlights = "Highlights must be an array";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate tour data
 * @param {Object} data - Tour data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateTour = (data) => {
  const errors = {};

  // Required fields
  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required";
  }

  if (!data.price || data.price.trim() === "") {
    errors.price = "Price is required";
  }

  if (!data.duration || data.duration.trim() === "") {
    errors.duration = "Duration is required";
  }

  // Validate itinerary as array
  if (data.itinerary && !Array.isArray(data.itinerary)) {
    errors.itinerary = "Itinerary must be an array";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate gallery item data
 * @param {Object} data - Gallery item data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateGalleryItem = (data) => {
  const errors = {};

  // Required fields
  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  // Image is required for new items, but may not be present when updating
  if (data.isNew && !data.image) {
    errors.image = "Image is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate testimonial data
 * @param {Object} data - Testimonial data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateTestimonial = (data) => {
  const errors = {};

  // Required fields
  if (!data.author || data.author.trim() === "") {
    errors.author = "Author name is required";
  }

  if (!data.content || data.content.trim() === "") {
    errors.content = "Testimonial content is required";
  }

  // Rating validation
  if (data.rating !== undefined) {
    const rating = parseFloat(data.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = "Rating must be a number between 0 and 5";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate contact form data
 * @param {Object} data - Contact form data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateContactForm = (data) => {
  const errors = {};

  // Required fields
  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (!data.message || data.message.trim() === "") {
    errors.message = "Message is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
