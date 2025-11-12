import { useState } from "react";

export default function StudentProfile({image}) {
    const year = [
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
    ];

    const [profileData, setProfileData] = useState({
        fullName: "Alex Doe",
        universityEmail: "alex.doe@university.edu",
        faculty: "Computing",
        university: "University of Sri Jayewardenepura",
        expectedGraduate: year[1],
    });

    const handleProfile = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile saved successfully ✅");
    };

    return (
        <div className="min-h-screen px-10 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Profile</h2>
            </div>

            <div className="flex flex-col">
                <div className="flex gap-6 px-10 py-5 border border-gray-300 rounded-2xl mb-5">
                    <img
                        src={image}
                        alt="profile"
                        className="w-20 h-20 object-cover rounded-2xl"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold">{profileData.fullName}</p>
                        <p className="text-gray-500">{profileData.universityEmail}</p>
                    </div>
                </div>

                <div className="px-10 py-5 border border-gray-300 rounded-2xl">
                    <h2 className="text-xl font-bold mb-5">Personal Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-8">
                            <div className="flex flex-1 flex-col">
                                <label className="text-lg">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="text-gray-600 border border-gray-300 bg-gray-200 py-2 px-4 rounded-xl"
                                    value={profileData.fullName}
                                    onChange={handleProfile}
                                />
                            </div>

                            <div className="flex flex-1 flex-col">
                                <label className="text-lg">University Email</label>
                                <p className="text-gray-600 border border-gray-300 bg-gray-200 p-2 rounded-xl">
                                    {profileData.universityEmail}
                                </p>
                            </div>
                        </div>

                        <div className="text-end mt-5">
                            <button
                                type="submit"
                                className="bg-blue-600 text-lg text-white px-8 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-5 px-10 py-5 border border-gray-300 rounded-2xl">
                    <h2 className="text-xl font-bold mb-5">Academic Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-8">
                            <div className="flex flex-1 flex-col">
                                <label className="text-lg">Faculty/Sector</label>
                                <input
                                    type="text"
                                    name="faculty"
                                    className="text-gray-600 border border-gray-300 bg-gray-200 py-2 px-4 rounded-xl"
                                    value={profileData.faculty}
                                    onChange={handleProfile}
                                />
                            </div>

                            <div className="flex flex-1 flex-col">
                                <label className="text-lg">University</label>
                                <input
                                    type="text"
                                    name="university"
                                    className="text-gray-600 border border-gray-300 bg-gray-200 py-2 px-4 rounded-xl"
                                    value={profileData.university}
                                    onChange={handleProfile}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-49/100 mt-5">
                            <label className="text-lg">Expected to Graduate</label>
                            <select
                                name="expectedGraduate"
                                value={profileData.expectedGraduate}
                                onChange={handleProfile}
                                className="text-gray-800 border border-gray-300 bg-gray-200 py-2 px-4 rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400"
                            >
                                {year.map((yr, index) => (
                                    <option key={index} value={yr}>
                                        {yr}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-end mt-5">
                            <button
                                type="submit"
                                className="bg-blue-600 text-lg text-white px-8 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
