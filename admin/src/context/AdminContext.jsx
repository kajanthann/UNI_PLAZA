import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");

  const backendUrl = "http://localhost:5000";

  // Clubs state
  const [clubs, setClubs] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(false);

  // Events state
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Students state
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });

  // --- Fetch Clubs ---
  const fetchClubs = async () => {
    setLoadingClubs(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/clubs");
      if (data.success) {
        setClubs(data.clubs || []);
        console.log("Fetched clubs:", data.clubs);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingClubs(false);
    }
  };

  // --- Fetch Events ---
  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/events");
      if (data.success) {
        setEvents(data.events || []);
        console.log("Fetched events:", data.events);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingEvents(false);
    }
  };

  // --- Fetch Students ---
  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const { data } = await axiosInstance.get("/api/admin/users");
      if (data.success) {
        setStudents(data.users || []);
        console.log("Fetched students:", data.users);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  // --- Update Club Status ---
  const updateClubStatus = async (clubId, newStatus) => {
    if (newStatus === "pending") {
      toast.error("Cannot manually set status to pending");
      return;
    }
    const prevClubs = [...clubs];
    setClubs((prev) =>
      prev.map((c) => (c._id === clubId ? { ...c, status: newStatus } : c))
    );

    try {
      const { data } = await axiosInstance.put(`/api/admin/clubs/${clubId}/${newStatus}`);
      if (data.success) {
        toast.success(data.message || `Club status updated to ${newStatus}`);
        fetchClubs();
      } else {
        toast.error(data.message);
        setClubs(prevClubs);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setClubs(prevClubs);
    }
  };

  // --- Delete Club ---
  const deleteClub = async (clubId) => {
    const prevClubs = [...clubs];
    setClubs((prev) => prev.filter((c) => c._id !== clubId));
    try {
      const { data } = await axiosInstance.delete(`/api/admin/clubs/${clubId}`);
      if (data.success) {
        toast.success(data.message || "Club deleted successfully");
      } else {
        toast.error(data.message);
        setClubs(prevClubs);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setClubs(prevClubs);
    }
  };

  // --- Update Event Status ---
  const updateEventStatus = async (eventId, newStatus) => {
    if (!["approved", "rejected"].includes(newStatus)) {
      toast.error("Invalid status");
      return;
    }

    const prevEvents = [...events];
    setEvents((prev) =>
      prev.map((e) => (e._id === eventId ? { ...e, status: newStatus } : e))
    );

    try {
      const { data } = await axiosInstance.put(`/api/admin/events/${eventId}/${newStatus}`);
      if (data.success) {
        toast.success(data.message || `Event status updated to ${newStatus}`);
        fetchEvents();
      } else {
        toast.error(data.message);
        setEvents(prevEvents);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setEvents(prevEvents);
    }
  };

  // --- Delete Event ---
  const deleteEvent = async (eventId) => {
    const prevEvents = [...events];
    setEvents((prev) => prev.filter((e) => e._id !== eventId));
    try {
      const { data } = await axiosInstance.delete(`/api/admin/events/${eventId}`);
      if (data.success) {
        toast.success(data.message || "Event deleted successfully");
      } else {
        toast.error(data.message);
        setEvents(prevEvents);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setEvents(prevEvents);
    }
  };

  // --- Auto-fetch on token ---
  useEffect(() => {
    if (aToken) {
      fetchClubs();
      fetchEvents();
      fetchStudents();
    }
  }, [aToken]);

  const value = {
    aToken,
    setAtoken,
    backendUrl,
    clubs,
    loadingClubs,
    events,
    loadingEvents,
    students,
    loadingStudents,
    fetchClubs,
    fetchEvents,
    fetchStudents,
    updateClubStatus,
    deleteClub,
    updateEventStatus,
    deleteEvent,
    axiosInstance,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
