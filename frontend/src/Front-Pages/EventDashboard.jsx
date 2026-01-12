import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

export default function EventDashboard() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("upcoming");
    const [open, setOpen] = useState(false);
    const [openClub, setOpenClub] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [eventData, setEventData] = useState({});

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleEvent = async () => {
        try{
            const events = await api.get("/events");
            if (events.status === 200) {
                setEventData(events.data);
            }
        }
        catch (error) {
            console.error(error.response?.data || error.message);
            alert("Login failed. Please try again.");
        }
    }

    const sortOptions = [
        "Sort By: Date (Newest First)",
        "Sort By: Date (Oldest First)",
        "Sort By: Alphabetical (A-Z)",
        "Sort By: Alphabetical (Z-A)",
    ];

    const clubs = [
        "All Clubs",
        "Gavel Club",
        "Rotaract Club",
        "Advancers Club",
        "Music Production Club",
        "Environmental Society",
        "AI & Robotics Society",
    ];

    const [selectedClub, setSelectedClub] = useState(clubs[0]);
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    const dropdownRef = useRef();
    const dropdownClubsRef = useRef();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (dropdownClubsRef.current && !dropdownClubsRef.current.contains(event.target)) {
                setOpenClub(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setSelectedSort(option);
        setOpen(false);
    };

    const handleSelectClub = (optionClubs) => {
        setSelectedClub(optionClubs);
        setOpenClub(false);
    };

    const recommendedEvents = [
        {
            date: "FRI, DEC 15 • 9:00 AM",
            title: "Morning Yoga Session",
            host: "Wellness Club",
            image: "https://picsum.photos/id/433/800/500",
        },
        {
            date: "FRI, DEC 15 • 6:00 PM",
            title: "Tech Talk: AI in 2024",
            host: "AI & Robotics Society",
            image: "https://picsum.photos/id/0/800/500",
        },
        {
            date: "SAT, DEC 16 • 11:00 AM",
            title: "Startup Ideation Workshop",
            host: "Entrepreneurs Club",
            image: "https://picsum.photos/id/339/800/500",
        },
        {
            date: "SUN, DEC 17 • 2:00 PM",
            title: "End of Year Campus Fair",
            host: "Student Activities Office",
            image: "https://picsum.photos/id/1039/800/500",
        },
        {
            date: "MON, DEC 18 • 5:00 PM",
            title: "Coding Marathon 2024",
            host: "Advancers Club",
            image: "https://picsum.photos/id/180/800/500",
        },
        {
            date: "WED, DEC 20 • 10:00 AM",
            title: "Public Speaking Challenge",
            host: "Gavel Club",
            image: "https://picsum.photos/id/1011/800/500",
        },
    ];

    const NewestEvenys = [
        {
            date: "FRI, DEC 15 • 9:00 AM",
            title: "Morning Yoga Session",
            host: "Wellness Club",
            image: "https://picsum.photos/id/433/800/500",
        },
        {
            date: "FRI, DEC 15 • 6:00 PM",
            title: "Tech Talk: AI in 2024",
            host: "AI & Robotics Society",
            image: "https://picsum.photos/id/0/800/500",
        },
        {
            date: "SAT, DEC 16 • 11:00 AM",
            title: "Startup Ideation Workshop",
            host: "Entrepreneurs Club",
            image: "https://picsum.photos/id/339/800/500",
        },
        {
            date: "SUN, DEC 17 • 2:00 PM",
            title: "End of Year Campus Fair",
            host: "Student Activities Office",
            image: "https://picsum.photos/id/1039/800/500",
        },
        {
            date: "MON, DEC 18 • 5:00 PM",
            title: "Coding Marathon 2024",
            host: "Advancers Club",
            image: "https://picsum.photos/id/180/800/500",
        },
        {
            date: "WED, DEC 20 • 10:00 AM",
            title: "Public Speaking Challenge",
            host: "Gavel Club",
            image: "https://picsum.photos/id/1011/800/500",
        },
    ];

    return (
        <div className="min-h-screen px-18 py-8 bg-gray-50">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Event Dashboard</h2>
            </div>

        <div className="w-full mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Newest Events
            </h2>


            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {NewestEvenys.map((event, i) => (
                        <div
                            key={i}
                            className="min-w-[280px] max-w-[280px] snap-start rounded-xl overflow-hidden border border-gray-300 shadow-md hover:shadow-blue-500/20 transition"
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-44 object-cover"
                            />

                            <button className="absolute top-3 right-3 bg-black/40 p-2 rounded-lg hover:bg-black/60 transition">
                                <FontAwesomeIcon icon={faBookmark} className="text-white text-sm" />
                            </button>

                            <div className="p-4">
                                <p className="text-blue-400 text-xs font-semibold mb-1">
                                    {event.date}
                                </p>

                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-gray-400 text-sm mb-3">{event.host}</p>

                                <button
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium"
                                    onClick={() =>
                                        navigate(`/EventDashboard/adview/${i + 1}`, {
                                            state: event,
                                        })
                                    }
                                >
                                    View Event
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex">
                <div className="w-full">

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Recommended For You
                        </h2>

                        <div className="flex items-center gap-3">

                            <div className="relative w-64">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search Content"
                                    className="w-full border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                />
                            </div>

                            <div className="relative inline-block text-left" ref={dropdownRef}>
                                <button
                                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white transition"
                                    onClick={() => setOpen(!open)}
                                >
                                    {selectedSort} ▼
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 z-50">
                                        <ul className="flex flex-col">
                                            {sortOptions.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelect(option)}
                                                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                                                        selectedSort === option
                                                            ? "bg-blue-50 font-semibold text-blue-600"
                                                            : ""
                                                    }`}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedEvents.map((event, i) => (
                            <div
                                key={i}
                                className="relative rounded-xl overflow-hidden border border-gray-300 shadow-md hover:shadow-blue-500/20 transition"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-44 object-cover"
                                />

                               <button
                                    onClick={handleBookmark}
                                    className={`absolute top-3 right-3 p-2 rounded-lg hover:bg-black/60 transition 
                                        ${isBookmarked ? "bg-yellow-300" : "bg-black/40"}`}
                                >
                                    <FontAwesomeIcon icon={faBookmark} className="text-white text-sm" />
                                </button>


                                <div className="p-4">
                                    <p className="text-blue-400 text-xs font-semibold mb-1">
                                        {event.date}
                                    </p>

                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{event.host}</p>

                                    <button
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium"
                                        onClick={() =>
                                            navigate(`/EventDashboard/adview/${i + 1}`, {
                                                state: event,
                                            })
                                        }
                                    >
                                        View Event
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
