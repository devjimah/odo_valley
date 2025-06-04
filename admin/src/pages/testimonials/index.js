import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../utils/api";
import { requireAuth } from "../../utils/auth";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get("/testimonials");

      if (response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials");
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
      const response = await api.delete(
        `/testimonials/${deleteModal.item._id}`
      );

      if (response.data.success) {
        toast.success("Testimonial deleted successfully");
        fetchTestimonials();
        setDeleteModal({ isOpen: false, item: null });
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      className: "font-medium",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "rating",
      label: "Rating",
      render: (item) => (
        <div className="flex items-center">
          <span className="text-amber-500">★</span>
          <span className="ml-1">{item.rating} / 5</span>
        </div>
      ),
    },
    {
      key: "comment",
      label: "Comment",
      render: (item) => <div className="max-w-xs truncate">{item.comment}</div>,
    },
    {
      key: "avatar",
      label: "Avatar",
      render: (item) =>
        item.avatar ? (
          <div className="w-10 h-10 relative overflow-hidden rounded-full">
            <img
              src={
                item.avatar.startsWith("/uploads")
                  ? `http://localhost:5000${item.avatar}`
                  : item.avatar
              }
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 font-medium">
              {item.name.charAt(0)}
            </span>
          </div>
        ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Testimonials</h1>
        <Link
          href="/testimonials/new"
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-1" /> Add New
        </Link>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={testimonials}
          loading={loading}
          basePath="/testimonials"
          onDelete={handleDelete}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteModal.item?.name}"? This action cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
};

// Add server-side authentication check
export const getServerSideProps = requireAuth;

export default Testimonials;
