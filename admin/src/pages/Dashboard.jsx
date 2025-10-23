import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Trash2, Ban, Heart, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy stats
  const stats = [
    { label: "Students", count: 120, icon: assets.people_icon, color: "from-pink-100 to-fuchsia-200" },
    { label: "Clubs", count: 12, icon: assets.people_icon, color: "from-purple-100 to-indigo-200" },
    { label: "Communities", count: 8, icon: assets.people_icon, color: "from-blue-100 to-cyan-200" },
    { label: "Events", count: 15, icon: assets.people_icon, color: "from-teal-100 to-emerald-200" },
    { label: "Admins", count: 15, icon: assets.people_icon, color: "from-yellow-100 to-orange-200" },
    { label: "Approved", count: 15, icon: assets.people_icon, color: "from-green-100 to-green-200" },
    { label: "Rejected", count: 15, icon: assets.people_icon, color: "from-red-100 to-red-200" },
    { label: "Pending", count: 15, icon: assets.people_icon, color: "from-yellow-100 to-yellow-200" },
  ];

  // Dummy students
  const students = Array.from({ length: 10 }).map((_, i) => ({
    _id: i + 1,
    name: `Student ${i + 1}`,
    regNo: `2021CSE${100 + i}`,
    email: `student${i + 1}@gmail.com`,
    phone: `07712345${i}${i}`,
    university: i % 2 === 0 ? "University of Sri Jayewardenepura" : "University of Colombo",
    year: `${(i % 4) + 1} Year`,
    faculty: i % 2 === 0 ? "Computing" : "Science",
    department: i % 2 === 0 ? "Software Engineering" : "Computer Science",
    image: "https://via.placeholder.com/80",
  }));

  // Dummy clubs/communities
  const clubs = [
    { _id: 1, clubName: "Tech Sparks", role: "club", university: "ABC University", status: "pending" },
    { _id: 2, clubName: "Green Planet", role: "community", university: "XYZ Institute", status: "approved" },
    { _id: 3, clubName: "Cultural Beats", role: "club", university: "LMN College", status: "rejected" },
    { _id: 4, clubName: "Eco Warriors", role: "community", university: "ABC University", status: "pending" },
    { _id: 5, clubName: "Robotics Club", role: "club", university: "XYZ Institute", status: "approved" },
    { _id: 6, clubName: "Social Changemakers", role: "community", university: "LMN College", status: "rejected" },
    { _id: 7, clubName: "AI Innovators", role: "club", university: "ABC University", status: "pending" },
    { _id: 8, clubName: "Nature Lovers", role: "community", university: "XYZ Institute", status: "approved" },
    { _id: 9, clubName: "Music Club", role: "club", university: "LMN College", status: "rejected" },
    { _id: 10, clubName: "Social Leaders", role: "community", university: "ABC University", status: "pending" },
  ];

  const pendingClubs = clubs.filter((c) => c.status === "pending").slice(0, 10);
  const approvedClubs = clubs.filter((c) => c.status === "approved").slice(0, 10);
  const rejectedClubs = clubs.filter((c) => c.status === "rejected").slice(0, 10);

  const totalClubs = clubs.filter((c) => c.role === "club").length;
  const totalCommunities = clubs.filter((c) => c.role === "community").length;

  // Dummy posts
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
      title: "Cultural Fest 2025",
      university: "University of Colombo",
      club: "Cultural Beats",
      date: "2025-05-20",
      status: "approved",
      image: "https://images.unsplash.com/photo-1544716278-fc75fa93fead",
      likes: 5,
      comments: 1,
    },
  ];

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  const handleDeletePost = (id) => alert(`Deleted post ID: ${id}`);
  const handleBlockPost = (id) => alert(`Blocked post ID: ${id}`);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-white to-fuchsia-50 space-y-12">
      <h1 className="text-4xl md:text-5xl font-bold text-fuchsia-700">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((item, idx) => (
          <div
            key={idx}
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

      {/* Latest Clubs/Communities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {[
          { title: "Latest Pending", data: pendingClubs },
          { title: "Latest Approved", data: approvedClubs },
          { title: "Latest Rejected", data: rejectedClubs },
        ].map((group, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">{group.title}</h2>
            <ul className="space-y-2">
              {group.data.map((c) => (
                <li key={c._id} className="border-b p-2">
                  <p className="font-medium">{c.clubName} ({c.role})</p>
                  <p className="text-sm text-gray-600">{c.university}</p>
                  <span className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                    {c.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Students Table */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold p-6 border-b">Latest 10 Students</h2>
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Reg No</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">University</th>
              <th className="p-3">Faculty</th>
              <th className="p-3">Department</th>
              <th className="p-3">Year</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={s._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">
                  <img src={s.image} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3">{s.regNo}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.phone}</td>
                <td className="p-3">{s.university}</td>
                <td className="p-3">{s.faculty}</td>
                <td className="p-3">{s.department}</td>
                <td className="p-3">{s.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Posts */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Event Posts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
              onClick={() => navigate(`/admin/posts/${post._id}`)}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.university}</p>
                <p className="text-sm text-gray-600">{post.club}</p>
                <p className="text-sm text-gray-500">📅 {new Date(post.date).toLocaleDateString()}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
                  {post.status.toUpperCase()}
                </span>
                <div className="flex justify-between items-center pt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" /> {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" /> {post.comments}
                  </div>
                </div>
              </div>

              {/* Admin Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleBlockPost(post._id); }}
                  className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full"
                  title="Block Post"
                >
                  <Ban className="w-4 h-4 text-yellow-700" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeletePost(post._id); }}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4 text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
