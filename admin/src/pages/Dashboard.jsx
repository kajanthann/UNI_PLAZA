import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  Globe2,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Heart,
  MessageSquare,
  Ban,
  Trash2,
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

const Dashboard = () => {
  const navigate = useNavigate();

  /** ---------------------------
   *  DUMMY DATA
   * --------------------------- */
  const stats = [
    {
      label: "Students",
      count: 120,
      icon: <Users className="" />,
      color: "from-pink-100 to-fuchsia-200",
    },
    {
      label: "Clubs",
      count: 12,
      icon: <Building2 className="" />,
      color: "from-purple-100 to-indigo-200",
    },
    {
      label: "Communities",
      count: 8,
      icon: <Globe2 className="" />,
      color: "from-blue-100 to-cyan-200",
    },
    {
      label: "Events",
      count: 15,
      icon: <CalendarDays className="" />,
      color: "from-teal-100 to-emerald-200",
    },
    {
      label: "Admins",
      count: 5,
      icon: <ShieldCheck className="" />,
      color: "from-yellow-100 to-orange-200",
    },
    {
      label: "Approved",
      count: 20,
      icon: <CheckCircle2 className="" />,
      color: "from-green-100 to-green-200",
    },
    {
      label: "Rejected",
      count: 6,
      icon: <XCircle className="" />,
      color: "from-red-100 to-red-200",
    },
    {
      label: "Pending",
      count: 9,
      icon: <Clock className="" />,
      color: "from-yellow-100 to-yellow-200",
    },
  ];
  
  const clubCommunityGrowth = [
    { month: "Jan", clubs: 5, communities: 3 },
    { month: "Feb", clubs: 8, communities: 6 },
    { month: "Mar", clubs: 12, communities: 9 },
    { month: "Apr", clubs: 10, communities: 7 },
  ];

  const statusOverview = [
    { name: "Approved", value: 20 },
    { name: "Pending", value: 9 },
    { name: "Rejected", value: 6 },
  ];
  const COLORS = ["#10B981", "#FACC15", "#EF4444"];

  const studentLoginData = [
    { month: "Jan", logins: 50 },
    { month: "Feb", logins: 70 },
    { month: "Mar", logins: 90 },
    { month: "Apr", logins: 110 },
    { month: "May", logins: 140 },
    { month: "Jun", logins: 180 },
  ];

  const eventFrequencyData = [
    { month: "Jan", events: 2 },
    { month: "Feb", events: 4 },
    { month: "Mar", events: 3 },
    { month: "Apr", events: 5 },
    { month: "May", events: 6 },
    { month: "Jun", events: 7 },
  ];

  const studentsPerUniversity = [
    { university: "Sri Jayewardenepura", students: 45 },
    { university: "Colombo", students: 30 },
    { university: "Kelaniya", students: 20 },
    { university: "Moratuwa", students: 15 },
    { university: "Peradeniya", students: 10 },
  ];

  /** ---------------------------
   *  DUMMY CLUBS & POSTS
   * --------------------------- */
  const clubs = [
    {
      _id: 1,
      clubName: "Tech Sparks",
      role: "Club",
      university: "ABC University",
      status: "pending",
    },
    {
      _id: 2,
      clubName: "Green Planet",
      role: "Community",
      university: "XYZ Institute",
      status: "approved",
    },
    {
      _id: 3,
      clubName: "Cultural Beats",
      role: "Club",
      university: "LMN College",
      status: "rejected",
    },
    {
      _id: 4,
      clubName: "Eco Warriors",
      role: "Community",
      university: "ABC University",
      status: "pending",
    },
    {
      _id: 5,
      clubName: "Robotics Club",
      role: "Club",
      university: "XYZ Institute",
      status: "approved",
    },
    {
      _id: 6,
      clubName: "Social Changemakers",
      role: "Community",
      university: "LMN College",
      status: "rejected",
    },
  ];

  const pendingClubs = clubs.filter((c) => c.status === "pending");
  const approvedClubs = clubs.filter((c) => c.status === "approved");
  const rejectedClubs = clubs.filter((c) => c.status === "rejected");

  const posts = [
    {
      _id: "1",
      title: "Robotics Hackathon 2025",
      university: "University of Sri Jayewardenepura",
      club: "Tech Innovators Club",
      date: "2025-03-09",
      status: "pending",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      likes: 3,
      comments: 5,
    },
    {
      _id: "2",
      title: "AI Summit 2025",
      university: "University of Kelaniya",
      club: "AI Research Community",
      date: "2025-04-12",
      status: "approved",
      image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38",
      likes: 10,
      comments: 2,
    },
    {
      _id: "3",
      title: "Tech Expo 2025",
      university: "University of Moratuwa",
      club: "Innovators Hub",
      date: "2025-06-15",
      status: "approved",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      likes: 18,
      comments: 4,
    },
    {
      _id: "4",
      title: "Music Night",
      university: "University of Colombo",
      club: "Music Club",
      date: "2025-07-10",
      status: "approved",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      likes: 25,
      comments: 9,
    },
  ];

  const mostLikedPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  /** ---------------------------
   *  JSX
   * --------------------------- */
  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-white to-fuchsia-50 space-y-10">
      <h1 className="text-4xl md:text-5xl font-bold text-fuchsia-700 mb-4">
        Admin Dashboard
      </h1>

      {/* ---------- Stats Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br border border-gray-400 ${item.color} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 px-5 py-2 flex items-center justify-between`}
          >
            {/* Left: Icon */}
            <div className="p-2 bg-white rounded-full shadow-md flex items-center justify-center">
              {item.icon}
            </div>

            {/* Right: Label & Count */}
            <div className="flex flex-col items-center">
              <p className="text-gray-700 font-medium text-lg">{item.label}</p>
              <p className="text-3xl font-bold text-fuchsia-700">
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Graphs Section ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Club & Community Growth */}
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

        {/* Status Overview */}
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

      {/* ---------- Event Frequency & Student Distribution ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Frequency */}
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

        {/* Students per University */}
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

      {/* ---------- Latest Clubs/Communities ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {[
          { title: "Latest Pending", data: pendingClubs },
          { title: "Latest Approved", data: approvedClubs },
          { title: "Latest Rejected", data: rejectedClubs },
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
                    {c.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ---------- Most Liked Posts ---------- */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-fuchsia-700">
          Top 5 Most Liked Event Posts
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostLikedPosts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl border shadow hover:shadow-lg overflow-hidden transition-all cursor-pointer"
              onClick={() => navigate(`/admin/posts/${post._id}`)}
            >
              <div className="flex gap-3 items-center">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-30 h-30 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.university}</p>
                  <p className="text-sm text-gray-600">{post.club}</p>
                  <div className="flex justify-between items-center gap-1 mt-2 font-medium">
                    <p>{post.date}</p>
                    <p className="flex items-center gap-1 text-red-500">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Recent Event Posts ---------- */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-fuchsia-700">
          Recent Event Posts
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl border shadow hover:shadow-lg overflow-hidden transition-all cursor-pointer"
              onClick={() => navigate(`/admin/posts/${post._id}`)}
            >
              {/* Top Content: Image + Info */}
              <div className="flex gap-4 items-center">
                {/* Image Section */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-30 h-30 object-cover flex-shrink-0"
                />

                {/* Info Section */}
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

              {/* Bottom Content: Likes, Comments, Status */}
              <div className="px-4 py-2 border-t flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" /> {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" />{" "}
                    {post.comments}
                  </div>
                </div>

                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[post.status]
                  }`}
                >
                  {post.status.toUpperCase()}
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
