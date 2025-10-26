import React, { useContext, useEffect, useState } from "react";
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
  CheckCircle,
} from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const AllPosts = () => {
  const navigate = useNavigate();
  const { events, loadingEvents, fetchEvents, axiosInstance, backendUrl } =
    useContext(AdminContext);

  const [filters, setFilters] = useState({
    approved: false,
    rejected: false,
    reported: false,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

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

  const handleToggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "rejected" ? "approved" : "rejected";

      await axiosInstance.put(`/api/admin/events/${id}/${newStatus}`);
      toast.success(
        `Event ${
          newStatus === "rejected" ? "blocked" : "unblocked"
        } successfully`
      );
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to update event status"
      );
    }
  };

  // --- Filtered events based on checkboxes ---
  const filteredEvents = events.filter((post) => {
    const filterKeys = Object.keys(filters).filter((key) => filters[key]);
    if (filterKeys.length === 0) return true; // no filters selected → show all

    return filterKeys.some((key) => {
      if (key === "reported") return post.reports?.length > 0;
      return post.status === key;
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-white shadow-sm border rounded-xl p-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4 md:mb-0">
          All Posts{" "}
          <span className="text-gray-400 text-sm">
            [ {filteredEvents.length} ]
          </span>
        </h1>

        {/* Checkbox filters */}
        <div className="flex flex-wrap gap-3">
          {["approved", "rejected", "reported"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 cursor-pointer border rounded px-4 py-1 border-gray-400 hover:bg-fuchsia-300 transition"
            >
              <input
                type="checkbox"
                name={status}
                checked={filters[status]}
                onChange={handleCheckboxChange}
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {loadingEvents ? (
        <p className="text-center mt-10 text-gray-500 animate-pulse">
          Loading events...
        </p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">No events found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 group"
            >
              {/* Cover Image */}
              <div className="relative">
                <img
                  src={
                    post.image
                      ? `${backendUrl}/uploads/${post.image}`
                      : "https://via.placeholder.com/400x200"
                  }
                  alt={post.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/admin/posts/${post._id}`)}
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                    statusColors[post.status]
                  }`}
                >
                  {post.status?.toUpperCase()}
                </span>

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
                      <AlertCircle className="w-4 h-4" />{" "}
                      {post.reports?.length || 0}
                    </span>
                    <span className="flex items-center gap-1 text-blue-500">
                      <MessageSquare className="w-4 h-4" />{" "}
                      {post.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Buttons */}
              <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleBlock(post._id, post.status);
                  }}
                  className={`p-2 rounded-full shadow-sm transition ${
                    post.status === "rejected"
                      ? "bg-green-100 hover:bg-green-200"
                      : "bg-yellow-100 hover:bg-yellow-200"
                  }`}
                  title={
                    post.status === "rejected" ? "Unblock Post" : "Block Post"
                  }
                >
                  {post.status === "rejected" ? (
                    <CheckCircle className="w-4 h-4 text-green-700" />
                  ) : (
                    <Ban className="w-4 h-4 text-yellow-700" />
                  )}
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
      )}
    </div>
  );
};

export default AllPosts;
