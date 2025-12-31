import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  FileText,
  PlusCircle,
  Users,
  Edit,
  MessageCircle,
  Settings,
  Activity,
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-6 h-6 text-black"/> },
    { path: '/allPosts', label: 'All Posts', icon: <FileText className="w-6 h-6 text-blue-500" /> },
    { path: '/manage-post', label: 'Manage Post', icon: <Edit className="w-6 h-6 text-green-500" /> },
    { path: '/create-post', label: 'Create Post', icon: <PlusCircle className="w-6 h-6 text-purple-500" /> },
    { path: '/clubs', label: 'Clubs', icon: <Activity className="w-6 h-6 text-orange-500" /> },
    { path: '/students', label: 'Students', icon: <Users className="w-6 h-6 text-teal-500" /> },
    { path: '/feedbacks', label: 'Feedbacks', icon: <MessageCircle className="w-6 h-6 text-pink-500" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-6 h-6 text-gray-700" /> },
    { path: '/animation', label: 'Animations', icon: <Activity className="w-6 h-6 text-indigo-500" /> },
  ];

  return (
    <div className="min-h-screen bg-white border-r border-gray-300">
      <ul className="text-gray-700 mt-3">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 text-[18px] py-3.5 px-3 lg:px-9 lg:min-w-60 cursor-pointer hover:bg-[#f4f1f6] transition ${
                isActive ? 'border-r-4 border-fuchsia-500 bg-[#f4f1f6]' : ''
              }`
            }
          >
            {item.icon}
            <p className="hidden lg:block">{item.label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
