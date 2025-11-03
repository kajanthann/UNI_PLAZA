import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSlider({ type }) {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    console.log(type);

    const handleNavigate = (path,bool) => {
        setActive(bool);
        navigate(path);
    };

    return (
        <div className="w-full flex border-2 border-buttonBlue items-center mx-4 mb-15 rounded-full cursor-pointer">
            <div
                className={`flex-1 text-center py-4 rounded-full transition-all duration-300 ${
                    !active ? "bg-buttonBlue text-white" : "bg-white text-black"
                }`}
                onClick={() => {
                    setActive(false);
                    handleNavigate("/LoginClub",false);
                }}
            >
                Log In
            </div>

            <div
                className={`flex-1 text-center py-4 rounded-full transition-all duration-300 ${
                    active ? "bg-buttonBlue text-white" : "bg-white text-black"
                }`}
                onClick={() => {
                    setActive(true);
                    handleNavigate("/RegisterClub",true);
                }}
            >
                Sign Up
            </div>
        </div>
    );
}
