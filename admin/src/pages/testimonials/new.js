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

const NewTestimonial = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      role: "",
      comment: "",
      rating: 5,
      featured: true,
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Create form data for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("comment", data.comment);
      formData.append("rating", data.rating);
      formData.append("featured", data.featured);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      } else {
        // Use default avatar if none provided
        formData.append("avatar", "");
      }

      const response = await api.post("/testimonials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Testimonial added successfully");
        router.push("/testimonials");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add New Testimonial</h1>
        <Link
          href="/testimonials"
          className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center"
        >
          <FiArrowLeft className="mr-1" /> Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              label="Name"
              name="name"
              register={register}
              errors={errors}
              validationRules={{ required: "Name is required" }}
              placeholder="Enter client name"
            />

            <FormField
              label="Role / Location"
              name="role"
              register={register}
              errors={errors}
              validationRules={{ required: "Role is required" }}
              placeholder="e.g. Tourist from USA"
            />

            <FormField
              label="Testimonial"
              name="comment"
              type="textarea"
              register={register}
              errors={errors}
              validationRules={{
                required: "Testimonial is required",
                minLength: { value: 20, message: "Testimonial is too short" },
              }}
              placeholder="Enter the client's testimonial"
              rows={6}
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
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              }}
              defaultValue={5}
              step={0.5}
              min={1}
              max={5}
            />

            <FormField
              label="Featured"
              name="featured"
              type="checkbox"
              register={register}
              errors={errors}
              placeholder="Show this testimonial on the homepage"
            />

            <div className="form-group">
              <label className="form-label">Avatar (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="form-input"
              />

              <div className="mt-2 flex items-center">
                {avatarPreview ? (
                  <div className="w-16 h-16 relative overflow-hidden rounded-full">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 font-medium text-xl">?</span>
                  </div>
                )}
                <span className="ml-3 text-sm text-gray-600">
                  {avatarPreview ? "Avatar preview" : "No avatar selected"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success flex items-center"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="white" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="mr-1" />
                Save Testimonial
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

export default NewTestimonial;
