import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function NotificationDetails({ open, setOpen,openModel, setOpenModel}) {
    const { state } = useLocation();
    const { msgId } = useParams();
    const [open, setOpen] = useState(true);

    if (!state) return <p>⚠️ No data received for Notification ID {msgId}</p>;

    const [msgData] = useState(state);

    const handleClose = () => {
        setOpen(false);
        setOpenModel(false);
    }
    const handleMarkRead = () => {
        alert("✅ Notification marked as read!");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-[90%] md:w-[420px] animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Notification Details
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-red-500 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                    <h3 className="text-base font-semibold text-gray-800">
                        {msgData.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Received at:{" "}
                        <span className="text-blue-500">
              {msgData.time}, {msgData.date}
            </span>
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {msgData.msg}
                    </p>
                </div>

                <div className="flex justify-end items-center gap-3 border-t border-gray-200 p-4">
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                    >
                        Dismiss
                    </button>
                    <button
                        onClick={handleMarkRead}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded-md"
                    >
                        Mark as Read
                    </button>
                </div>
            </div>
        </div>
    );
}
