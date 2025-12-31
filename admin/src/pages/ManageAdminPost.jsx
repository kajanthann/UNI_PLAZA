import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import PostCard from "../Components/PostCard";
import { Filter, PlusCircle } from "lucide-react";
import PostForm from "../Components/PostForm";

const ManageAdminPost = () => {
  const {
    backendUrl,
    adminPosts,
    loadingAdminPosts,
    handleAdminPostDelete,
    handleUpdateAdminPost,
    handleTogglePublish,
  } = useContext(AdminContext);

  // Filter and sort states
  const [filters, setFilters] = useState({
    published: false,
    unpublished: false,
    reported: false,
  });
  const [sortBy, setSortBy] = useState("default");
  const [showForm, setShowForm] = useState(false);

  // Handle checkbox filters
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle sorting
  const handleSortChange = (e) => setSortBy(e.target.value);

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      published: false,
      unpublished: false,
      reported: false,
    });
    setSortBy("default");
  };

  // Apply filters
  let filteredPosts = [...adminPosts];
  if (filters.published)
    filteredPosts = filteredPosts.filter((p) => p.isPublished);
  if (filters.unpublished)
    filteredPosts = filteredPosts.filter((p) => !p.isPublished);
  if (filters.reported)
    filteredPosts = filteredPosts.filter((p) => p.reports.length > 0);

  // Apply sorting
  if (sortBy === "latest")
    filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (sortBy === "oldest")
    filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  else if (sortBy === "likes")
    filteredPosts.sort((a, b) => b.likes.length - a.likes.length);
  else if (sortBy === "views")
    filteredPosts.sort((a, b) => b.views.length - a.views.length);

  // Loading state
  if (loadingAdminPosts)
    return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="mx-auto mt-10 md:p-10 bg-white rounded-2xl shadow-lg">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-white shadow-sm border rounded-xl p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4 md:mb-0">
          All Posts{" "}
          <span className="text-gray-400 text-sm">[ {filteredPosts.length} ]</span>
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Clear Filters Button */}
          {(Object.values(filters).some(Boolean) || sortBy !== "default") && (
            <button
              onClick={handleClearFilters}
              className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-red-500 transition"
              title="Clear all filters"
            >
              ✕ Clear
            </button>
          )}

          {/* Checkbox Filters */}
          {["published", "unpublished", "reported"].map((status) => {
            const count =
              status === "published"
                ? adminPosts.filter((p) => p.isPublished).length
                : status === "unpublished"
                ? adminPosts.filter((p) => !p.isPublished).length
                : adminPosts.filter((p) => p.reports.length > 0).length;

            return (
              
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
                {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                <div className="text-gray-800 text-xs">({count})</div>
              </label>
            );
          })}

          {/* Sorting Dropdown */}
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
            <Filter className="absolute right-4 top-2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <PlusCircle
            className="inline-block w-6 h-6 text-gray-600 mb-1 cursor-pointer hover:scale-110 transition"
            onClick={() => setShowForm((prev) => !prev)}
          />
        </div>
      </div>

      {/* Post Form Modal */}
      {showForm && (
        <PostForm onClose={() => setShowForm(false)} />
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              backendUrl={backendUrl}
              onDelete={handleAdminPostDelete}
              onTogglePublish={handleTogglePublish}
              onUpdate={handleUpdateAdminPost}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAdminPost;
