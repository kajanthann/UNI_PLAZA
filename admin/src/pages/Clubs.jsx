import React, { useState } from "react";

const Clubs = () => {
  const [clubs, setClubs] = useState([
    {
      _id: "68e76e9e6df6a2322e5badf2",
      role: "club",
      clubName: "Tech Sparks",
      university: "ABC University",
      description:
        "A tech club for innovators. A tech club for innovators. A tech club for innovators. A tech club for innovators.",
      officialEmail: "techsparks@abc.edu",
      fullName: "John Doe",
      email: "president@abc.edu",
      phone: "123456789",
      image: "https://via.placeholder.com/150",
      status: "approved",
      createdAt: "2025-10-09T08:13:18.969Z",
    },
    {
      _id: "2",
      role: "community",
      clubName: "Green Planet",
      university: "XYZ Institute",
      description: "Environmental awareness group.",
      fullName: "Sarah Lee",
      email: "lead@xyz.edu",
      phone: "987654321",
      image: "https://via.placeholder.com/150",
      status: "pending",
      createdAt: "2025-10-10T09:00:00.000Z",
    },
    {
      _id: "3",
      role: "club",
      clubName: "Cultural Beats",
      university: "LMN College",
      description: "Music and arts club.",
      fullName: "Mike Johnson",
      email: "mike@lmn.edu",
      phone: "555123456",
      image: "https://via.placeholder.com/150",
      status: "rejected",
      createdAt: "2025-10-11T11:30:00.000Z",
    },
  ]);

  // Update status function
  const handleStatusChange = (id, newStatus) => {
    setClubs((prev) =>
      prev.map((club) =>
        club._id === id ? { ...club, status: newStatus } : club
      )
    );
  };

  // Status color mapping
  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left Panel: Image + Official Email + University */}
            <div className="md:w-1/4 flex flex-col items-center justify-center p-4 bg-gray-50">
              <img
                src={club.image}
                alt={club.clubName}
                className="w-32 h-32 rounded-full object-cover border"
              />
              <div className="text-center">
                <p className="text-gray-600">{club.officialEmail}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">{club.university}</p>
              </div>
            </div>

            {/* Right Panel: Details */}
            <div className="md:w-3/4 p-6 flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{club.clubName}</h2>
                  <p className="text-gray-500 capitalize">{club.role}</p>
                </div>
                <select
                  value={club.status}
                  onChange={(e) => handleStatusChange(club._id, e.target.value)}
                  className={`px-3 py-1 mx-3 border rounded text-sm font-semibold ${
                    statusColors[club.status]
                  }`}
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
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

                {/* Right Column */}
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

                {/* Full Width Description */}
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
      ))}
    </div>
  );
};

export default Clubs;
