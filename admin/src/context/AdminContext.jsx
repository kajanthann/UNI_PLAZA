import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");
  const backendUrl = "http://localhost:5000";

  // States
  const [clubs, setClubs] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(false);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  const [adminPosts, setAdminPosts] = useState([]);
  const [loadingAdminPosts, setLoadingAdminPosts] = useState(false);

  const navigate = useNavigate();

  // Axios instance with interceptor
  const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: { Authorization: `Bearer ${aToken}` },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const msg = error.response.data?.message || "Unauthorized";
        toast.error(
          msg.includes("Token expired")
            ? "Session expired. Please login again."
            : msg
        );

        setAtoken("");
        localStorage.removeItem("aToken");
        navigate("/admin/login");
      }
      return Promise.reject(error);
    }
  );

  // ----------------------------
  // CLUB MANAGEMENT
  // ----------------------------

  const fetchClubs = async () => {
    setLoadingClubs(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/clubs");
      if (data.success) setClubs(data.clubs || []);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch clubs");
    } finally {
      setLoadingClubs(false);
    }
  };

  const updateClubStatus = async (clubId, newStatus) => {
    if (newStatus === "pending") return toast.error("Cannot set to pending");
    const prevClubs = [...clubs];
    setClubs((prev) =>
      prev.map((c) => (c._id === clubId ? { ...c, status: newStatus } : c))
    );

    try {
      const { data } = await axiosInstance.put(
        `/api/admin/clubs/${clubId}/${newStatus}`
      );
      if (data.success) {
        toast.success(`Club status updated to ${newStatus}`);
        fetchClubs();
      } else {
        toast.error(data.message);
        setClubs(prevClubs);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
      setClubs(prevClubs);
    }
  };

  const deleteClub = async (clubId) => {
    const prevClubs = [...clubs];
    setClubs((prev) => prev.filter((c) => c._id !== clubId));
    try {
      const { data } = await axiosInstance.delete(`/api/admin/clubs/${clubId}`);
      if (data.success) toast.success("Club deleted successfully");
      else {
        toast.error(data.message);
        setClubs(prevClubs);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete club");
      setClubs(prevClubs);
    }
  };

  // ----------------------------
  // EVENT MANAGEMENT
  // ----------------------------

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/events");
      if (data.success) setEvents(data.events || []);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoadingEvents(false);
    }
  };

  const updateEventStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "rejected" ? "approved" : "rejected";
      await axiosInstance.put(`/api/admin/events/${id}/${newStatus}`);
      toast.success(`Event ${newStatus === "rejected" ? "blocked" : "unblocked"} successfully`);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update event status");
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete event");
    }
  };

  // ----------------------------
  // STUDENT MANAGEMENT
  // ----------------------------

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/users");
      if (data.success) setStudents(data.users || []);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoadingStudents(false);
    }
  };

  // ----------------------------
  // ADMINS
  // ----------------------------

  const fetchAdmins = async () => {
    try {
      const { data } = await axiosInstance.get("/api/admin/admins");
      if (data.success) setAdminData(data.admins || []);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch admins");
    }
  };

  // ----------------------------
  // FEEDBACK
  // ----------------------------

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/users/feedbacks");
      if (data.success) setFeedbacks(data.feedbacks || []);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch feedbacks");
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  // ----------------------------
  // EMAIL
  // ----------------------------

  const sendEmail = async ({ to, subject, text }) => {
    if (!to || !subject?.trim() || !text?.trim())
      return toast.error("Please fill all fields before sending email.");

    try {
      const { data } = await axiosInstance.post("/api/admin/send-email", {
        to,
        subject,
        text,
      });
      if (data.success) {
        toast.success(`Email sent successfully to ${to}`);
        return true;
      } else {
        toast.error(data.message || "Failed to send email.");
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending email.");
      return false;
    }
  };

  // ----------------------------
  // ADMIN POSTS
  // ----------------------------

  const adminFetchPosts = async () => {
    setLoadingAdminPosts(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/all-posts");
      if (data.success) setAdminPosts(data.posts || []);
      else toast.error(data.message || "Failed to load posts.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load posts.");
    } finally {
      setLoadingAdminPosts(false);
    }
  };

  const handleAdminPostDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const { data } = await axiosInstance.delete(`/api/admin/delete/${id}`);
      if (data.success) {
        toast.success("Post deleted successfully!");
        adminFetchPosts();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete post.");
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const { data } = await axiosInstance.patch(`/api/admin/is-publish/${id}`);
      if (data.success) {
        toast.success(data.message);
        adminFetchPosts();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle publish status.");
    }
  };

  const handleUpdateAdminPost = async (postId, title, description, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const { data } = await axiosInstance.put(
        `/api/admin/${postId}/edit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Post updated successfully!");
        adminFetchPosts();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update post.");
    }
  };

  // ----------------------------
  // AUTO FETCH ON LOGIN
  // ----------------------------

  useEffect(() => {
    if (aToken) {
      fetchClubs();
      fetchEvents();
      fetchStudents();
      fetchAdmins();
      fetchFeedbacks();
      adminFetchPosts();
    }
  }, [aToken]);

  // ----------------------------
  // CONTEXT VALUE
  // ----------------------------

  const value = {
    aToken,
    setAtoken,
    backendUrl,
    axiosInstance,
    clubs,
    loadingClubs,
    fetchClubs,
    updateClubStatus,
    deleteClub,
    events,
    loadingEvents,
    fetchEvents,
    updateEventStatus,
    deleteEvent,
    students,
    loadingStudents,
    fetchStudents,
    adminData,
    fetchAdmins,
    feedbacks,
    loadingFeedbacks,
    fetchFeedbacks,
    sendEmail,
    adminPosts,
    loadingAdminPosts,
    adminFetchPosts,
    handleAdminPostDelete,
    handleTogglePublish,
    handleUpdateAdminPost,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
