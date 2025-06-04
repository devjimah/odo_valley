import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiPlus, FiFilter } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../utils/api";
import { requireAuth } from "../../utils/auth";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchGallery();
    fetchCategories();
  }, []);

  const fetchGallery = async (category = "all") => {
    try {
      setLoading(true);
      const url =
        category === "all" ? "/gallery" : `/gallery?category=${category}`;
      const response = await api.get(url);

      if (response.data.success) {
        setGallery(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/gallery/categories");

      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    fetchGallery(category);
  };

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await api.delete(`/gallery/${deleteModal.item._id}`);

      if (response.data.success) {
        toast.success("Gallery image deleted successfully");
        fetchGallery(activeCategory);
        setDeleteModal({ isOpen: false, item: null });
      }
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      toast.error("Failed to delete gallery image");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "alt",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "category",
      label: "Category",
      render: (item) => (
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
          {item.category}
        </span>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (item) => (item.featured ? "Yes" : "No"),
    },
    {
      key: "src",
      label: "Image",
      render: (item) => (
        <div className="w-16 h-16 relative overflow-hidden rounded">
          <img
            src={
              item.src.startsWith("/uploads")
                ? `http://localhost:5000${item.src}`
                : item.src
            }
            alt={item.alt}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gallery</h1>
        <Link href="/gallery/new" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Add New
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <FiFilter className="mr-2 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">
            Filter by Category:
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={gallery}
          loading={loading}
          basePath="/gallery"
          onDelete={handleDelete}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Gallery Image"
        message={`Are you sure you want to delete "${deleteModal.item?.alt}"? This action cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
};

// Add server-side authentication check
export const getServerSideProps = requireAuth;

export default Gallery;
