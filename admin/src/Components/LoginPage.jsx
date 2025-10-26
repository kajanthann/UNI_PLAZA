import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSmiling, setIsSmiling] = useState(false);

  // 👀 Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 💤 Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // 😊 Smile when focusing on password
  const handleFocus = () => setIsSmiling(true);
  const handleBlur = () => setIsSmiling(false);

  const getEyeMovement = (multiplier = 10) => ({
    transform: `translate(${(cursor.x / window.innerWidth) * multiplier}px, ${
      (cursor.y / window.innerHeight) * multiplier
    }px)`,
  });

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* LEFT: Animated Creatures */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className={`flex items-end space-x-4 transform transition-all duration-500`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* ORANGE SEMICIRCLE */}
          <div className="relative w-42 h-25 bg-orange-500 rounded-t-full flex items-start justify-center">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${i === 0 ? "left-10" : "right-10"} top-4 w-4 h-4 bg-white rounded-full flex items-center justify-center transition-all duration-100`}
                style={
                  showPassword
                    ? {}
                    : getEyeMovement(8)
                }
              >
                <div
                  className={`w-2 h-2 bg-black rounded-full transition-all duration-75 ${
                    isBlinking || showPassword ? "scale-y-[0.1]" : "scale-y-100"
                  }`}
                ></div>
              </div>
            ))}
            {/* Mouth */}
            <div
              className={`absolute bottom-5 w-6 h-[3px] bg-black rounded-full transition-all duration-300 ${
                isSmiling ? "scale-y-150 w-8 bg-black" : ""
              }`}
            ></div>
          </div>

          {/* BLACK RECTANGLE */}
          <div className="absolute w-28 h-75 left-25 z-[-20] bg-black flex items-start justify-center">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${i === 0 ? "left-4" : "right-6"} top-4  w-4 h-4 bg-white rounded-full flex items-center justify-center transition-all duration-100`}
                style={
                  showPassword
                    ? {}
                    : getEyeMovement(8)
                }
              >
                <div
                  className={`w-2 h-2 bg-black rounded-full transition-all duration-75 ${
                    isBlinking || showPassword ? "scale-y-[0.1]" : "scale-y-100"
                  }`}
                ></div>
              </div>
            ))}
            <div
              className={`absolute top-15 w-6 h-[3px] bg-gray-200 rounded-full transition-all duration-300 ${
                isSmiling ? "bg-white" : "bg-gray-200"
              }`}
            ></div>
          </div>

          {/* YELLOW BLOCK */}
          <div className="relative w-20 h-50 left-0 bg-yellow-400 rounded-t-xl flex items-start justify-center">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${i === 0 ? "left-3" : "right-6"} top-4  w-4 h-4 bg-white rounded-full flex items-center justify-center transition-all duration-100`}
                style={
                  showPassword
                    ? {}
                    : getEyeMovement(12)
                }
              >
                <div
                  className={`w-2 h-2 bg-black rounded-full transition-all duration-75 ${
                    isBlinking || showPassword ? "scale-y-[0.1]" : "scale-y-100"
                  }`}
                ></div>
              </div>
            ))}
            <div
              className={`absolute top-15 w-4 h-[3px] bg-black rounded-full transition-all duration-300 ${
                isSmiling ? "scale-y-150 w-6" : ""
              }`}
            ></div>
          </div>

          {/* PURPLE RECTANGLE */}
          <div className="relative w-26 h-34 right-10 bg-purple-600 rounded-t-full flex items-start justify-center">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${i === 0 ? "left-5" : "right-5"} top-6  w-4 h-4 bg-white rounded-full flex items-center justify-center transition-all duration-100`}
                style={
                  showPassword
                    ? {}
                    : getEyeMovement(10)
                }
              >
                <div
                  className={`w-2 h-2 bg-black rounded-full transition-all duration-75 ${
                    isBlinking || showPassword ? "scale-y-[0.1]" : "scale-y-100"
                  }`}
                ></div>
              </div>
            ))}
            <div
              className={`absolute top-15 w-8 h-[3px] bg-black rounded-full transition-all duration-300 ${
                isSmiling ? "scale-y-150 w-10" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="flex flex-1 items-center justify-center bg-white rounded-l-[50px] shadow-lg">
        <div className="w-80 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-500">Please enter your details</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Remember for 30 days</span>
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Log in
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Log in with Google</span>
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="#" className="text-purple-600 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
