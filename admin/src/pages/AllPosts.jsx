import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Ban,
  Eye,
  Heart,
  MessageSquare,
  AlertCircle,
  CalendarDays,
  MapPin,
  Users,
  CheckCircle,
  Filter,
} from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import Animation from "../Components/Animation";

const AllPosts = () => {
  const navigate = useNavigate();
  const { events, loadingEvents, fetchEvents, axiosInstance, backendUrl, deleteEvent, updateEventStatus } =
    useContext(AdminContext);

  const [filters, setFilters] = useState({
    approved: false,
    rejected: false,
    reported: false,
  });
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setFilters({ approved: false, rejected: false, reported: false });
    setSortBy("default");
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

  // --- Filter logic ---
  let filteredEvents = events.filter((post) => {
    const activeFilters = Object.keys(filters).filter((key) => filters[key]);
    if (activeFilters.length === 0) return true; // no filters selected
    return activeFilters.some((key) => {
      if (key === "reported") return post.reports?.length > 0;
      return post.status === key;
    });
  });

  // --- Sort logic ---
  switch (sortBy) {
    case "likes":
      filteredEvents = [...filteredEvents].sort(
        (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
      );
      break;
    case "views":
      filteredEvents = [...filteredEvents].sort(
        (a, b) => (b.views?.length || 0) - (a.views?.length || 0)
      );
      break;
    case "latest":
      filteredEvents = [...filteredEvents].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "oldest":
      filteredEvents = [...filteredEvents].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    default:
      break;
  }

  if (loadingEvents) return <Animation />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-white shadow-sm border rounded-xl p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4 md:mb-0">
          All Posts{" "}
          <span className="text-gray-400 text-sm">
            [ {filteredEvents.length} ]
          </span>
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          {(Object.values(filters).some(Boolean) || sortBy !== "default") && (
            <button
              onClick={handleClearFilters}
              className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-red-500 transition"
              title="Clear all filters"
            >
              ✕ Clear
            </button>
          )}

          {/* Checkbox filters */}
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

          {/* Sorting dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-400 rounded px-5 py-1 text-gray-700 bg-white focus:outline-none hover:bg-fuchsia-100 transition"
            >
              <option value="default">Sort By</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Viewed</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <Filter className="absolute right-4 top-2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
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
                    {post.reports?.length > 0 && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <AlertCircle className="w-4 h-4" />
                        {post.reports.length}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-blue-500">
                      <MessageSquare className="w-4 h-4" />{" "}
                      {post.comments?.length || 0}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Eye className="w-4 h-4" /> {post.views?.length || 0}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    {new Date(post.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {/* Admin Buttons */}
              <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateEventStatus(post._id, post.status);
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
                    deleteEvent(post._id);
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
