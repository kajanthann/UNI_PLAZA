import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  Trash2,
  Ban,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Link,
  Tag,
  ArrowLeft,
  AlertCircle,
  Eye,
  CheckCircle,
} from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axiosInstance, backendUrl, updateEventStatus, deleteEvent } =
    useContext(AdminContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/admin/events`);
      const found = res.data?.events?.find((e) => e._id === id);
      if (!found) {
        toast.error("Post not found");
        navigate(-1);
        return;
      }
      setPost(found);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch post");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // Handle Delete using context function
  const handleDelete = async () => {
    if (!post) return;
    try {
      await deleteEvent(post._id); // context function handles toast & fetch
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete post");
    }
  };

  // Handle Block/Unblock using context function
  const handleToggleBlock = async () => {
    if (!post) return;
    try {
      await updateEventStatus(post._id, post.status); // context handles toast & fetch
      fetchPost(); // refresh local post after update
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update event status");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading post...
      </p>
    );

  if (!post) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between p-6 border-r border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={
                  post.clubImg
                    ? `${backendUrl}/uploads/${post.clubImg}`
                    : "/default.png"
                }
                alt="Club"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{post.clubName}</h2>
                <p className="text-sm text-gray-500">{post.university}</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[post.status]
              }`}
            >
              {post.status.toUpperCase()}
            </span>
          </div>

          {/* Event Image */}
          {post.image && (
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={`${backendUrl}/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-80 object-cover"
              />
            </div>
          )}

          {/* Likes + Admin Actions */}
          <div className="mt-6 pt-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-red-500">
                <Heart className="w-5 h-5" /> {post.likes?.length || 0}
              </div>
              <div className="flex items-center gap-1 text-blue-500">
                <MessageSquare className="w-5 h-5" /> {post.comments?.length || 0}
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

            <div className="flex gap-2">
              <button
                onClick={handleToggleBlock}
                className={`p-2 rounded-full shadow-sm transition ${
                  post.status === "rejected"
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-yellow-100 px-2.5 hover:bg-yellow-200"
                }`}
                title={post.status === "rejected" ? "Unblock Post" : "Block Post"}
              >
                {post.status === "rejected" ? (
                  <CheckCircle className="w-4 h-4 text-green-700" />
                ) : (
                  <Ban className="w-4 h-4 text-yellow-700" />
                )}
              </button>

              <button
                onClick={handleDelete}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
              >
                <Trash2 className="w-5 h-5 text-red-700" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-700 leading-relaxed">{post.description}</p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Links */}
          {post.relatedLinks?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <Link className="w-5 h-5 text-blue-600" /> Related Links
              </h3>
              <div className="flex flex-col gap-1 mt-1">
                {post.relatedLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.label || link.url}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Event Info */}
          <div className="border-t pt-4 mt-4 space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Date:</span>{" "}
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Start Time:</span>{" "}
              {post.startTime}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Location:</span>{" "}
              <a
                href={post.mapLink}
                target="_blank"
                className="text-blue-600 underline"
              >
                {post.location}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Contact:</span>{" "}
              {post.contactNumber} • {post.email}
            </p>
            <p className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Views:</span> {post.views?.length || 0}
            </p>
          </div>

          {/* Reports */}
          {(
            <div className="mt-4 border-t pt-4">
              <h3 className="flex items-center gap-2 font-semibold text-red-600">
                <AlertCircle className="w-5 h-5" /> Reports ({post.reports.length})
              </h3>
              <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                {post.reports.map((r, i) => (
                  <li key={i}>
                    {r.reason || "No reason"} –{" "}
                    <span className="text-gray-500">{r.user}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Comments */}
          {(
            <div className="mt-4 border-t pt-4">
              <h3 className="flex items-center gap-2 font-semibold text-blue-600">
                <MessageSquare className="w-5 h-5" /> Comments ({post.comments.length})
              </h3>
              <div className="mt-2 space-y-2">
                {post.comments.map((c, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700"
                  >
                    <p>{c.text}</p>
                    {c.replies?.length > 0 && (
                      <div className="ml-4 mt-1 text-gray-600 text-xs">
                        {c.replies.map((r, j) => (
                          <p key={j}>↳ {r.text}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
