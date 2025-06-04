import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import FormField from "../../components/FormField";
import Spinner from "../../components/Spinner";
import api from "../../utils/api";
import { requireAuth } from "../../utils/auth";

const NewGalleryImage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      alt: "",
      category: "destination",
      featured: false,
    },
  });

  const categoryOptions = [
    { value: "destination", label: "Destination" },
    { value: "accommodation", label: "Accommodation" },
    { value: "activity", label: "Activity" },
    { value: "food", label: "Food & Cuisine" },
    { value: "people", label: "People & Culture" },
    { value: "nature", label: "Nature & Landscape" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!imageFile) {
        toast.error("Please select an image");
        return;
      }

      setLoading(true);

      // Create form data for file upload
      const formData = new FormData();
      formData.append("alt", data.alt);
      formData.append("category", data.category);
      formData.append("featured", data.featured);
      formData.append("image", imageFile);

      const response = await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Gallery image added successfully");
        router.push("/gallery");
      }
    } catch (error) {
      console.error("Error adding gallery image:", error);
      toast.error("Failed to add gallery image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add New Gallery Image</h1>
        <Link
          href="/gallery"
          className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center"
        >
          <FiArrowLeft className="mr-1" /> Back to Gallery
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              label="Image Title"
              name="alt"
              register={register}
              errors={errors}
              validationRules={{ required: "Image title is required" }}
              placeholder="Enter image title or description"
            />

            <FormField
              label="Category"
              name="category"
              type="select"
              register={register}
              errors={errors}
              validationRules={{ required: "Category is required" }}
              options={categoryOptions}
            />

            <FormField
              label="Featured"
              name="featured"
              type="checkbox"
              register={register}
              errors={errors}
              placeholder="Display this image prominently on the website"
            />
          </div>

          <div>
            <div className="form-group">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
                required
              />
              {imagePreview ? (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-56 object-contain rounded-md border border-gray-200"
                  />
                </div>
              ) : (
                <div className="mt-2 border border-dashed border-gray-300 rounded-md h-56 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Image preview will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex items-center"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="white" />
                <span className="ml-2">Uploading...</span>
              </>
            ) : (
              <>
                <FiSave className="mr-1" />
                Upload Image
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

export default NewGalleryImage;
