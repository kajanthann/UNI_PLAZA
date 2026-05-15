import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import LoginImage from "../assets/loginImage.png";
import LogoImage from "../assets/logoImage.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faEye,
    faEyeSlash,
    faEnvelope,
    faLock
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginClub() {

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const navigate = useNavigate();

    const passwordShow = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .email("Invalid email")
                .required("Email is required"),

            password: Yup.string()
                .required("Password is required"),
        }),

        onSubmit: async (values) => {
            try {

                const response = await api.post("/club/login", {
                    officialEmail: values.username,
                    password: values.password,
                });

                if (response.status === 200) {

                    localStorage.setItem("token", response.data.cToken);
                    
                    alert("User logged in successfully!");

                    navigate("/Club/dashboard");
                }

            } catch (error) {

                console.error(
                    error.response?.data || error.message
                );

                alert(
                    error.response?.data?.message ||
                    "Login failed. Please try again."
                );
            }
        },
    });
    

    return (
        <div className="min-h-screen flex flex-col">

            <div className="w-full">

                <main>

                    <div>

                        <img
                            src={LoginImage}
                            alt=""
                            className="md:flex hidden relative w-full md:w-full opacity-70"
                        />

                        <div className="bg-white w-9/10 my-5 md:my-0 mx-auto border border-gray-200 px-3 py-5 md:w-2/5 md:absolute transform translate-y-0 md:top-1/5 md:left-1/3 rounded-2xl shadow-lg">

                            <div>

                                <img
                                    src={LogoImage}
                                    alt=""
                                    className="w-1/2 mx-auto my-5"
                                />

                                <div className="text-center">

                                    <h2 className="text-4xl font-bold mb-4">
                                        Welcome Back!
                                    </h2>

                                    <span>
                                        Access your university events, manage clubs,
                                        or administrate the platform
                                    </span>

                                </div>
                            </div>

                            <div className="w-6/7 mx-auto md:py-15">

                                <form onSubmit={formik.handleSubmit}>

                                    {/* EMAIL */}
                                    <div className="h-20 my-8 relative">

                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            size={"lg"}
                                            className="text-gray-400 absolute transform translate-y-3 left-1/50"
                                        />

                                        <input
                                            id="username"
                                            name="username"
                                            type="email"
                                            placeholder="john.doe@university.edu"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.username}
                                            className={`pl-10 w-full py-2 text-black bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${formik.touched.username &&
                                                formik.errors.username
                                                ? "border-red-500"
                                                : "border-gray-400"
                                                }`}
                                        />

                                        <FontAwesomeIcon
                                            icon={faCircleUser}
                                            size={"lg"}
                                            className="absolute transform translate-y-3 left-47/50"
                                        />

                                        {formik.touched.username &&
                                            formik.errors.username && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {formik.errors.username}
                                                </div>
                                            )}
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="h-20 relative">

                                        <FontAwesomeIcon
                                            icon={faLock}
                                            size={"lg"}
                                            className="text-gray-400 absolute transform translate-y-3 left-1/50"
                                        />

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                passwordVisibility
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            className={`pl-10 w-full py-2 text-black bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${formik.touched.password &&
                                                formik.errors.password
                                                ? "border-red-500"
                                                : "border-gray-400"
                                                }`}
                                        />

                                        <p
                                            className="absolute transform translate-y-0 bottom-10/25 left-47/50 cursor-pointer"
                                            onClick={passwordShow}
                                        >
                                            {passwordVisibility ? (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                    size={"lg"}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    size={"lg"}
                                                />
                                            )}
                                        </p>

                                        {formik.touched.password &&
                                            formik.errors.password && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {formik.errors.password}
                                                </div>
                                            )}
                                    </div>

                                    {/* REMEMBER + FORGOT */}
                                    <div className="flex items-center justify-between w-full h-15 my-5">

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                className="w-4 h-4"
                                            />

                                            <label
                                                htmlFor="remember"
                                                className="text-md"
                                            >
                                                Remember Me
                                            </label>
                                        </div>

                                        <Link
                                            to="/ForgotPassword"
                                            className="text-blue-500 underline text-md"
                                        >
                                            Forgot Password?
                                        </Link>

                                    </div>

                                    {/* LOGIN BUTTON */}
                                    <button
                                        type="submit"
                                        className="w-full bg-buttonBlue text-white px-5 py-3 rounded-xl mb-8"
                                    >
                                        Log In
                                    </button>

                                    {/* REGISTER */}
                                    <div className="flex w-fit mx-auto">

                                        <p className="me-1">
                                            Don't have an account?
                                        </p>

                                        <Link
                                            to="/RegisterClub"
                                            className="text-blue-600"
                                        >
                                            Register Now
                                        </Link>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}