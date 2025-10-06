import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const inputCount = 6;
  const [otp, setOtp] = useState(Array(inputCount).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [timer, setTimer] = useState(150); // 2:30 countdown

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    // Find first empty index
    const firstEmpty = otp.findIndex((v) => v === "");
    if (firstEmpty !== -1) {
      const newOtp = [...otp];
      newOtp[firstEmpty] = value[0];
      setOtp(newOtp);

      // Focus next input if exists
      if (firstEmpty < inputCount - 1) {
        inputsRef.current[firstEmpty + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[idx] === "") {
        // Move focus to previous if current empty
        if (idx > 0) inputsRef.current[idx - 1].focus();
      } else {
        newOtp[idx] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async () => {
    if (otp.includes("")) {
      toast.error("Please enter complete OTP");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { userId, otp: otp.join("") }
      );
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="flex justify-between gap-3 mb-4">
          {otp.map((value, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="w-6 h-8 md:w-12 md:h-12 text-center text-lg border-b-2 border-gray-300 focus:border-blue-500 outline-none transition"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
            />
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>Didn't receive?</span>
          <span
            className={`cursor-pointer text-blue-500`}
          >
            Resend
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
            onClick={handleVerify}
          >
            Verify ({formatTime(timer)})
          </button>
          <button
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-md transition"
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
