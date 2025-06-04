import React from "react";
import Link from "next/link";

/**
 * Reusable error display component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Function to call when retry button is clicked
 * @param {string} props.backLink - URL to navigate back to (optional)
 * @param {string} props.backText - Text for back link (default: "Back")
 * @param {string} props.retryText - Text for retry button (default: "Try Again")
 * @param {string} props.title - Error title (default: "Error")
 * @param {string} props.severity - Error severity (error, warning, info) - default: error
 */
const ErrorDisplay = ({
  message,
  onRetry,
  backLink,
  backText = "Back",
  retryText = "Try Again",
  title = "Error",
  severity = "error",
}) => {
  // Determine color scheme based on severity
  const colorScheme = {
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      titleColor: "text-red-700",
      buttonBg: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      titleColor: "text-yellow-700",
      buttonBg: "bg-yellow-600 hover:bg-yellow-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      titleColor: "text-blue-700",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
    },
  }[severity];

  return (
    <div
      className={`${colorScheme.bg} border ${colorScheme.border} rounded-md p-6 my-4`}
    >
      {title && (
        <h2 className={`text-xl font-semibold ${colorScheme.titleColor} mb-2`}>
          {title}
        </h2>
      )}
      {message && <p className={colorScheme.text}>{message}</p>}

      <div className="mt-4 flex flex-wrap gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className={`btn ${colorScheme.buttonBg} text-white`}
          >
            {retryText}
          </button>
        )}
        {backLink && (
          <Link
            href={backLink}
            className="btn bg-gray-600 hover:bg-gray-700 text-white"
          >
            {backText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
