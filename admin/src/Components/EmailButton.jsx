// 📁 src/Components/EmailButton.jsx
import React, { useState, useContext } from "react";
import { Mail } from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import EmailModal from "./EmailModal";

const EmailButton = ({ email, className = "" }) => {
  const { sendEmail } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);

  const handleSend = async ({ subject, text }) => {
    const success = await sendEmail({ to: email, subject, text });
    if (success) setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => {
          if (!email) {
            toast.error("No email found for this item.");
            return;
          }
          setShowModal(true);
        }}
        className={`flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 ${className}`}
      >
        {email}
        <Mail className="text-blue-400 w-3 h-3 mt-0.5 ml-1 cursor-pointer" />
      </button>

      {showModal && (
        <EmailModal
          onClose={() => setShowModal(false)}
          onSend={handleSend}
          email={email}
        />
      )}
    </>
  );
};

export default EmailButton;
