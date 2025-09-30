import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LogoImage from "../assets/logo.jpg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full fixed z-50">
      <div className="w-9/10 mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold w-1/4">
            <img src={LogoImage} alt="Logo" className="w-14" />
          </div>

          <div className="hidden md:flex md:items-center w-full">
            <div className="flex space-x-10 w-1/2 md:space-x-15">
              <a href="#" className="font-medium hover:text-blue-600">
                Home
              </a>
              <a href="#" className="font-medium hover:text-blue-600">
                Events
              </a>
              <a href="#" className="font-medium hover:text-blue-600">
                About Us
              </a>
              <a href="#" className="font-medium hover:text-blue-600">
                Feedback
              </a>
            </div>

            <div className="relative mx-4 flex-1 max-w-md w-1/5">
              <input
                type="text"
                placeholder="Search Content"
                className="w-3/4 h-3/4 border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>

            <div className="flex space-x-8">
              <button className="bg-skyblue text-white px-5 py-2 rounded-2xl">
                Clubs
              </button>
              <button className="bg-skyblue text-white px-5 py-2 rounded-2xl">
                Students
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/*<div className="relative mt-2">*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Search Content"*/}
            {/*        className="w-full border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"*/}
            {/*    />*/}
            {/*    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">*/}
            {/*        <FontAwesomeIcon icon={faSearch} />*/}
            {/*    </div>*/}
            {/*</div>*/}

            <a href="#" className="block font-medium">
              Home
            </a>
            <a href="#" className="block font-medium">
              Events
            </a>
            <a href="#" className="block font-medium">
              About Us
            </a>
            <a href="#" className="block font-medium">
              Feedback
            </a>
            <a href="#" className="block font-medium">
              Login as Club
            </a>
            <a href="#" className="block font-medium">
              Login as Student
            </a>

            {/*<div className="flex space-x-4 mt-2">*/}
            {/*    <button className="bg-sky-500 text-white px-5 py-2 rounded-2xl w-full">Clubs</button>*/}
            {/*    <button className="bg-sky-500 text-white px-5 py-2 rounded-2xl w-full">Students</button>*/}
            {/*</div>*/}
          </div>
        </div>
      )}
    </nav>
  );
}
