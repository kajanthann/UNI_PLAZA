import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import Sidebar from './Components/Sidebar'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllPosts from "./pages/AllPosts";
import AddClub from "./pages/AddClub";
import Clubs from "./pages/Clubs";
import Students from "./pages/Students";
import EmailVerify from "./Components/EmailVerify";
import PostDetailsPage from "./Components/PostDetailsPage";
import Navbar from "./Components/Navbar";
import Setting from "./pages/Setting";
import FeedBack from "./pages/FeedBack";

const ProtectedRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext);
  const token = aToken || localStorage.getItem("aToken");

  // If token missing, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />

      <Navbar />

      <Routes>
        {!aToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/email-verification" element={<EmailVerify />} />
          </>
        )}

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex items-start">
                <Sidebar />
                <div className="bg-gray-50 h-[100vh] overflow-y-auto w-full">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="allPosts" element={<AllPosts />} />
                    <Route path="addpost" element={<AddClub />} />
                    <Route path="clubs" element={<Clubs />} />
                    <Route path="students" element={<Students />} />
                    <Route path="settings" element={<Setting />} />
                    <Route path="feedbacks" element={<FeedBack />} />
                    <Route
                      path="admin/posts/:id"
                      element={<PostDetailsPage />}
                    />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
