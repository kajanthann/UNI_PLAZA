import React, { useState } from "react";
import { Mail, Send } from "lucide-react";

const EmailModal = ({ onClose, onSend, email }) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !text.trim()) return;
    setIsSending(true);
    await onSend({ subject, text });
    setIsSending(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Send Email</h2>
        </div>

        {/* Recipient */}
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">To:</span> {email}
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <textarea
            placeholder="Write your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            disabled={isSending}
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            className="relative overflow-hidden flex items-center justify-center w-32 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-700 transition disabled:cursor-not-allowed"
            disabled={isSending}
          >
            {/* Text (hidden while sending) */}
            {!isSending && <span className="relative z-10 flex items-center gap-2"><Send className="w-4 h-4" />Send</span>}

            {/* Flying icon animation */}
            {isSending && (
              <Send className="absolute left-0 w-5 h-5 text-white animate-send rotate-45" />
            )}

            <style jsx>{`
              @keyframes sendAnim {
                0% { left: 0; }
                100% { left: calc(100% - 20px); } /* 20px icon width */
              }
              .animate-send {
                animation: sendAnim 4s forwards;
              }
            `}</style>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
