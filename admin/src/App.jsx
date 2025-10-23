import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import Dashboard from "./pages/Dashboard";
import AllPosts from "./pages/AllPosts";
import AddClub from "./pages/AddClub";
import Clubs from "./pages/Clubs";
import Students from "./pages/Students";
import EmailVerify from "./Components/EmailVerify";
import PostDetailsPage from "./Components/PostDetailsPage";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9FA]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="bg-gray-50 p-6 md:p-10 h-[100vh] overflow-y-auto w-full">
          <Routes>
            {/* admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allPosts" element={<AllPosts />} />
            <Route path="/addclub" element={<AddClub />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/students" element={<Students />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verification" element={<EmailVerify />} />
            <Route path="/admin/posts/:id" element={<PostDetailsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer />
    </div>
  );
};

export default App;
