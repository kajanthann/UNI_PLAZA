import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");
  const [clubs, setClubs] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(false);

  const backendUrl = "http://localhost:5000";

  const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });

  const fetchClubs = async () => {
    try {
      setLoadingClubs(true);
      const res = await axiosInstance.get("/api/admin/clubs");
      setClubs(res.data.clubs || []);
    } catch (err) {
      console.error("Error fetching clubs:", err);
      toast.error(err.response?.data?.message || "Failed to fetch clubs");
    } finally {
      setLoadingClubs(false);
    }
  };

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
      await axiosInstance.put(`/api/admin/clubs/${clubId}/${newStatus}`);
      toast.success(`Club status updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update club status:", err);
      toast.error(err.response?.data?.message || "Failed to update status");
      setClubs(prevClubs);
    }
  };

  const deleteClub = async (clubId) => {
    try {
      await axiosInstance.delete(`/api/admin/clubs/${clubId}`);
      setClubs((prev) => prev.filter((c) => c._id !== clubId));
      toast.success("Club deleted successfully");
    } catch (err) {
      console.error("Failed to delete club:", err);
      toast.error(err.response?.data?.message || "Failed to delete club");
    }
  };

  useEffect(() => {
    if (aToken) fetchClubs();
  }, [aToken]);

  const value = {
    aToken,
    setAtoken,
    backendUrl,
    clubs,
    loadingClubs,
    fetchClubs,
    updateClubStatus,
    deleteClub,
    axiosInstance,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
