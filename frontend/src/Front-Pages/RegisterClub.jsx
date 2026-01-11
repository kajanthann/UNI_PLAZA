import { useFormik } from "formik";
import * as Yup from "yup";
import api from '../api/axios'
import { useState, useEffect } from "react";
import VerifyEmail from "../Components/VerifyEmail.jsx";

export default function RegisterClub() {
    const [register, setRegister] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const formik = useFormik({
        initialValues: {
            clubName: "",
            university: "",
            clubEmail: "",
            fullName: "",
            email: "",
            role: "",
            phone: "",
            logo: "",
            description: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: Yup.object({
            clubName: Yup.string().required("Club name is required"),
            university: Yup.string().required("University is required"),
            clubEmail: Yup.string().email("Invalid email"),
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            role: Yup.string().required("Role is required"),
            phone: Yup.string().required("Phone number is required"),
            description: Yup.string().required("Description is required"),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),

        onSubmit: async (values) => {
            try {
                setUploading(true);

                let logoUrl = "";

                // Upload file if exists
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    // Assuming you have an endpoint for file upload
                    const uploadResponse = await api.post("/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    logoUrl = uploadResponse.data.url;
                }

                const response = await api.post("/register", {
                    role: values.role,
                    clubName: values.clubName,
                    university: values.university,
                    image: logoUrl,
                    description: values.description,
                    officialEmail: values.clubEmail,
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    phone: values.phone,
                });

                if (response.status === 200) {
                    alert("Your Club Registered successfully!");
                    setRegister(true);
                    setVerifyEmail(values.email);
                    formik.resetForm();
                    setFile(null);
                    setPreview(null);
                }
            } catch (error) {
                console.error(error.response?.data || error.message);
                alert("Club Register failed. Please try again.");
            } finally {
                setUploading(false);
            }
        },
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validate file size (2MB = 2 * 1024 * 1024 bytes)
        if (selectedFile.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB");
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(selectedFile.type)) {
            alert("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
            return;
        }

        setFile(selectedFile);

        // Create preview URL
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);

        // Set the file in formik values if needed for validation
        formik.setFieldValue("logo", selectedFile.name); // Store only the name, not the file object
    };

    // Cleanup preview URL on unmount
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="md:w-7/10 mx-auto my-7">
            <div>
                <h2 className="mb-7 text-3xl font-bold md:w-full w-9/10 mx-auto">
                    Welcome to Uni-plaza Club Portal !
                </h2>

                <div className="flex md:gap-6">
                    <div className="hidden md:flex md:w-1/4 bg-buttonBlue rounded-2xl">
                        <div className="w-17/20 mx-auto text-white flex flex-col justify-center items-center h-screen">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Connect your Club</h2>
                                <h2 className="text-2xl font-bold mb-8">Grow your community</h2>
                                <p className="leading-7 mb-4">
                                    Uni-plaza Club Portal is designed to empower university
                                    organizations. Easily manage your club's presence, attract new
                                    members, and organize events with our intuitive tools.
                                </p>
                                <ul className="list-inside list-disc leading-7">
                                    <li>Reach a wider student audience</li>
                                    <li>Simplify event promotion</li>
                                    <li>Engage your members effectively</li>
                                    <li>Access exclusive campus resources</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-9/10 md:w-3/4 border-1 rounded-2xl">
                        <div className="w-9/10 mx-auto my-5">
                            <h2 className="text-xl font-bold mb-4 text-center">
                                Club/Community Registration
                            </h2>

                            <p className="mb-5">
                                Register your university club or community to unlock full access
                                to the Uni-plaza platform.
                            </p>

                            <form onSubmit={formik.handleSubmit}>
                                <h2 className="text-lg font-bold mb-4">Club Information</h2>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="block">
                                        <label className="block">Club/Community Name
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="clubName"
                                            placeholder="Innovation Club"
                                            className="bg-gray-200 p-2 w-full rounded-xl"
                                            {...formik.getFieldProps("clubName")}
                                        />
                                        {formik.touched.clubName && formik.errors.clubName && (
                                            <p className="text-red-500 text-sm">
                                                {formik.errors.clubName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="block">
                                        <label className="block">Affiliated university
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="university"
                                            placeholder="University of ######"
                                            className="bg-gray-200 p-2 w-full rounded-xl"
                                            {...formik.getFieldProps("university")}
                                        />
                                        {formik.touched.university && formik.errors.university && (
                                            <p className="text-red-500 text-sm">
                                                {formik.errors.university}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label>Official Club Email Address (Optional)</label>
                                    <input
                                        type="text"
                                        name="clubEmail"
                                        placeholder="club@example.edu"
                                        className="bg-gray-200 p-2 w-full rounded-xl"
                                        {...formik.getFieldProps("clubEmail")}
                                    />
                                    {formik.touched.clubEmail && formik.errors.clubEmail && (
                                        <p className="text-red-500 text-sm">
                                            {formik.errors.clubEmail}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-lg font-bold mb-2">
                                        Representative Information
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div className="block">
                                            <label className="block">Full Name
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="John Doe"
                                                className="bg-gray-200 p-2 w-full rounded-xl"
                                                {...formik.getFieldProps("fullName")}
                                            />
                                            {formik.touched.fullName && formik.errors.fullName && (
                                                <p className="text-red-500 text-sm">
                                                    {formik.errors.fullName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="block">
                                            <label className="block">Email
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="jane.doe@example.com"
                                                className="bg-gray-200 p-2 w-full rounded-xl"
                                                {...formik.getFieldProps("email")}
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <p className="text-red-500 text-sm">
                                                    {formik.errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="block">
                                            <label className="block">Role
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="role"
                                                placeholder="President, Secretary, Head of Events"
                                                className="bg-gray-200 p-2 w-full rounded-xl"
                                                {...formik.getFieldProps("role")}
                                            />
                                            {formik.touched.role && formik.errors.role && (
                                                <p className="text-red-500 text-sm">
                                                    {formik.errors.role}
                                                </p>
                                            )}
                                        </div>

                                        <div className="block">
                                            <label className="block">Phone number
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="+1 (555) 123-4567"
                                                className="bg-gray-200 p-2 w-full rounded-xl"
                                                {...formik.getFieldProps("phone")}
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <p className="text-red-500 text-sm">
                                                    {formik.errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-lg font-bold mb-2">Branding</h2>

                                    <div className="mb-4">
                                        <label className="flex">
                                            Club Logo/Banner Image Upload
                                            <span className="text-red-600 text-xl">*</span>
                                        </label>
                                        <label
                                            htmlFor="poster"
                                            className="block border-2 border-dashed border-gray-300 bg-gray-200 rounded-2xl p-6 text-center text-gray-500 text-sm cursor-pointer hover:bg-gray-100"
                                        >
                                            Upload your club logo or banner here (Max 2MB)
                                        </label>
                                        <input
                                            id="poster"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        {file && (
                                            <div className="mt-2">
                                                <p className="text-gray-600">Selected file: {file.name}</p>
                                                {preview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">Preview:</p>
                                                        <img
                                                            src={preview}
                                                            alt="Preview"
                                                            className="mt-1 h-24 w-24 object-cover rounded border"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {/* Show error if needed */}
                                        {formik.submitCount > 0 && !file && (
                                            <p className="text-red-500 text-sm mt-1">Club logo is required</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label>Brief Description
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            placeholder="Share your club's mission, values, and regular activities. This will appear on your public profile."
                                            className="bg-gray-200 p-2 w-full rounded-xl"
                                            {...formik.getFieldProps("description")}
                                        />
                                        {formik.touched.description && formik.errors.description && (
                                            <p className="text-red-500 text-sm">
                                                {formik.errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h2 className="text-lg font-bold mb-4">Account Setup</h2>

                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div className="block">
                                            <label className="block">Create a password
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter a strong Password"
                                                className="bg-gray-200 p-2 w-full rounded-xl"
                                                {...formik.getFieldProps("password")}
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <p className="text-red-500 text-sm">
                                                    {formik.errors.password}
                                                </p>
                                            )}
                                        </div>

                                        <div className="block">
                                            <label className="block">Confirm Password
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm Your Password"
                                                className="bg-gray-200 p-2 w-full rounded-xl"
                                                {...formik.getFieldProps("confirmPassword")}
                                            />
                                            {formik.touched.confirmPassword &&
                                                formik.errors.confirmPassword && (
                                                    <p className="text-red-500 text-sm">
                                                        {formik.errors.confirmPassword}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-buttonBlue text-center text-white w-full p-2 rounded-2xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={uploading}
                                >
                                    {uploading ? "Registering..." : "Register Club"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {register && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <VerifyEmail
                        email={verifyEmail}
                        closeModal={() => setRegister(false)}
                    />
                </div>
            )}
        </div>
    );
}