import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";

const EmailVerify = () => {
  const { backendUrl, setAtoken } = useContext(AdminContext);
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name;
  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < otp.length - 1) inputsRef.current[idx + 1].focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[idx] && idx > 0) inputsRef.current[idx - 1].focus();
      newOtp[idx] = "";
      setOtp(newOtp);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.includes("")) return toast.error("Enter complete OTP");

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/verify-otp`, {
        email,
        otp: otp.join(""),
      });

      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAtoken(data.token);
        toast.success(`Welcome, ${name}!`);
        setTimeout(() => navigate("/dashboard"), 500);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-fuchsia-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 animate-fadeIn">
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Hi <span className="font-semibold">{name}</span>, enter the 6-digit OTP sent to your email
        </p>

        <div className="flex justify-between gap-3 mb-6">
          {otp.map((v, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={v}
              ref={(el) => (inputsRef.current[idx] = el)}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 outline-none transition-all duration-200"
            />
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className={`flex-1 flex justify-center items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-3 rounded-xl transition ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying...
              </>
            ) : (
              <>Verify ({formatTime(timer)})</>
            )}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
