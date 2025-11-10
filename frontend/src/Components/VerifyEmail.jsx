import { useState,useEffect,useRef } from "react";

export default function VerifyEmail() {
  const email = "amy*****@gmail.com";

  const [timeLeft,setTimeLeft] = useState(120);
  const [isActive,setIsActive] = useState(true);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds/60);
    const s = seconds % 60;
    const secondsString = s.toString().padStart(2,"0");
    const minituesString = m.toString().padStart(2,"0");
    return `${minituesString}:${secondsString}`
  }

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1){
                clearInterval(timerRef.current);
                setIsActive(false);
                return 0;
            }
            return prev-1;
        });
    },1000)
  }

  useEffect(()=>{
    startTimer();
    return () => clearInterval(timerRef.current);
  },[])

  const handleResend = () => {
    alert("📨 OTP has been resent to your email!");
    setTimeLeft(120);
    setIsActive(true);
    startTimer();
  };

  return (
      <div className="absolute top-1/5 left-1/4 w-2/5 bg-white p-8 rounded-2xl shadow-lg">
    
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

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP (e.g., 123456)"
            className="border border-gray-300 rounded-lg p-3 text-center tracking-widest text-lg focus:outline-none focus:border-blue-500"
          />

          <div className="flex justify-between items-center text-sm text-gray-600">
            <button type="button" onClick={handleResend} disabled={isActive} className={`${
                isActive
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:underline"
              }`}>
              Resend OTP
            </button>
            <p className="text-md">⏱️ {formatTime(timeLeft)}</p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              No, Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Yes, Verify
            </button>
          </div>
        </form>
      </div>
  );
}
