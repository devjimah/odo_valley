import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../utils/api";
import { requireAuth } from "../../utils/auth";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tours");

      if (response.data.success) {
        setTours(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await api.delete(`/tours/${deleteModal.item._id}`);

      if (response.data.success) {
        toast.success("Tour deleted successfully");
        fetchTours();
        setDeleteModal({ isOpen: false, item: null });
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error("Failed to delete tour");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "days",
      label: "Duration",
      render: (item) => `${item.days} days`,
    },
    {
      key: "price",
      label: "Price",
      render: (item) => `$${item.price}`,
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
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tours</h1>
        <Link href="/tours/new" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Add New
        </Link>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={tours}
          loading={loading}
          basePath="/tours"
          onDelete={handleDelete}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Tour"
        message={`Are you sure you want to delete "${deleteModal.item?.title}"? This action cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
};

// Add server-side authentication check
export const getServerSideProps = requireAuth;

export default Tours;
