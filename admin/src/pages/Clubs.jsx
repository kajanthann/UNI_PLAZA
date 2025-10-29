import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import EmailModal from "../Components/EmailModal";
import EmailButton from "../Components/EmailButton";
import Animation from "../Components/Animation";

const Clubs = () => {
  const { clubs, updateClubStatus, loadingClubs, backendUrl } =
    useContext(AdminContext);

  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  const handleClearFilters = () => {
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const filteredClubs = clubs.filter((club) => {
    const roleMatch = roleFilter === "all" || club.role === roleFilter;
    const statusMatch = statusFilter === "all" || club.status === statusFilter;
    return roleMatch && statusMatch;
  });

  if (loadingClubs) return <Animation />;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-6 space-y-8">
      {/* Filters */}
      <div className="bg-white shadow-sm border rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          {(roleFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={handleClearFilters}
              className="text-gray-600 cursor-pointer hover:text-red-600 font-semibold"
            >
              ✕ Clear
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Role Filter */}
          <div className="flex flex-wrap gap-3">
            {["all", "club", "community"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer select-none text-sm sm:text-base"
              >
                <input
                  type="checkbox"
                  checked={roleFilter === type}
                  onChange={() => setRoleFilter(type)}
                  className="w-4 h-4 text-fuchsia-700 border-gray-300 rounded focus:ring-fuchsia-500"
                />
                <span className="text-gray-700 capitalize">
                  {type === "all" ? "All" : `${type}s`}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  (
                  {
                    clubs.filter((club) =>
                      type === "all" ? true : club.role === type
                    ).length
                  }
                  )
                </span>
              </label>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-3">
            {["approved", "pending", "rejected"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer select-none text-sm sm:text-base"
              >
                <input
                  type="checkbox"
                  checked={statusFilter === status}
                  onChange={() => setStatusFilter(status)}
                  className="w-4 h-4 text-fuchsia-700 border-gray-300 rounded focus:ring-fuchsia-500"
                />
                <span className="text-gray-700 capitalize">{status}</span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  ({clubs.filter((club) => club.status === status).length})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Clubs List */}
      {filteredClubs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No clubs found for selected filters.
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="md:w-1/3 flex flex-col items-center justify-center p-4 bg-gray-50">
                  <img
                    src={`${backendUrl}/uploads/${club.image}`}
                    alt={club.clubName}
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover border rounded-full"
                  />
                  <div className="text-center mt-3 space-y-1">
                    <EmailButton email={club.officialEmail} />
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {club.university}
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-2">
                      {club.clubName}
                      <span
                        className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
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
                      className={`px-3 py-1 rounded text-xs sm:text-sm font-semibold ${statusColors[club.status]} focus:outline-none`}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                        President
                      </h3>
                      <p className="text-gray-600 text-sm">{club.fullName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                        Personal Email
                      </h3>
                      <EmailButton email={club.email} />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                        Phone
                      </h3>
                      <p className="text-gray-600 text-sm">{club.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                        Created At
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(club.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                      {club.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Email Modal */}
      {showModal && (
        <EmailModal
          onClose={() => setShowModal(false)}
          onSend={() => toast.success("Email Sent")}
          email={selectedEmail}
        />
      )}
    </div>
  );
};

export default Clubs;
