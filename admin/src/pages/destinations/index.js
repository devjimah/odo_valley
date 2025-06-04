import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import ConfirmModal from "../../components/ConfirmModal";
import ErrorDisplay from "../../components/ErrorDisplay";
import destinationService from "../../services/destinationService";
import { requireAuth } from "../../utils/auth";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoSync, setAutoSync] = useState(true);

  // Use useCallback to memoize the function so it doesn't change on every render
  const fetchDestinations = useCallback(
    async (forceRefresh = false) => {
      try {
        if (!loading) setRefreshing(true);
        setError(null);

        const data = await destinationService.getAll({ forceRefresh });

        setDestinations(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError("Failed to load destinations. Please try again.");
        toast.error(error.message || "Failed to load destinations");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // Set up auto-refresh to check for updates periodically
  useEffect(() => {
    let interval;

    if (autoSync) {
      interval = setInterval(() => {
        fetchDestinations(true);
      }, 30000); // Check every 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoSync, fetchDestinations]);

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await destinationService.delete(deleteModal.item._id);

      toast.success("Destination deleted successfully");

      // Refetch data to ensure UI is in sync with server
      await fetchDestinations(true);

      // Close modal
      setDeleteModal({ isOpen: false, item: null });
    } catch (error) {
      console.error("Error deleting destination:", error);
      toast.error(error.message || "Failed to delete destination");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDestinations(true);
  };

  const handleRetry = () => {
    fetchDestinations(true);
  };

  const toggleAutoSync = () => {
    setAutoSync(!autoSync);
    if (!autoSync) {
      toast.info("Auto-sync enabled");
    } else {
      toast.info("Auto-sync disabled");
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "rating",
      label: "Rating",
      render: (item) => `${item.rating} / 5`,
    },
    {
      key: "featured",
      label: "Featured",
      render: (item) => (item.featured ? "Yes" : "No"),
    },
    {
      key: "image",
      label: "Image",
      render: (item) => (
        <div className="w-12 h-12 relative overflow-hidden rounded">
          <img
            src={
              item.image.startsWith("/uploads")
                ? `http://localhost:5000${item.image}`
                : item.image
            }
            alt={item.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Handle image load errors
              e.target.onerror = null;
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Destinations</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center"
            title="Refresh data"
          >
            <FiRefreshCw
              className={`mr-1 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <Link
            href="/destinations/new"
            className="btn btn-primary flex items-center"
          >
            <FiPlus className="mr-1" /> Add New
          </Link>
        </div>
      </div>

      {lastUpdated && (
        <div className="mb-4 flex justify-between items-center text-sm text-gray-500">
          <div>Last updated: {lastUpdated.toLocaleTimeString()}</div>
          <div className="flex items-center">
            <label
              htmlFor="autoSync"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="autoSync"
                  className="sr-only"
                  checked={autoSync}
                  onChange={toggleAutoSync}
                />
                <div
                  className={`block w-10 h-6 rounded-full transition-colors ${
                    autoSync ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    autoSync ? "transform translate-x-4" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-2">Auto-sync</span>
            </label>
          </div>
        </div>
      )}

      {error ? (
        <ErrorDisplay
          message={error}
          onRetry={handleRetry}
          title="Failed to Load Destinations"
          severity="error"
        />
      ) : (
        <div className="card">
          <DataTable
            columns={columns}
            data={destinations}
            loading={loading}
            basePath="/destinations"
            onDelete={handleDelete}
          />
          {refreshing && !loading && (
            <div className="flex justify-center items-center py-3 bg-blue-50 text-blue-700 rounded-b">
              <FiRefreshCw className="animate-spin mr-2" />
              Refreshing data...
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Destination"
        message={`Are you sure you want to delete "${deleteModal.item?.title}"? This action cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
};

// Add server-side authentication check
export const getServerSideProps = requireAuth;

export default Destinations;
