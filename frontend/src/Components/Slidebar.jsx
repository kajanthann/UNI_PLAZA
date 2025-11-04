import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faCalendarDays,
  faEnvelope,
  faComments,
  faUser,
  faSliders,
  faBarsProgress,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import LogoImage from "../assets/logoImage.jpg";

export default function Sidebar({ role, menuOpen, setMenuOpen }) {
  const sliderOptions = {
    Club: [
      { icon: faTableColumns, text: "Dashboard", link: "/Clubdashboard" },
      { icon: faCalendarDays, text: "Create Ads", link: "/Clubads" },
      { icon: faBarsProgress, text: "Ad Manager", link: "/Clubadmanager" },
      { icon: faEnvelope, text: "Notifications", link: "/Clubnotifications" },
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
    <div className="w-full h-full md:z-0 z-50 relative">
      {/* 🖥️ Desktop Sidebar */}
      <div className="hidden md:flex bg-white min-h-full pt-10 border-r-2 border-gray-200 shadow-lg">
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

      {/* 📱 Mobile Sidebar with Animation */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Sliding Menu */}
        <div
          className={`absolute top-0 left-0 h-full w-3/5 sm:w-1/2 bg-white border-r-2 border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between w-full p-4 border-b border-gray-300">
            <div className="flex-shrink-0 w-9/10 mx-auto">
              <img src={LogoImage} alt="Logo" className="w-24" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          <nav className="text-black w-64 p-4 space-y-8">
            {sliderOptions[role].map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={() => setMenuOpen(false)}
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
      </div>
    </div>
  );
}
