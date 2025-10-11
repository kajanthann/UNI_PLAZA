import React from "react";
import {useFormik} from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import LoginImage from "../assets/loginImage.png"
import LoginSlider from "../components/LoginSlider";

export default function LoginStudent(){
    const [submitData,setSubmitData] = useState(null);


    const formik = useFormik({
        initialValues: {
            username:"",
            password:"",
        },
        enableReinitialize:true,
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            password: Yup.string()
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
        <div className="min-h-screen flex flex-col">
            <div className="max-w-full">
                <main>
                    <div className="relative flex flex-col">
                        <img src={LoginImage} alt="" className="w-4/5 opacity-60 mx-auto text-center my-10"/>
                        <div className="bg-white w-3/10 absolute transform translate-y-0 left-10/20 top-2/10 rounded-2xl">
                            <div className="px-10 py-15">
                                <LoginSlider/>
                                <form action="">
                                    <div className="">

                                        <div className="h-15 my-8">
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="Enter your Email as Username"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.subject}
                                                className={`pl-4 w-full py-2 border-b-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                    formik.touched.username && formik.errors.username ? "border-red-500" : "border-black"
                                                }`}
                                            />
                                            {formik.touched.username && formik.errors.username && (
                                                <div className="text-red-500 text-sm">{formik.errors.username}</div>
                                            )}
                                        </div>
                                        <div className="h-15 my-8">
                                            <input
                                                id="password"
                                                name="password"
                                                type="text"
                                                placeholder="Enter your Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.subject}
                                                className={`pl-4 w-full py-2 border-b-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                    formik.touched.password && formik.errors.password ? "border-red-500" : "border-black"
                                                }`}
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
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
                                            <p className="me-1">Register your club</p>
                                            <a href="" className="text-blue-600">Click Here</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}