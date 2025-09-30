import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../../../admin/src/assets/assets'


const Sidebar = () => {


  return (
    <div className='min-h-screen bg-white border-r border-gray-300'>
        {
            <ul className='text-gray-700 mt-3'>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-6 lg:px-9 md:min-w-50 lg:min-w-60 cursor-pointer ${isActive ? 'border-r-5 border-fuchsia-500 bg-[#f4f1f6]' : ''}`} to={'/dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-6 lg:px-9 md:min-w-50 lg:min-w-60 cursor-pointer ${isActive ? 'border-r-5 border-fuchsia-500 bg-[#f4f1f6]' : ''}`} to={'/allPosts'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>posts</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-6 lg:px-9 md:min-w-50 lg:min-w-60 cursor-pointer ${isActive ? 'border-r-5 border-fuchsia-500 bg-[#f4f1f6]' : ''}`} to={'/addclub'}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Post</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-4 py-3.5 px-3 md:px-6 lg:px-9 md:min-w-50 lg:min-w-60 cursor-pointer ${isActive ? 'border-r-5 border-fuchsia-500 bg-[#f4f1f6]' : ''}`} to={'/clubs'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar