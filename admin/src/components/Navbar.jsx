import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/admin-dashboard');
    if (aToken) {
      setAtoken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-2 border-b bg-white'>
      <div className='flex items-center gap-4 text-xs'>
        <div className='flex items-center gap-1 text-3xl font-semibold'>
          <img className='w-10 ' src={assets.logo} alt="" />
        </div>
        {
          aToken &&<p className='border px-4 py-0.5 mt-2 rounded-full bg-gray-50/60 border-gray-500 text-gray-600'>
          Admin Panel
        </p>
        }
        
      </div>
      <div className='flex items-center gap-6'>
        <div className='rounded-full bg-fuchsia-50 px-1.5 cursor-pointer py-1 border border-fuchsia-700'><img className='w-5 h-6' src={assets.profile} alt="" /></div>
        
        <button
        // onClick={logout}
        className='bg-fuchsia-700 text-white px-4 py-1 rounded-full cursor-pointer hover:bg-fuchsia-800 transition'
      >
        LogOut
      </button>
      </div>
      
    </div>
  );
};

export default Navbar;
