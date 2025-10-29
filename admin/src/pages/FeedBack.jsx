import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { MessageCircle, Star } from "lucide-react";
import EmailButton from "../Components/EmailButton";
import Animation from "../Components/Animation";

const AdminFeedbacks = () => {
  const { feedbacks, loadingFeedbacks } = useContext(AdminContext);

  if (loadingFeedbacks) return <Animation />;
  if (!feedbacks.length) return <p className="text-center py-6 text-gray-500">No feedback submitted yet.</p>;

  // Function to render stars dynamically
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-600" /> User Feedback
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Subject</th>
              <th className="px-4 py-2 border-b">Message</th>
              <th className="px-4 py-2 border-b">Rating</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-3 border-b text-gray-800 font-medium">
                  {fb.name || "-"}
                </td>
                <td className="px-4 py-3 border-b">
                  <EmailButton email={fb.email} />
                </td>
                <td className="px-4 py-3 border-b text-gray-700">{fb.subject}</td>
                <td className="px-4 py-3 border-b text-gray-600 whitespace-pre-wrap">
                  {fb.message}
                </td>
                <td className="px-4 py-3 border-b">
                  {fb.rating ? renderStars(fb.rating) : "-"}
                </td>
                <td className="px-4 py-3 border-b text-gray-500">
                  {fb.createdAt
                    ? new Date(fb.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedbacks;
