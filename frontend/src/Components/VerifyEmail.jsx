import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api/axios.jsx";

export default function VerifyEmail({ closeModal, email }) {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const secondsString = s.toString().padStart(2, "0");
    const minutesString = m.toString().padStart(2, "0");
    return `${minutesString}:${secondsString}`;
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleResend = async () => {
    try {
      await api.post("/resend-otp", { email });
      alert("📨 OTP has been resent to your email!");
      setTimeLeft(120);
      setIsActive(true);
      startTimer();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },

    validationSchema: Yup.object({
      otp: Yup.string()
          .required("OTP is required")
          .length(6, "OTP must be 6 digits") // Assuming 6-digit OTP
          .matches(/^\d+$/, "OTP must contain only numbers"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post("/verify-otp", {
          email: email,
          otp: values.otp,
        });

        if (response.status === 200) {
          alert("Club verified successfully!");
          console.log("Club verified successfully!");
          closeModal(); // Close modal on successful verification
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert(error.response?.data?.message || "Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
      <div className="">
        <div className="absolute top-1/5 left-1/3 w-2/5 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="font-bold text-3xl text-center mb-3">Verify Email</h2>
          <p className="text-gray-600 text-center mb-5">
            Enter the OTP sent to <span className="font-semibold">{email}</span> to verify.
          </p>

          <div className="bg-blue-100 border-l-4 border-blue-700 p-3 mb-5 rounded">
            <h3 className="font-semibold text-black">⚠️ Warning</h3>
            <p className="text-sm text-gray-600">
              By verifying this panel, you will be able to access your account.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div>
              <input
                  type="text"
                  placeholder="Enter OTP (e.g., 123456)"
                  className="border border-gray-300 rounded-lg p-3 text-center tracking-widest text-lg focus:outline-none focus:border-blue-500 w-full"
                  {...formik.getFieldProps("otp")}
                  maxLength="6" // Limit to 6 digits
              />
              {formik.touched.otp && formik.errors.otp && ( // Fixed: was formik.errors.cluotpbName
                  <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <button
                  type="button"
                  onClick={handleResend}
                  disabled={isActive}
                  className={`${
                      isActive
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:underline"
                  }`}
              >
                Resend OTP
              </button>
              <p className="text-md">⏱️ {formatTime(timeLeft)}</p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                  disabled={loading}
              >
                No, Cancel
              </button>
              <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
              >
                {loading ? "Verifying..." : "Yes, Verify"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}