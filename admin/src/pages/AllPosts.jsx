import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Ban, Heart, MessageSquare } from "lucide-react";

const AllPosts = () => {
  const navigate = useNavigate();

  const posts = [
    {
      _id: "1",
      title: "Robotics Hackathon 2025",
      university: "University of Sri Jayewardenepura",
      club: "Tech Innovators Club",
      date: "2025-03-09",
      status: "pending",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      likes: 3,
      comments: 5,
    },
    {
      _id: "2",
      title: "AI Summit 2025",
      university: "University of Kelaniya",
      club: "AI Research Community",
      date: "2025-04-12",
      status: "approved",
      image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38",
      likes: 10,
      comments: 2,
    },
  ];

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  const handleDelete = (id) => {
    alert(`Deleted post ID: ${id}`);
  };

  const handleBlock = (id) => {
    alert(`Blocked post ID: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">All Event Posts</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Image Section */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => navigate(`/admin/posts/${post._id}`)}
            />

            {/* Content */}
            <div className="p-5 space-y-3 cursor-pointer" onClick={() => navigate(`/admin/posts/${post._id}`)}>
              <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">University:</span> {post.university}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Club/Community:</span> {post.club}
              </p>
              <p className="text-sm text-gray-500">
                📅 {new Date(post.date).toLocaleDateString()}
              </p>

              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}
              >
                {post.status.toUpperCase()}
              </span>

              {/* Likes / Comments */}
              <div className="flex justify-between items-center pt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" /> {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-blue-500" /> {post.comments}
                </div>
              </div>
            </div>

            {/* Admin Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBlock(post._id);
                }}
                className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full"
                title="Block Post"
              >
                <Ban className="w-4 h-4 text-yellow-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
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
