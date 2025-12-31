import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { X } from "lucide-react";

const PostForm = () => {
  const { axiosInstance } = useContext(AdminContext);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newImage) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", newDescription);
      formData.append("image", newImage);

      const res = await axiosInstance.post("/api/admin/add", formData);

      if (res.data.success) {
        toast.success("Post added successfully!");
        setNewTitle("");
        setNewDescription("");
        setNewImage(null);
      } else {
        toast.error(res.data.message || "Failed to add post.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10 md:mt-30">
      <form
        onSubmit={handleAddPost}
        className="flex flex-col md:flex-row gap-8 bg-white p-8 mx-auto rounded-2xl shadow-xl max-w-6xl w-full"
      >
        {/* Image Upload */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 relative">
          {newImage && (
            <button
              type="button"
              onClick={() => setNewImage(null)}
              className="absolute top-1 cursor-pointer left-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
              title="Remove Image"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          )}
          <label
            htmlFor="new-post-img"
            className="cursor-pointer flex flex-col items-center bg-slate-50 justify-center w-80 h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-fuchsia-500 transition overflow-hidden"
          >
            <img
              src={newImage ? URL.createObjectURL(newImage) : assets.upload}
              alt="Upload"
              className={`${
                newImage
                  ? "w-full h-full object-cover"
                  : "w-20 h-20 object-contain opacity-80"
              }`}
            />
            {!newImage && (
              <span className="text-gray-400 mt-2 text-center text-sm">
                Click to upload image
              </span>
            )}
          </label>

          <input
            id="new-post-img"
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          <input
            type="text"
            placeholder="Enter Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-4 rounded-xl focus:ring-1 focus:ring-fuchsia-500 focus:outline-none w-full text-gray-700 placeholder-gray-400"
          />
          <textarea
            placeholder="Enter Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={6}
            className="border p-4 rounded-xl focus:ring-1 focus:ring-fuchsia-500 focus:outline-none resize-none w-full text-gray-700 placeholder-gray-400"
          />

          {/* Button aligned to the right on md+ screens */}
          <div className="flex justify-start md:justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`mt-2 px-6 py-2 rounded cursor-pointer font-medium text-white transition w-full md:w-auto ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-fuchsia-800 hover:bg-fuchsia-900"
              }`}
            >
              {loading ? "Adding..." : "Add Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
