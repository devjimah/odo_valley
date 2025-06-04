import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import FormField from "../../components/FormField";
import ArrayField from "../../components/ArrayField";
import Spinner from "../../components/Spinner";
import api from "../../utils/api";
import { requireAuth } from "../../utils/auth";

const NewTour = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [locations, setLocations] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      days: 3,
      price: "",
      rating: 4.5,
      color: "#8B5CF6",
      featured: false,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Create form data for file upload
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("days", data.days);
      formData.append("price", data.price);
      formData.append("rating", data.rating);
      formData.append("color", data.color);
      formData.append("featured", data.featured);
      formData.append("features", JSON.stringify(features));
      formData.append("locations", JSON.stringify(locations));

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("image", "https://picsum.photos/800/600");
      }

      const response = await api.post("/tours", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Tour created successfully");
        router.push("/tours");
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error("Failed to create tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add New Tour</h1>
        <Link
          href="/tours"
          className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center"
        >
          <FiArrowLeft className="mr-1" /> Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              label="Title"
              name="title"
              register={register}
              errors={errors}
              validationRules={{ required: "Title is required" }}
              placeholder="Enter tour title"
            />

            <FormField
              label="Description"
              name="description"
              type="textarea"
              register={register}
              errors={errors}
              validationRules={{ required: "Description is required" }}
              placeholder="Enter tour description"
              rows={6}
            />

            <FormField
              label="Duration (days)"
              name="days"
              type="number"
              register={register}
              errors={errors}
              validationRules={{
                required: "Duration is required",
                min: { value: 1, message: "Duration must be at least 1 day" },
              }}
              defaultValue={3}
            />

            <FormField
              label="Price ($)"
              name="price"
              type="number"
              register={register}
              errors={errors}
              validationRules={{
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
              }}
              placeholder="e.g. 1200"
            />
          </div>

          <div>
            <FormField
              label="Rating"
              name="rating"
              type="number"
              register={register}
              errors={errors}
              validationRules={{
                min: { value: 0, message: "Rating must be at least 0" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              }}
              defaultValue={4.5}
              step={0.1}
            />

            <FormField
              label="Theme Color"
              name="color"
              type="color"
              register={register}
              errors={errors}
              defaultValue="#8B5CF6"
            />

            <FormField
              label="Featured"
              name="featured"
              type="checkbox"
              register={register}
              errors={errors}
              placeholder="Show this tour on the homepage"
            />

            <ArrayField
              label="Features"
              name="features"
              value={features}
              onChange={setFeatures}
              placeholder="Add a feature and press Enter"
            />

            <ArrayField
              label="Locations"
              name="locations"
              value={locations}
              onChange={setLocations}
              placeholder="Add a location and press Enter"
            />

            <div className="form-group">
              <label className="form-label">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-secondary flex items-center"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="white" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="mr-1" />
                Save Tour
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Add server-side authentication check
export const getServerSideProps = requireAuth;

export default NewTour;
