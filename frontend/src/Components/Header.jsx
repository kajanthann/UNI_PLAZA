import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faBars, faTimes, faGear, faTableColumns,faHome,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import LogoImage from '../assets/logo.jpg';
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Header({ name, role , image, type }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) =>{
        navigate(path);
    }

    const Clublogin = () =>{
        navigate("/LoginClub");
    }

    const Studentlogin = () =>{
        navigate("/LoginStudent");
    }

    const guestLinks = [
        { label: "Home", href: "#Home" },
        { label: "Events", href: "#Events" },
        { label: "About Us", href: "#Footer" },
        { label: "Feedback", href: "#Feedback" },
    ];

    const studentClubLinks = [
        { icon: faHome, label: "Home", href: "/Home" },
        { icon: faRightFromBracket, label: "LogOut", href: "#" },
    ];

    const LoginRegisterLinks = [
        { label: "Home", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Event Dashboard", href: "#" }
    ];

    const linksToShow = (role === "Student" || role === "Club")
        ? studentClubLinks
        : (type === "Home" ? guestLinks : LoginRegisterLinks);


    return (
        <nav className="bg-white shadow-md w-full z-50 relative">
            <div className="w-9/10 mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 w-1/4">
                        <img src={LogoImage} alt="Logo" className="w-14" />
                    </div>

                    <div className="hidden md:flex md:items-center w-full">
                        <div className={`flex ${role === "Student" || role === "Club" ? "w-9/20 ml-10 space-x-40" : "w-1/2 space-x-14"}`}>
                            {linksToShow.map((link, idx) => (
                                <div key={idx}>
                                    {role === "Student" || role === "Club" ? (
                                        <NavLink
                                            to={link.href}
                                            className="headerLink font-medium text-black hover:text-blue-600 flex items-center"
                                        >
                                            {link.icon && <FontAwesomeIcon icon={link.icon} className="mr-2" />}
                                            {link.label}
                                        </NavLink>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="headerLink font-medium text-black hover:text-blue-600"
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                </div>
                            ))}

                        </div>


                        <div className="relative mx-4 flex-1 max-w-md w-1/5">
                            <input
                                type="text"
                                placeholder="Search Content"
                                className="w-3/4 h-3/4 border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>

                        {role === ""  ? (
                            <>
                                {type === "Home" && (
                                    <div className="flex space-x-8">
                                        <button className="bg-skyblue text-white px-5 py-2 rounded-2xl" onClick={()=>{handleNavigation('/LoginClub')}}>Clubs</button>
                                        <button className="bg-skyblue text-white px-5 py-2 rounded-2xl" onClick={()=>{handleNavigation('/LoginStudent')}}>Students</button>
                                    </div>
                                )}
                                {(type === "LoginClub" || type === "RegisterClub") && (
                                    <div className="flex space-x-8">
                                        <button className="bg-skyblue text-white px-5 py-2 rounded-2xl" onClick={()=>{handleNavigation('/LoginStudent')}}>Login as Student</button>
                                    </div>
                                )}
                                {(type === "LoginStudent" || type === "RegisterStudent") && (
                                    <div className="flex space-x-8">
                                        <button className="bg-skyblue text-white px-5 py-2 rounded-2xl" onClick={()=>{handleNavigation('/LoginClub')}}>Login as Club</button>
                                    </div>
                                )}
                            </>


                        ) : (
                            <div className="flex space-x-4 items-center">
                                <button className="text-black text-2xl ps-2 pe-4 rounded-2xl">
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                                <div className="flex space-x-4">
                                    <div className="text-left items-center">
                                        <p className="text-sm">Hello!</p>
                                        <p className="font-semibold">{name}</p>
                                    </div>
                                    <img src={image} alt="Profile" className="w-13 h-13 rounded-full border" />
                                </div>
                            </div>
                        )}
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
                        {linksToShow.map((link, idx) => (
                            <a key={idx} href={link.href} className="block font-medium">
                                {link.label}
                            </a>
                        ))}

                        {role === "" && (
                            <>
                                <a href="#" className="block font-medium">Login as Club</a>
                                <a href="#" className="block font-medium">Login as Student</a>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
