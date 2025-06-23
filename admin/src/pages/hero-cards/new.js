import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import FormField from "../../components/FormField";
import ErrorDisplay from "../../components/ErrorDisplay";
import { api } from "../../utils/api";

const colorOptions = [
  { value: "from-green-400 to-emerald-500", label: "Green to Emerald" },
  { value: "from-emerald-400 to-teal-500", label: "Emerald to Teal" },
  { value: "from-teal-400 to-cyan-500", label: "Teal to Cyan" },
  { value: "from-cyan-400 to-blue-500", label: "Cyan to Blue" },
  { value: "from-blue-400 to-indigo-500", label: "Blue to Indigo" },
  { value: "from-indigo-400 to-purple-500", label: "Indigo to Purple" },
  { value: "from-purple-400 to-pink-500", label: "Purple to Pink" },
  { value: "from-pink-400 to-rose-500", label: "Pink to Rose" },
  { value: "from-yellow-400 to-orange-500", label: "Yellow to Orange" },
  { value: "from-orange-400 to-red-500", label: "Orange to Red" },
];

const unsplashCategories = [
  { query: "nature forest", label: "Forest & Nature" },
  { query: "agriculture farming", label: "Agriculture & Farming" },
  { query: "sustainable farm", label: "Sustainable Farming" },
  { query: "biodiversity wildlife", label: "Biodiversity & Wildlife" },
  { query: "eco tourism", label: "Eco Tourism" },
  { query: "organic vegetables", label: "Organic Produce" },
  { query: "rural landscape", label: "Rural Landscapes" },
  { query: "farm animals", label: "Farm Animals" },
];

export default function NewHeroCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "🌱",
    image: "",
    stat: "",
    statLabel: "",
    color: "from-green-400 to-emerald-500",
    order: 1,
    isActive: true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateUnsplashUrl = (query) => {
    const baseUrl = "https://images.unsplash.com/photo-";
    const params = "w=800&h=600&fit=crop&crop=center";

    // Sample Unsplash photo IDs for different categories
    const photoIds = {
      "nature forest": "1441974231531-c6227db76b6e",
      "agriculture farming": "1574323347407-f5e1ad6d020b",
      "sustainable farm": "1500382017468-9049fed747ef",
      "biodiversity wildlife": "1416879595882-3373a0480b5b",
      "eco tourism": "1449824913935-59a10b8d2000",
      "organic vegetables": "1560472354-b33ff0c44a43",
      "rural landscape": "1500076656116-558758117d25",
      "farm animals": "1516467508483-a7212febe31a",
    };

    const photoId = photoIds[query] || photoIds["nature forest"];
    return `${baseUrl}${photoId}?${params}`;
  };

  const handleUnsplashSelect = (query) => {
    const imageUrl = generateUnsplashUrl(query);
    handleChange("image", imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/hero-cards", formData);
      router.push("/hero-cards");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create hero card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Add New Hero Card
          </h1>
          <p className="text-gray-600">
            Create a new card for the homepage carousel
          </p>
        </div>

        {error && <ErrorDisplay message={error} />}

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Title"
                type="text"
                value={formData.title}
                onChange={(value) => handleChange("title", value)}
                required
                placeholder="e.g., Biodiversity"
              />

              <FormField
                label="Icon (Emoji)"
                type="text"
                value={formData.icon}
                onChange={(value) => handleChange("icon", value)}
                required
                placeholder="🌱"
                maxLength={10}
              />
            </div>

            <FormField
              label="Description"
              type="textarea"
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              required
              placeholder="Describe what this card represents..."
              rows={3}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>

              {/* Unsplash Quick Select */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Quick select from Unsplash:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {unsplashCategories.map((category) => (
                    <button
                      key={category.query}
                      type="button"
                      onClick={() => handleUnsplashSelect(category.query)}
                      className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <FormField
                label="Or enter custom image URL"
                type="url"
                value={formData.image}
                onChange={(value) => handleChange("image", value)}
                required
                placeholder="https://images.unsplash.com/..."
              />

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/128x96/e5e7eb/9ca3af?text=Invalid+URL";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="Statistic"
                type="text"
                value={formData.stat}
                onChange={(value) => handleChange("stat", value)}
                required
                placeholder="300+"
              />

              <FormField
                label="Statistic Label"
                type="text"
                value={formData.statLabel}
                onChange={(value) => handleChange("statLabel", value)}
                required
                placeholder="Species"
              />

              <FormField
                label="Display Order"
                type="number"
                value={formData.order}
                onChange={(value) =>
                  handleChange("order", parseInt(value) || 1)
                }
                required
                min={1}
              />
            </div>

            <FormField
              label="Color Gradient"
              type="select"
              value={formData.color}
              onChange={(value) => handleChange("color", value)}
              options={colorOptions}
              required
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900"
              >
                Active (visible on website)
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/hero-cards")}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-md text-sm font-medium transition-colors"
              >
                {loading ? "Creating..." : "Create Hero Card"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
