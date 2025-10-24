import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTableColumns,
    faCalendarDays,
    faEnvelope,
    faComments,
    faUser,
    faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
    const sliderOptions = {
        Club: [
            { icon: faTableColumns, text: "Dashboard", link: "/Clubdashboard" },
            { icon: faCalendarDays, text: "Ads", link: "/Clubads" },
            { icon: faEnvelope, text: "Notifications", link: "/Clubnotifications" },
            { icon: faComments, text: "Feedback", link: "/Clubfeedback" },
            { icon: faUser, text: "My Profile", link: "/Clubprofile" },
            { icon: faSliders, text: "Settings", link: "/Clubsettings" },
        ],
        Student: [
            { icon: faTableColumns, text: "Dashboard", link: "/Studentdashboard" },
            { icon: faCalendarDays, text: "Event List", link: "/Studentevenlist" },
            { icon: faEnvelope, text: "Notifications", link: "/Studentnotifications" },
            { icon: faComments, text: "Feedback", link: "/Studentfeedback" },
            { icon: faUser, text: "My Profile", link: "/Studentprofile" },
            { icon: faSliders, text: "Settings", link: "/Studentsettings" },
        ],
    };

    if (!sliderOptions[role]) {
        return <p className="text-center text-gray-500 mt-10">Invalid role</p>;
    }

    return (
        <div className="bg-white min-h-full pt-10 border-r-2 border-gray-200 shadow-lg">
            <nav className="text-black w-64 p-4 space-y-10">
                {sliderOptions[role].map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.link}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-skyblue hover:text-gray-100 text-black"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-lg" />
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
