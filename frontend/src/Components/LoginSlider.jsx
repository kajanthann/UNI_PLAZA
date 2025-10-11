import React, { useState } from "react";

export default function LoginSlider() {
    const [active, setActive] = useState(false);

    return (
        <div className="flex border-2 border-buttonBlue items-center mx-4 mb-15 rounded-full cursor-pointer">
            <div
                className={`flex-1 text-center py-4 rounded-full transition-all duration-300 ${
                    !active ? "bg-buttonBlue text-white" : "bg-white text-black"
                }`}
                onClick={() => setActive(false)}>
                Log In
            </div>

            <div
                className={`flex-1 text-center py-4 rounded-full transition-all duration-300 ${
                    active ? "bg-buttonBlue text-white" : "bg-white text-black"
                }`}
                onClick={() => setActive(true)}
            >
                Sign Up
            </div>
        </div>
    );
}
