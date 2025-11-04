import React from "react";
import {useFormik} from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
<<<<<<< HEAD
import LoginImage from "../assets/loginbg.jpg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {faCircleUser, faEnvelope, faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../assets/logoImage.jpg";
=======
import LoginImage from "../assets/loginImage.png"
import LoginSlider from "../components/LoginSlider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {faCircleUser, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
>>>>>>> 2de20495273c670a5121d6069acabae2de7604f7

export default function LoginStudent(){
    const [submitData,setSubmitData] = useState(null);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const passwordShow = () =>{
        setPasswordVisibility(!passwordVisibility);
    }

    const formik = useFormik({
        initialValues: {
            student_username:"",
            student_password:"",
        },
        enableReinitialize:true,
        validationSchema: Yup.object().shape({
            student_username: Yup.string().required('Username is required'),
            student_password: Yup.string()
                .min(8,'Password must be at least 8 characters')
                .required('Password is required')
                .matches(/[A-Z]/, 'Must contain uppercase')
                .matches(/[a-z]/, 'Must contain lowercase')
                .matches(/[0-9]/, 'Must contain number'),
        }),
        onSubmit: (values) =>{
            setSubmitData(values);
        },
    })
    return(
<<<<<<< HEAD
        <div className="min-h-screen flex flex-col">
            <div className="w-full">
                <main>
                    <div className="">
                        <img src={LoginImage} alt="" className="md:flex hidden relative w-full md:w-full opacity-70"/>
                        <div className="bg-white w-9/10 my-5 md:my-0 mx-auto border border-gray-200 px-3 py-5 md:w-2/5 md:absolute transform translate-y-0 md:top-1/5 md:left-1/3 rounded-2xl shadow-lg">
                            <div>
                                <img src={LogoImage} alt="" className="w-1/2 mx-auto my-5"/>
                                <div className="text-center">
                                    <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                                    <span>Access your university events, manage clubs, or administrator the platform</span>
                                </div>
                            </div>

                            <div className="w-6/7 mx-auto md:py-15">
                                <form action="">
                                    <div className="">
                                        <div className="h-15 my-8 relative">
                                            <FontAwesomeIcon icon={faEnvelope} size={"lg"} className="text-gray-400 absolute transform translate-y-3 left-1/50"/>
=======
        <div className="md:min-h-screen flex flex-col">
            <div className="md:max-w-full md:flex hidden mx-auto">
                <main>
                    <div className="relative flex flex-col">
                        <img src={LoginImage} alt="" className="w-full md:w-9/10 opacity-60 mx-auto text-center my-10"/>
                        <div className="bg-white w-2/3 md:w-3/10 absolute transform translate-y-0 left-1/3 md:left-10/20 top-1/14 md:top-2/10 rounded-2xl">
                            <div className="px-10 md:py-15">
                                <LoginSlider type="LoginStudent" />
                                <form action="">
                                    <div className="">

                                        <div className="h-15 my-8 relative">
>>>>>>> 2de20495273c670a5121d6069acabae2de7604f7
                                            <input
                                                id="student_password"
                                                name="student_password"
                                                type="text"
                                                placeholder="john.doe@university.edu"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.subject}
<<<<<<< HEAD
                                                className={`pl-10 w-full py-2 border-b-2 text-black bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                    formik.touched.username && formik.errors.username ? "border-red-500" : "border-black"
                                                }`}
                                            />
                                            <FontAwesomeIcon icon={faCircleUser} size={"lg"} className="absolute transform translate-y-3 left-47/50"/>
                                            {formik.touched.username && formik.errors.username && (
                                                <div className="text-red-500 text-sm">{formik.errors.username}</div>
                                            )}

                                        </div>
                                        <div className="h-15 relative">
                                            <FontAwesomeIcon icon={faLock} size={"lg"} className="text-gray-400 absolute transform translate-y-3 left-1/50"/>
                                            <input
                                                id="password"
                                                name="password"
                                                type={passwordVisibility ? "text":"password"}
                                                placeholder="Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.subject}
                                                className={`pl-10 w-full py-2 border-b-2 text-black bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                    formik.touched.password && formik.errors.password ? "border-red-500" : "border-black"
=======
                                                className={`pl-4 w-full py-2 border-b-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                    formik.touched.student_username && formik.errors.student_username ? "border-red-500" : "border-black"
                                                }`}
                                            />
                                            <FontAwesomeIcon icon={faCircleUser} size={"lg"} className="absolute transform translate-y-3 left-47/50"/>
                                            {formik.touched.student_username && formik.errors.student_username && (
                                                <div className="text-red-500 text-sm">{formik.errors.student_username}</div>
                                            )}

                                        </div>
                                        <div className="h-15 my-8 relative">
                                            <input
                                                id="student_password"
                                                name="student_password"
                                                type={passwordVisibility ? "text":"password"}
                                                placeholder="Enter your Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.subject}
                                                className={`pl-4 w-full py-2 border-b-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                    formik.touched.student_password && formik.errors.student_password ? "border-red-500" : "border-black"
>>>>>>> 2de20495273c670a5121d6069acabae2de7604f7
                                                }`}
                                            />
                                            <p className="absolute transform translate-y-0 bottom-10/25 left-47/50 normalButton" onClick={passwordShow}>
                                                {passwordVisibility ?
                                                    (<FontAwesomeIcon icon={faEyeSlash} size={"lg"}/>) :
                                                    (<FontAwesomeIcon icon={faEye} size={"lg"}/>)
                                                }
                                            </p>
<<<<<<< HEAD
                                            {formik.touched.password && formik.errors.password && (
                                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between w-full h-15 my-5">
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="remember" className="w-4 h-4" />
                                                <label htmlFor="remember" className="text-md">Remember Me</label>
=======
                                            {formik.touched.student_password && formik.errors.student_password && (
                                                <div className="text-red-500 text-sm">{formik.errors.student_password}</div>
                                            )}
                                        </div>
                                        <div className="flex w-full h-15">
                                            <div className="flex w-2/3 justify-center mx-auto">
                                                <p className="me-1">Forget Password?</p>
                                                <a href="" className="text-blue-600">Click Here</a>
>>>>>>> 2de20495273c670a5121d6069acabae2de7604f7
                                            </div>
                                            <a href="#" className="text-blue-500 underline text-md">Forgot Password?</a>
                                        </div>
                                        <button type="submit" className="w-full bg-buttonBlue text-white px-5 py-3 rounded-xl mb-8">Log In</button>
<<<<<<< HEAD
                                        <div className="flex w-fit mx-auto">
                                            <p className="me-1">Didn't have an account</p>
                                            <Link to='/RegisterClub' className="text-blue-600">Register Now</Link>
=======
                                        <div className="flex">
                                            <p className="me-1">Register as Club</p>
                                            <Link to="/RegisterClub" className="text-blue-600">Click Here</Link>
>>>>>>> 2de20495273c670a5121d6069acabae2de7604f7
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <div className="md:hidden w-4/5 mx-auto shadow-lg rounded-2xl min-h-screen">
                <main className="">
                    <div className="p-5">
                        <LoginSlider/>
                        <form action="">
                            <div className="">

                                <div className="h-15 my-8 relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter your Email as Username"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subject}
                                        className={`pl-4 w-full py-2 border-b-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                            formik.touched.student_username && formik.errors.student_username ? "border-red-500" : "border-black"
                                        }`}
                                    />
                                    <FontAwesomeIcon icon={faCircleUser} size={"lg"} className="absolute transform translate-y-3 left-47/50"/>
                                    {formik.touched.student_username && formik.errors.student_username && (
                                        <div className="text-red-500 text-sm">{formik.errors.student_username}</div>
                                    )}

                                </div>
                                <div className="h-15 my-8 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={passwordVisibility ? "text":"password"}
                                        placeholder="Enter your Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subject}
                                        className={`pl-4 w-full py-2 border-b-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                            formik.touched.student_password && formik.errors.student_password ? "border-red-500" : "border-black"
                                        }`}
                                    />
                                    <p className="absolute transform translate-y-0 bottom-10/25 left-47/50 normalButton" onClick={passwordShow}>
                                        {passwordVisibility ?
                                            (<FontAwesomeIcon icon={faEyeSlash} size={"lg"}/>) :
                                            (<FontAwesomeIcon icon={faEye} size={"lg"}/>)
                                        }
                                    </p>
                                    {formik.touched.student_password && formik.errors.password && (
                                        <div className="text-red-500 text-sm">{formik.errors.student_password}</div>
                                    )}
                                </div>
                                <div className="flex w-full h-15">
                                    <div className="flex w-1/2 justify-center mx-auto">
                                        <p className="me-1">Forget Password?</p>
                                        <a href="" className="text-blue-600">Click Here</a>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-buttonBlue text-white px-5 py-3 rounded-xl mb-8">Log In</button>
                                <div className="flex">
                                    <p className="me-1">Register as Club</p>
                                    {/*<a href= className="text-blue-600">Click Here</a>*/}
                                    <Link to="/RegisterClub" className="text-blue-600">Click Here</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}