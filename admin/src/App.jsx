import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import Sidebar from './Components/Sidebar'
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllPosts from "./pages/AllPosts";
import Clubs from "./pages/Clubs";
import Students from "./pages/Students";
import EmailVerify from "./Components/EmailVerify";
import PostDetailsPage from "./Components/PostDetailsPage";
import Setting from "./pages/Setting";
import FeedBack from "./pages/FeedBack";
import Animation from "./Components/Animation";
import ManageAdminPost from "./pages/manageAdminPost";
import AdminPostDetails from "./Components/AdminPostDetails";
import PostForm from "./Components/PostForm";

const ProtectedRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext);
  const token = aToken || localStorage.getItem("aToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />

      {aToken && <Navbar />}

      <Routes>
        {/* Public routes */}
        {!aToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/email-verification" element={<EmailVerify />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Protected routes */}
        {aToken && (
          <>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex items-start">
                    <Sidebar />
                    <div className="bg-gray-50 h-[100vh] overflow-y-auto w-full p-4">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="allPosts" element={<AllPosts />} />
                        <Route path="manage-post" element={<ManageAdminPost />} />
                        <Route path="clubs" element={<Clubs />} />
                        <Route path="create-post" element={<PostForm />} />
                        <Route path="students" element={<Students />} />
                        <Route path="settings" element={<Setting />} />
                        <Route path="feedbacks" element={<FeedBack />} />
                        <Route path="animation" element={<Animation />} />
                        <Route path="admin/posts/:id" element={<PostDetailsPage />} />
                        <Route path="admin/admin-posts/:id" element={<AdminPostDetails />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
