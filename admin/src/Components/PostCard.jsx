import React, { useContext, useState } from "react";
import {
  Pencil,
  Trash2,
  Heart,
  MessageSquare,
  Eye,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const PostCard = ({ post }) => {
  const {
    backendUrl,
    handleAdminPostDelete,
    handleTogglePublish,
    handleUpdateAdminPost,
  } = useContext(AdminContext);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description);
  const [editImage, setEditImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await handleUpdateAdminPost(post._id, editTitle, editDescription, editImage);
    setLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-gray-50 p-5 rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Post Image */}
      <div className="relative mb-4 w-full h-48 rounded-xl overflow-hidden">
        <img
          src={
            editImage
              ? URL.createObjectURL(editImage)
              : `${backendUrl}/uploads/${post.image}`
          }
          alt={post.title}
          className={`w-full h-full object-cover rounded-xl ${
            isEditing && !editImage ? "filter blur-sm" : ""
          }`}
          onClick={() => !isEditing && navigate(`/admin/admin-posts/${post._id}`)}
        />

        {/* Image Overlay for Edit */}
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
            <label className="cursor-pointer text-white px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition">
              {editImage ? "Change Image" : "Upload New Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setEditImage(e.target.files[0])}
              />
            </label>
          </div>
        )}

        {post.isPublished && (
          <span className="absolute top-3 left-3 bg-green-200 border border-green-600 text-black px-2 py-1 text-xs rounded-full">
            Published
          </span>
        )}
      </div>

      {/* Edit Form */}
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="border p-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.description}</p>

          <div className="flex gap-4 mt-3 text-gray-600 text-sm items-center">
            <span className="flex items-center gap-1 text-red-600">
              <Heart size={14} /> {post.likes?.length || 0}
            </span>
            <span className="flex items-center gap-1 text-blue-600">
              <MessageSquare size={14} /> {post.comments?.length || 0}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Eye size={14} /> {post.views?.length || 0}
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <AlertCircle size={14} /> {post.reports?.length || 0}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleAdminPostDelete(post._id)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Publish Icon */}
            <button
              onClick={() => handleTogglePublish(post._id)}
              className="flex items-center gap-1 text-sm font-medium cursor-pointer"
              title={post.isPublished ? "Published" : "Unpublished"}
            >
              <CheckCircle
                size={18}
                className={`${
                  post.isPublished
                    ? "text-green-600 hover:text-green-800"
                    : "text-fuchsia-900 hover:text-gray-600"
                }`}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
