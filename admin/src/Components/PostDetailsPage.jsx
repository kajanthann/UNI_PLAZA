import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MessageSquare, Trash2, Ban } from "lucide-react";

const PostDetailsPage = () => {
  const { id } = useParams(); // ✅ Use "id", not "_id"
  const navigate = useNavigate();

  // 🧩 Dummy post data (you can later fetch by ID)
  const post = {
    _id: id,
    title: "Robotics Hackathon 2025",
    description:
      "A hands-on hackathon event exploring robotics and AI innovation across Sri Lankan universities.",
    date: "2025-03-09",
    startTime: "10:00 AM",
    location: "Main Hall, ABC University",
    mapLink: "https://maps.google.com",
    university: "University of Sri Jayewardenepura",
    club: "Tech Innovators Club",
    contactNumber: "077374747",
    email: "organizer@abc.edu",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    relatedLinks: [{ label: "Register", url: "https://event.com" }],
    tags: ["Technology", "AI", "Robotics"],
    likes: ["user1", "user2", "user3"],
    comments: [
      {
        user: "John Doe",
        text: "This event looks amazing!",
        replies: [{ user: "Sarah", text: "I agree!" }],
      },
    ],
    status: "pending",
  };

  const handleDelete = () => {
    alert(`Deleted post ID: ${id}`);
  };

  const handleBlock = () => {
    alert(`Blocked post ID: ${id}`);
  };

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Image and Header */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />

        {/* Admin Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleBlock}
            className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full"
            title="Block Post"
          >
            <Ban className="w-5 h-5 text-yellow-700" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
            title="Delete Post"
          >
            <Trash2 className="w-5 h-5 text-red-700" />
          </button>
        </div>
      </div>

      {/* Title and Info */}
      <div>
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
            {post.status.toUpperCase()}
          </span>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" /> {post.likes.length}
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" /> {post.comments.length}
          </div>
        </div>
        <p className="text-gray-600 mt-2 font-medium">
          🏫 {post.university}
        </p>
        <p className="text-gray-600">
          👥 {post.club}
        </p>
      </div>

      {/* Event Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <h3 className="font-semibold">📅 Date</h3>
          <p>{new Date(post.date).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">🕙 Start Time</h3>
          <p>{post.startTime}</p>
        </div>
        <div>
          <h3 className="font-semibold">📍 Location</h3>
          <a
            href={post.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {post.location}
          </a>
        </div>
        <div>
          <h3 className="font-semibold">📞 Contact</h3>
          <p>{post.contactNumber}</p>
          <p>{post.email}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">📝 Description</h3>
        <p className="text-gray-600 leading-relaxed">{post.description}</p>
      </div>

      {/* Related Links */}
      {post.relatedLinks?.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">🔗 Related Links</h3>
          {post.relatedLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Comments */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">💬 Comments</h3>
        <div className="space-y-4">
          {post.comments.map((c, i) => (
            <div key={i} className="border rounded-lg p-3 bg-gray-50">
              <p className="font-semibold">{c.user}</p>
              <p>{c.text}</p>

              {c.replies?.length > 0 && (
                <div className="ml-4 mt-2 border-l pl-3 space-y-2">
                  {c.replies.map((r, j) => (
                    <div key={j} className="text-sm text-gray-700">
                      <span className="font-medium">{r.user}: </span>
                      {r.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
