import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import {
  Heart,
  MessageSquare,
  Eye,
  AlertCircle,
  Edit,
  Trash2,
  EyeOff,
  Eye as EyeIcon,
} from "lucide-react";

const AdminPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    backendUrl,
    axiosInstance,
    handleAdminPostDelete,
    handleTogglePublish,
    handleUpdateAdminPost,
  } = useContext(AdminContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/admin/all-posts");
      if (res.data.success) {
        const foundPost = res.data.posts.find((p) => p._id === id);
        if (!foundPost) {
          toast.error("Post not found");
          navigate(-1);
          return;
        }
        setPost(foundPost);
        setEditTitle(foundPost.title);
        setEditDescription(foundPost.description);
      } else {
        toast.error(res.data.message || "Failed to fetch post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load post details.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  const handleDelete = async () => {
    await handleAdminPostDelete(post._id);
    navigate(-1);
  };

  const handlePublishToggle = async () => {
    await handleTogglePublish(post._id);
    fetchPost();
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    await handleUpdateAdminPost(post._id, editTitle, editDescription, editImage);
    setSaving(false);
    setIsEditing(false);
    fetchPost();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 px-4 py-2 rounded-lg cursor-pointer bg-blue-100 flex items-center gap-2"
      >
        &larr; Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="relative flex flex-col items-center">
          {post.image && (
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-4">
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
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
                  <label className="cursor-pointer text-fuchsia-500 bg-white border hover:bg-black px-4 py-2 rounded-lg">
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
                <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                  Published
                </span>
              )}
            </div>
          )}

          {/* Post Stats */}
          <div className="flex gap-6 text-sm mt-4">
            <span className="flex items-center gap-1 text-red-600">
              <Heart size={16} /> {post.likes?.length || 0}
            </span>
            <span className="flex items-center gap-1 text-blue-600">
              <MessageSquare size={16} /> {post.comments?.length || 0}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Eye size={16} /> {post.views?.length || 0}
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <AlertCircle size={16} /> {post.reports?.length || 0}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">
          {/* Buttons for small screens */}
          {!isEditing && (
            <div className="flex flex-row justify-start md:justify-end gap-2 mb-2 sm:mb-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={handlePublishToggle}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white ${
                  post.isPublished
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {post.isPublished ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                {post.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          )}

          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 w-full"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          )}

          {/* Created and Published Dates */}
          <div className="text-gray-500 text-sm mb-4">
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            {post.publishedAt && (
              <p>Published At: {new Date(post.publishedAt).toLocaleString()}</p>
            )}
          </div>

          {/* Description */}
          {isEditing ? (
            <>
              <textarea
                rows={5}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border p-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className={`px-4 py-2 rounded-lg font-medium text-white ${
                    saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-700 mb-4">{post.description}</p>
          )}

          {/* Reports Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-red-600 mb-2 flex items-center gap-2">
              <AlertCircle size={18} /> Reports ({post.reports.length})
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              {post.reports.map((report, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{report.user || "Unknown User"}:</span>{" "}
                  {report.reason || "No reason provided"}
                </li>
              ))}
            </ul>
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <MessageSquare size={18} /> Comments ({post.comments.length})
            </h2>
            <div className="space-y-4">
              {post.comments.map((comment, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p>
                    <span className="font-semibold">{comment.user || "Anonymous"}:</span> {comment.text}
                  </p>
                  {comment.replies?.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1 text-gray-600 text-sm">
                      {comment.replies.map((reply, j) => (
                        <p key={j}>
                          ↳ <span className="font-semibold">{reply.user || "Anonymous"}:</span> {reply.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostDetails;
