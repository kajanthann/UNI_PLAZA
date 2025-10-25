import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Ban,
  Heart,
  MessageSquare,
  AlertCircle,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const AllPosts = () => {
  const navigate = useNavigate();
  const { events, loadingEvents, fetchEvents, axiosInstance, backendUrl } = useContext(AdminContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const statusColors = {
    approved: "bg-green-100 text-green-700 border border-green-300",
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    rejected: "bg-red-100 text-red-700 border border-red-300",
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete event");
    }
  };

  const handleBlock = async (id) => {
    try {
      await axiosInstance.put(`/api/admin/events/${id}/rejected`);
      toast.success("Event blocked successfully");
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to block event");
    }
  };

  if (loadingEvents)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading events...
      </p>
    );

  if (!events || events.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        No events found.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 tracking-tight">
      All Club / Community Posts
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((post) => (
          <div
            key={post._id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 group"
          >
            {/* Cover Image */}
            <div className="relative">
              <img
                src={
                  post.image
                    ? `http://localhost:5000/uploads/${post.image}`
                    : "https://via.placeholder.com/400x200"
                }
                alt={post.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/admin/posts/${post._id}`)}
              />

              {/* Status badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${statusColors[post.status]}`}
              >
                {post.status?.toUpperCase()}
              </span>

              {/* Club image */}
              {post.clubImg && (
                <img
                  src={`${backendUrl}/uploads/${post.clubImg}`}
                  alt={post.clubName}
                  className="w-12 h-12 rounded-full object-cover absolute bottom-[-1.5rem] left-4 border-4 border-white shadow-md"
                />
              )}
            </div>

            {/* Content */}
            <div
              className="p-6 pt-8 space-y-3 cursor-pointer"
              onClick={() => navigate(`/admin/posts/${post._id}`)}
            >
              <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {post.description || "No description provided"}
              </p>

              <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {post.location || "Unknown"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {post.createdBy?.kind === "club"
                    ? `Club: ${post.clubName}`
                    : `Community: ${post.clubName || "N/A"}`}
                </span>
                <span className="capitalize text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">
                  {post.mode || "N/A"}
                </span>
              </div>

              {/* Reactions */}
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <div className="flex gap-3 text-sm">
                  <span className="flex items-center gap-1 text-red-500">
                    <Heart className="w-4 h-4" /> {post.likes?.length || 0}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-600">
                    <AlertCircle className="w-4 h-4" /> {post.reports?.length || 0}
                  </span>
                  <span className="flex items-center gap-1 text-blue-500">
                    <MessageSquare className="w-4 h-4" /> {post.comments?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Buttons */}
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBlock(post._id);
                }}
                className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full shadow-sm transition"
                title="Block Post"
              >
                <Ban className="w-4 h-4 text-yellow-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-full shadow-sm transition"
                title="Delete Post"
              >
                <Trash2 className="w-4 h-4 text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
