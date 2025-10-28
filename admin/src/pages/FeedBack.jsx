import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { MessageCircle } from "lucide-react";

const AdminFeedbacks = () => {
  const { feedbacks, loadingFeedbacks } = useContext(AdminContext);

  if (loadingFeedbacks) return <p>Loading feedbacks...</p>;
  if (!feedbacks.length) return <p>No feedback submitted yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-600" /> User Feedback
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
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
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-blue-500" />{" "}
                  {fb.name || "-"}
                </td>
                <td className="px-4 py-2 border-b">{fb.email}</td>
                <td className="px-4 py-2 border-b">{fb.subject}</td>
                <td className="px-4 py-2 border-b whitespace-pre-wrap">
                  {fb.message}
                </td>
                <td className="px-4 py-2 border-b">
                  {fb.rating ? `${fb.rating}/5` : "-"}
                </td>
                <td className="px-4 py-2 border-b">
                  {fb.createdAt ? new Date(fb.createdAt).toLocaleString() : "-"}
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
