import React, { useEffect, useState } from "react";

const Animation = () => {
  // 🎨 Uni Plaza logo color palette
  const colors = [
    "bg-[#7B3FF2]/90", // Purple
    "bg-[#FF5C8D]/90", // Pink
    "bg-[#FFB347]/90", // Orange
    "bg-[#4FA3FF]/90", // Blue
    "bg-[#C66BFF]/90", // Light Violet
  ];

  const [circles, setCircles] = useState([]);
  const text = "Loading...";

  useEffect(() => {
    const createCircles = () => {
      const randomCircles = Array.from({ length: 25 }, () => ({
        color: colors[Math.floor(Math.random() * colors.length)],
        top: Math.random() * 100 - 50,
        left: Math.random() * 100 - 50,
        delay: Math.random() * 0.8,
        size: 15 + Math.random() * 25,
        id: Math.random(),
      }));
      setCircles(randomCircles);
    };

    createCircles();
    const interval = setInterval(createCircles, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* 🌈 Continuous Burst Circles */}
      <div className="relative w-52 h-52 flex items-center justify-center">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={`absolute rounded-full ${circle.color} animate-burst`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              top: `calc(50% + ${circle.top}px)`,
              left: `calc(50% + ${circle.left}px)`,
              animationDelay: `${circle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* ✨ Floating “Loading...” Text */}
      <div className="flex space-x-1 mt-6 text-4xl font-bold text-gray-800 font-[Comic_Sans_MS]">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block animate-float-letter"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* 🎨 Animations */}
      <style>
        {`
          @keyframes burst {
            0% { transform: scale(0); opacity: 1; }
            60% { transform: scale(2.3); opacity: 0.9; }
            100% { transform: scale(3.2); opacity: 0; }
          }
          .animate-burst {
            animation: burst 2s ease-out forwards;
          }

          @keyframes floatLetter {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float-letter {
            display: inline-block;
            animation: floatLetter 1.4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Animation;
