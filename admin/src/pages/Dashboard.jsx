import React from "react";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const stats = [
    { label: "Students", count: 120, icon: assets.people_icon, color: "from-pink-100 to-fuchsia-200" },
    { label: "Clubs", count: 12, icon: assets.people_icon, color: "from-purple-100 to-indigo-200" },
    { label: "Events", count: 8, icon: assets.people_icon, color: "from-blue-100 to-cyan-200" },
    { label: "Admins", count: 5, icon: assets.people_icon, color: "from-teal-100 to-emerald-200" },
  ];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-white to-fuchsia-50">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-fuchsia-700">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center py-5`}
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
            </div>
            <p className="text-xl font-semibold text-gray-700">{item.label}</p>
            <p className="text-4xl font-bold text-fuchsia-700 mt-2">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
