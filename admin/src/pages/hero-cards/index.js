import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import ErrorDisplay from "../../components/ErrorDisplay";
import Spinner from "../../components/Spinner";
import ConfirmModal from "../../components/ConfirmModal";
import { api } from "../../utils/api";

export default function HeroCards() {
  const router = useRouter();
  const [heroCards, setHeroCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
    title: "",
  });

  useEffect(() => {
    fetchHeroCards();
  }, []);

  const fetchHeroCards = async () => {
    try {
      setLoading(true);
      const response = await api.get("/hero-cards/admin");
      setHeroCards(response.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch hero cards");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/hero-cards/${id}`);
      setHeroCards(heroCards.filter((card) => card._id !== id));
      setDeleteModal({ show: false, id: null, title: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete hero card");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await api.put(`/hero-cards/${id}/toggle`);
      setHeroCards(
        heroCards.map((card) => (card._id === id ? response.data.data : card))
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to toggle hero card status"
      );
    }
  };

  const columns = [
    {
      key: "order",
      label: "Order",
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          #{value}
        </span>
      ),
    },
    {
      key: "image",
      label: "Image",
      render: (value) => (
        <img
          src={value}
          alt="Hero card"
          className="w-16 h-12 object-cover rounded-lg"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/64x48/e5e7eb/9ca3af?text=No+Image";
          }}
        />
      ),
    },
    {
      key: "icon",
      label: "Icon",
      render: (value) => <span className="text-2xl">{value}</span>,
    },
    {
      key: "title",
      label: "Title",
      render: (value) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (value) => (
        <div className="text-sm text-gray-500 max-w-xs truncate">{value}</div>
      ),
    },
    {
      key: "stat",
      label: "Stat",
      render: (value, row) => (
        <div className="text-center">
          <div className="font-bold text-lg">{value}</div>
          <div className="text-xs text-gray-500">{row.statLabel}</div>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value, row) => (
        <button
          onClick={() => handleToggleStatus(row._id)}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          } transition-colors`}
        >
          {value ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/hero-cards/edit/${row._id}`)}
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() =>
              setDeleteModal({
                show: true,
                id: row._id,
                title: row.title,
              })
            }
            className="text-red-600 hover:text-red-900 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hero Cards</h1>
            <p className="text-gray-600">
              Manage carousel cards displayed on the homepage
            </p>
          </div>
          <button
            onClick={() => router.push("/hero-cards/new")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add Hero Card
          </button>
        </div>

        {error && <ErrorDisplay message={error} />}

        <div className="bg-white shadow rounded-lg">
          <DataTable
            data={heroCards}
            columns={columns}
            emptyMessage="No hero cards found. Create your first hero card to get started."
          />
        </div>

        <ConfirmModal
          isOpen={deleteModal.show}
          onClose={() => setDeleteModal({ show: false, id: null, title: "" })}
          onConfirm={() => handleDelete(deleteModal.id)}
          title="Delete Hero Card"
          message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
          confirmText="Delete"
          confirmStyle="danger"
        />
      </div>
    </Layout>
  );
}
