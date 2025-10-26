import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, PlusCircle, Users, LogIn, MailCheck, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-6 h-6 text-black"/> },
        { path: '/allPosts', label: 'All Posts', icon: <FileText className="w-6 h-6"/> },
        { path: '/addclub', label: 'Add Clubs', icon: <PlusCircle className="w-6 h-6" /> },
        { path: '/clubs', label: 'Clubs', icon: <FileText className="w-6 h-6"/> },
        { path: '/students', label: 'Students', icon: <Users className="w-6 h-6"/> },
        { path: '/settings', label: 'Settings', icon: <Settings className="w-6 h-6"/> },
    ];

  return (
    <div className='min-h-screen bg-white border-r border-gray-300'>
      <ul className='text-gray-700 mt-3'>
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 text-[18px] py-3.5 px-3 md:px-6 lg:px-9 md:min-w-50 lg:min-w-60 cursor-pointer transition ${
                isActive ? 'border-r-4 border-fuchsia-500 bg-[#f4f1f6]' : ''
              }`
            }
          >
            {item.icon}
            <p className='hidden md:block'>{item.label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
