import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const Clubs = () => {
  const { clubs, updateClubStatus, loadingClubs } = useContext(AdminContext);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  const filteredClubs = clubs.filter((club) => {
    const roleMatch = roleFilter === "all" || club.role === roleFilter;
    const statusMatch = statusFilter === "all" || club.status === statusFilter;
    return roleMatch && statusMatch;
  });

  if (loadingClubs) return <p className="text-center">Loading clubs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <span className="font-semibold text-gray-700">Role:</span>
          {["all", "club", "community"].map((type) => (
            <button
              key={type}
              onClick={() => setRoleFilter(type)}
              className={`px-4 py-1 rounded-full border font-semibold transition ${
                roleFilter === type
                  ? "bg-fuchsia-700 text-white border-fuchsia-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type === "all"
                ? "All"
                : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="font-semibold text-gray-700">Status:</span>
          {["all", "approved", "pending", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1 rounded-full border font-semibold transition ${
                statusFilter === status
                  ? "bg-fuchsia-700 text-white border-fuchsia-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Clubs List */}
      {filteredClubs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No clubs found for selected filters.
        </p>
      ) : (
        filteredClubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="md:w-1/4 flex flex-col items-center justify-center p-4 bg-gray-50">
                <img
                  src={club.image || "https://via.placeholder.com/150"}
                  alt={club.clubName}
                  className="w-32 h-32 rounded-full object-cover border"
                />
                <div className="text-center mt-3">
                  <p className="text-gray-600 text-sm">{club.officialEmail}</p>
                  <p className="text-gray-600 text-sm">{club.university}</p>
                </div>
              </div>

              {/* Right Panel */}
              <div className="md:w-3/4 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {club.clubName}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        club.role === "community"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {club.role.charAt(0).toUpperCase() + club.role.slice(1)}
                    </span>
                  </h2>

                  <select
                    value={club.status}
                    onChange={(e) =>
                      updateClubStatus(club._id, e.target.value)
                    }
                    className={`px-3 py-1 mx-3 border rounded text-sm font-semibold ${
                      statusColors[club.status]
                    }`}
                  >
                    {club.status === "pending" && (
                      <option value="pending" disabled>
                        Pending
                      </option>
                    )}
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        President
                      </h3>
                      <p className="text-gray-600">{club.fullName}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Personal Email
                      </h3>
                      <p className="text-gray-600">{club.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Phone
                      </h3>
                      <p className="text-gray-600">{club.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Created At
                      </h3>
                      <p className="text-gray-600">
                        {new Date(club.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Description
                    </h3>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {club.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Clubs;
