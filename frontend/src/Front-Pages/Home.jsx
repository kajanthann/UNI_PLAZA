import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {useFormik} from "formik";
import * as Yup from "yup";
import HeroImage from '../assets/heroImage1.png'
import PostImage from '../assets/postImage.png'
import FeedbackImage from '../assets/feedbackImage.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Home(){
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            subject: "",
            message: ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required("Full Name is required"),
            email: Yup.string().email("Invalid Email").required("Email is required"),
            subject: Yup.string().required("Subjects is required"),
            message: Yup.string().min(10,"Message too small").required("Message is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            alert("Feedback submitted!");
            resetForm();
        },

    })
    

    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main>
                <section className="flex justify-center w-full">
                    <div className="relative my-5 w-full md:w-10/12 md:rounded-3xl bg-blue-100 p-6 md:p-16 h-9/10">

                        <img src={HeroImage} alt="Hero" className="mx-auto md:w-full" />

                        <div className="absolute top-1/2 left-1/2 md:left-4/10 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-6/10 text-left">
                            <h1 className="font-extrabold text-2xl md:text-4xl mb-4">
                                Connect, Explore, Thrive with Uni Plaza
                            </h1>
                            <p className="text-lg md:text-2xl font-mono mb-6">
                                Your central hub for student life and club activities. Discover events, manage your club, and build your community.
                            </p>
                            <button className="bg-sky-500 text-white px-6 py-3 rounded-2xl text-lg md:text-xl hover:bg-sky-600 transition">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </section>



                <section className="flex justify-center w-full mt-4 mb-10">
                    <div className="container w-8/10 md:w-9/10 mx-auto">
                        <div className="ml-17 my-8 text-5xl text-skyblue">Latest Events</div>
                        <div className="md:grid md:grid-cols-3 md:gap-5">
                        <div className="mx-auto rounded-3xl shadow-lg sm:pb-5 sm:mb-8">
                            <img src={PostImage} alt="" className="w-full rounded-t-3xl" />
                            <div className="mx-auto w-9/10 my-8 md:my-3">
                                <h2 className="font-bold text-xl font-alan pb-2">Rotract Club Member Registration</h2>
                                <p className="pb-1 text-gray-500">June 01,2024</p>
                                <p className="text-gray-500 pb-5">Rotaract club - University of Kelaniya</p>
                                <div className="flex justify-between mt-2">
                                    <div className="px-4 py-1 text-blue-600 rounded-2xl" style={{backgroundColor:'#BBDEFB'}}>
                                        social
                                    </div>
                                    <div className="px-4 py-1 text-white bg-skyblue rounded-2xl">
                                        Interested
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mx-auto rounded-3xl shadow-lg sm:pb-5 sm:mb-8">
                            <img src={PostImage} alt="" className="w-full rounded-t-3xl" />
                            <div className="mx-auto w-9/10 my-3">
                                <h2 className="font-bold text-xl font-alan pb-2">Rotract Club Member Registration</h2>
                                <p className="pb-1 text-gray-500">June 01,2024</p>
                                <p className="text-gray-500 pb-5">Rotaract club - University of Kelaniya</p>
                                <div className="flex justify-between mb-8 mt-2">
                                    <div className="px-4 py-1 text-blue-600 rounded-2xl" style={{backgroundColor:'#BBDEFB'}}>
                                        social
                                    </div>
                                    <div className="px-4 py-1 text-white bg-skyblue rounded-2xl">
                                        Interested
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto rounded-3xl shadow-lg sm:pb-5 sm:mb-8">
                            <img src={PostImage} alt="" className="w-full rounded-t-3xl" />
                            <div className="mx-auto w-9/10 my-3">
                                <h2 className="font-bold text-xl font-alan pb-2">Rotract Club Member Registration</h2>
                                <p className="pb-1 text-gray-500">June 01,2024</p>
                                <p className="text-gray-500 pb-5">Rotaract club - University of Kelaniya</p>
                                <div className="flex justify-between mb-8 mt-2">
                                    <div className="px-4 py-1 text-blue-600 rounded-2xl" style={{backgroundColor:'#BBDEFB'}}>
                                        social
                                    </div>
                                    <div className="px-4 py-1 text-white bg-skyblue rounded-2xl">
                                        Interested
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-full my-8">
                    <div className="md:w-9/10 bg-navyblue text-white mx-auto p-20 rounded-2xl">
                        <div className="flex w-7/10 items-center justify-center">
                            <div>
                            <h2 className="text-4xl m-4">Manage Your Club. Maximize Your Impact.</h2>
                            <p className="m-4">Uni plaza provides dedicated tools for your club's success.
                                Seamlessly create events, manage your member roster, handle registrations, and
                                communicate with your community - all from one centralized dashboard.
                                Ready to elevate your club's visibility on campus?</p>
                            <div className="flex space-x-8 p-4">
                                <button className="bg-skyblue text-white px-5 py-2 rounded-2xl">Sign In</button>
                                <button className="bg-skyblue text-white px-5 py-2 rounded-2xl">Register</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-full">
                    <div className="md:w-9/10 md:mx-auto">
                        <h2 className="flex justify-center text-4xl">Give us a Feedback</h2>
                        <div className="block md:grid md:grid-cols-2">
                            <div className="flex ml-5">
                                <div className="w-8/10 mx-auto">
                                    <img src={FeedbackImage} alt="" className="flex justify-center mx-auto items-center"/>
                                </div>
                            </div>
                            <div>
                                <div className="md:w-9/10 my-15">
                                <form action="">
                                    <div className="md:w-6/10 w-8/10 mx-auto">
                                    <div className="h-22">
                                        <label htmlFor="fullName" className="block font-medium mb-1">Full Name</label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="Enter your name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullName}
                                            className={`pl-4 w-full py-2 rounded-xl bg-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                formik.touched.fullName && formik.errors.fullName ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.fullName && formik.errors.fullName && (
                                            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                                        )}
                                    </div>
                                    <div className="h-22">
                                        <label htmlFor="email" className="block font-medium mb-1">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your Email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            className={`pl-4 w-full py-2 rounded-xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="h-22">
                                        <label htmlFor="subject" className="block font-medium mb-1">Subject</label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            placeholder="Enter your Subject"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.subject}
                                            className={`pl-4 w-full py-2 rounded-xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                formik.touched.subject && formik.errors.subject ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.subject && formik.errors.subject && (
                                            <div className="text-red-500 text-sm">{formik.errors.subject}</div>
                                        )}
                                    </div>
                                    <div className="h-22">
                                        <label htmlFor="message" className="block font-medium mb-1">Message</label>
                                        <textarea rows="5"
                                            id="message"
                                            name="message"
                                            placeholder="Enter your Message"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullName}
                                            className={`pl-4 w-full py-2 rounded-xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                                                formik.touched.message && formik.errors.message ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.message && formik.errors.message && (
                                            <div className="text-red-500 text-sm">{formik.errors.message}</div>
                                        )}
                                    </div>
                                    <button type="submit" className="mt-28 w-full bg-skyblue text-white px-5 py-2 rounded-xl">Submit Feedback</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}