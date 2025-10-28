import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  Globe2,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  Heart,
  MessageSquare,
  UserCog,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { AdminContext } from "../context/AdminContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { students, clubs, events, fetchStudents, fetchClubs, fetchEvents, fetchAdmins, adminData } =
    useContext(AdminContext);

  useEffect(() => {
    fetchStudents();
    fetchClubs();
    fetchEvents();
    fetchAdmins();
  }, []);

  const stats = [
    {
      label: "Students",
      count: students.length,
      icon: <Users />,
      color: "from-pink-100 to-fuchsia-200",
    },
    {
      label: "Clubs",
      count: clubs.length,
      icon: <Building2 />,
      color: "from-purple-100 to-indigo-200",
    },
    {
      label: "Admins",
      count: adminData.length,
      icon: <UserCog />,
      color: "from-purple-100 to-indigo-200",
    },
    {
      label: "Communities",
      count: clubs.filter((c) => c.role?.toLowerCase() === "community").length,
      icon: <Globe2 />,
      color: "from-blue-100 to-cyan-200",
    },
    {
      label: "Events",
      count: events.length,
      icon: <CalendarDays />,
      color: "from-teal-100 to-emerald-200",
    },
    {
      label: "Approved",
      count: clubs.filter((c) => c.status === "approved").length,
      icon: <CheckCircle2 />,
      color: "from-green-100 to-green-200",
    },
    {
      label: "Rejected",
      count: clubs.filter((c) => c.status === "rejected").length,
      icon: <XCircle />,
      color: "from-red-100 to-red-200",
    },
    {
      label: "Pending",
      count: clubs.filter((c) => c.status === "pending").length,
      icon: <Clock />,
      color: "from-yellow-100 to-yellow-200",
    },
  ];

  /** ---------------------------
   * Chart Data
   * --------------------------- */
  const clubCommunityGrowth = clubs.reduce((acc, club) => {
    const month = new Date(club.createdAt).toLocaleString("default", {
      month: "short",
    });
    let entry = acc.find((e) => e.month === month);
    if (!entry) {
      entry = { month, clubs: 0, communities: 0 };
      acc.push(entry);
    }
    if (club.role?.toLowerCase() === "club") entry.clubs += 1;
    else if (club.role?.toLowerCase() === "community") entry.communities += 1;
    return acc;
  }, []);

  const statusOverview = [
    {
      name: "Approved",
      value: clubs.filter((c) => c.status === "approved").length,
    },
    {
      name: "Pending",
      value: clubs.filter((c) => c.status === "pending").length,
    },
    {
      name: "Rejected",
      value: clubs.filter((c) => c.status === "rejected").length,
    },
  ];
  const COLORS = ["#10B981", "#FACC15", "#EF4444"];

  const eventFrequencyData = events.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("default", {
      month: "short",
    });
    let entry = acc.find((el) => el.month === month);
    if (!entry) {
      entry = { month, events: 0 };
      acc.push(entry);
    }
    entry.events += 1;
    return acc;
  }, []);

  const studentsPerUniversity = students.reduce((acc, s) => {
    let entry = acc.find((e) => e.university === s.university);
    if (!entry) {
      entry = { university: s.university || "Unknown", students: 0 };
      acc.push(entry);
    }
    entry.students += 1;
    return acc;
  }, []);

  const pendingClubs = clubs.filter((c) => c.status === "pending");
  const approvedClubs = clubs.filter((c) => c.status === "approved");
  const rejectedClubs = clubs.filter((c) => c.status === "rejected");

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  /** ---------------------------
   * Posts: Most Liked & Recent
   * --------------------------- */
  const mostLikedPosts = [...events]
    .sort((a, b) => {
      const likesA = Array.isArray(a.likes) ? a.likes.length : a.likes || 0;
      const likesB = Array.isArray(b.likes) ? b.likes.length : b.likes || 0;
      return likesB - likesA;
    })
    .slice(0, 5);

  const recentPosts = [...events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br space-y-10">
      <h1 className="text-4xl md:text-5xl font-bold text-fuchsia-700 mb-4">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br border border-gray-400 ${item.color} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 px-5 py-2 flex items-center justify-between`}
          >
            <div className="p-2 bg-white rounded-full shadow-md flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex flex-col items-end">
              <p className="text-gray-700 font-medium text-lg">{item.label}</p>
              <p className="text-3xl font-bold text-fuchsia-700">
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Club & Community Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clubCommunityGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clubs" fill="#A21CAF" />
              <Bar dataKey="communities" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Club/Community Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusOverview}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusOverview.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Frequency & Students per University */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Event Frequency by Month
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#A21CAF"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Students per University
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentsPerUniversity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="university" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Clubs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {[
          { title: "Pending", data: pendingClubs },
          { title: "Approved", data: approvedClubs },
          { title: "Rejected", data: rejectedClubs },
        ].map((group, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-fuchsia-700">
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.data.map((c) => (
                <li
                  key={c._id}
                  className="border-b pb-2 flex items-center justify-between text-sm text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold">{c.clubName}</p>
                      <p className="text-xs text-gray-500">{c.university}</p>
                      <p className="text-xs text-gray-600 italic">{c.role}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[c.status]
                    }`}
                  >
                    {c.status?.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Most Liked Event Posts */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-fuchsia-700">
          Top 5 Most Liked Event Posts
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostLikedPosts
            .slice(0, 5)
            .map((post) => (
              <div
                key={post._id}
                className="relative bg-white rounded-xl border shadow hover:shadow-lg overflow-hidden transition-all cursor-pointer"
                onClick={() => navigate(`/admin/posts/${post._id}`)}
              >
                <div className="flex gap-3 items-center p-3">
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600">{post.university}</p>
                    <p className="text-sm text-gray-600">{post.club}</p>
                    <div className="flex justify-between items-center gap-2 mt-2 font-medium text-sm">
                      <p>{new Date(post.date).toLocaleDateString()}</p>
                      <p className="flex items-center gap-1 text-red-500">
                        <Heart className="w-4 h-4" />
                        {Array.isArray(post.likes)
                          ? post.likes.length
                          : post.likes || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Event Posts */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-fuchsia-700">
          Recent Event Posts
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl border shadow hover:shadow-lg overflow-hidden transition-all cursor-pointer"
              onClick={() => navigate(`/admin/posts/${post._id}`)}
            >
              <div className="flex gap-4 items-center">
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-30 h-30 object-cover flex-shrink-0"
                />
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-gray-800 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600">{post.university}</p>
                  <p className="text-sm text-gray-600">{post.club}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 border-t flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />{" "}
                    {post.likes?.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" />{" "}
                    {Array.isArray(post.comments) ? post.comments.length : 0}
                  </div>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[post.status]
                  }`}
                >
                  {post.status?.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
