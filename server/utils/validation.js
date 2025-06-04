/**
 * Server-side validation functions to ensure data consistency
 */

/**
 * Validate destination data
 * @param {Object} data - Destination data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
const validateDestination = (data) => {
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
  if (data.tags) {
    try {
      if (typeof data.tags === "string") {
        const parsedTags = JSON.parse(data.tags);
        if (!Array.isArray(parsedTags)) {
          errors.tags = "Tags must be an array";
        }
      } else if (!Array.isArray(data.tags)) {
        errors.tags = "Tags must be an array";
      }
    } catch (error) {
      errors.tags = "Invalid tags format";
    }
  }

  if (data.highlights) {
    try {
      if (typeof data.highlights === "string") {
        const parsedHighlights = JSON.parse(data.highlights);
        if (!Array.isArray(parsedHighlights)) {
          errors.highlights = "Highlights must be an array";
        }
      } else if (!Array.isArray(data.highlights)) {
        errors.highlights = "Highlights must be an array";
      }
    } catch (error) {
      errors.highlights = "Invalid highlights format";
    }
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
const validateTour = (data) => {
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
  if (data.itinerary) {
    try {
      if (typeof data.itinerary === "string") {
        const parsedItinerary = JSON.parse(data.itinerary);
        if (!Array.isArray(parsedItinerary)) {
          errors.itinerary = "Itinerary must be an array";
        }
      } else if (!Array.isArray(data.itinerary)) {
        errors.itinerary = "Itinerary must be an array";
      }
    } catch (error) {
      errors.itinerary = "Invalid itinerary format";
    }
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
const validateGalleryItem = (data) => {
  const errors = {};

  // Required fields
  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
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
const validateTestimonial = (data) => {
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
const validateContactForm = (data) => {
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

module.exports = {
  validateDestination,
  validateTour,
  validateGalleryItem,
  validateTestimonial,
  validateContactForm,
};
