import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiSave, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import FormField from "../../components/FormField";
import ArrayField from "../../components/ArrayField";
import Spinner from "../../components/Spinner";
import destinationService from "../../services/destinationService";
import { requireAuth } from "../../utils/auth";

const NewDestination = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      rating: 4.5,
      color: "#3B82F6",
      featured: false,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset previous errors
    setImageError(null);

    // Check file size (10MB limit)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 10) {
      setImageError(
        `File size exceeds the 10MB limit. Current size: ${fileSizeInMB.toFixed(
          2
        )}MB`
      );
      e.target.value = null; // Reset input
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      // Validate image
      if (imageError) {
        toast.error("Please fix the image errors before submitting");
        return;
      }

      setLoading(true);

      // Prepare destination data
      const destinationData = {
        ...data,
        tags,
        highlights,
      };

      if (imageFile) {
        destinationData.image = imageFile;
      } else {
        destinationData.image = "https://picsum.photos/800/600";
      }

      // Create destination using service
      await destinationService.create(destinationData);

      toast.success("Destination created successfully");
      router.push("/destinations");
    } catch (error) {
      console.error("Error creating destination:", error);

      // Extract and show specific error message if available
      let errorMessage = "Failed to create destination";

      if (error.response) {
        // The request was made and the server responded with an error status
        if (error.response.data && error.response.data.error) {
          if (error.response.data.error.includes("File too large")) {
            errorMessage = "Image file is too large. Maximum size is 10MB.";
          } else {
            errorMessage = error.response.data.error;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add New Destination</h1>
        <Link
          href="/destinations"
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
              placeholder="Enter destination title"
            />

            <FormField
              label="Description"
              name="description"
              type="textarea"
              register={register}
              errors={errors}
              validationRules={{ required: "Description is required" }}
              placeholder="Enter destination description"
              rows={6}
            />

            <FormField
              label="Price"
              name="price"
              register={register}
              errors={errors}
              validationRules={{ required: "Price is required" }}
              placeholder="e.g. $1,200"
            />

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
          </div>

          <div>
            <FormField
              label="Theme Color"
              name="color"
              type="color"
              register={register}
              errors={errors}
              defaultValue="#3B82F6"
            />

            <FormField
              label="Featured"
              name="featured"
              type="checkbox"
              register={register}
              errors={errors}
              placeholder="Show this destination on the homepage"
            />

            <ArrayField
              label="Tags"
              name="tags"
              value={tags}
              onChange={setTags}
              placeholder="Add a tag and press Enter"
            />

            <ArrayField
              label="Highlights"
              name="highlights"
              value={highlights}
              onChange={setHighlights}
              placeholder="Add a highlight and press Enter"
            />

            <div className="form-group">
              <label className="form-label">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`form-input ${imageError ? "border-red-500" : ""}`}
              />
              {imageError && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {imageError}
                </div>
              )}
              <div className="mt-1 text-xs text-gray-500">
                Maximum file size: 10MB
              </div>
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
            disabled={loading || imageError}
            className="btn btn-primary flex items-center"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="white" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="mr-1" />
                Save Destination
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

export default NewDestination;
