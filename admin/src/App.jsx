
import './App.css'
import MainContent from './Main-Content/mainContent'

function App() {

  return (
    <>
      <MainContent/>
    </>

import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import Dashboard from './pages/Dashboard';
import AllPosts from './pages/AllPosts';
import AddClub from './pages/AddClub';
import Clubs from './pages/Clubs';
import Students from './pages/Students';


const App = () => {

  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F8F9FA]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* admin */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/allPosts' element={<AllPosts />} />
          <Route path='/addclub' element={<AddClub />} />
          <Route path='/clubs' element={<Clubs />} />
          <Route path='/students' element={<Students />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer />
      <Login />
    </div>
    

  )
}

export default App;