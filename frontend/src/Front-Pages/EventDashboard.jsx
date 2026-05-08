import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

export default function EventDashboard() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [newEvents, setNewEvents] = useState([]);
    const [events, setEvents] = useState([]);

    const [selectedSort, setSelectedSort] = useState("Sort By: Date (Newest First)");
    const [searchText, setSearchText] = useState(""); // ✅ search state

    const dropdownRef = useRef();

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    // ✅ API CALLS
    const getNewEvents = async () => {
        try {
            const res = await api.get('/events/newest-events');
            setNewEvents(res.data.events);
        } catch (err) {
            console.error(err);
        }
    };

    const getAllNewEvents = async () => {
        const res = await api.get('/events/all-new-events');
        setEvents(res.data.events);
    };

    const getAllOldEvents = async () => {
        const res = await api.get('/events/all-old-events');
        setEvents(res.data.events);
    };

    const getATZEvents = async () => {
        const res = await api.get('/events/all-ATZ-events');
        setEvents(res.data.events);
    };

    const getZTAEvents = async () => {
        const res = await api.get('/events/all-ZTA-events');
        setEvents(res.data.events);
    };

    // ✅ SEARCH FUNCTION
    const searchEvents = async (text) => {
        try {
            const res = await api.get(`/events/search?query=${text}`);
            setEvents(res.data.events);
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ SORT OPTIONS
    const sortOptions = [
        { label: "Sort By: Date (Newest First)", action: getAllNewEvents },
        { label: "Sort By: Date (Oldest First)", action: getAllOldEvents },
        { label: "Sort By: Alphabetical (A-Z)", action: getATZEvents },
        { label: "Sort By: Alphabetical (Z-A)", action: getZTAEvents },
    ];

    // ✅ Handle sort
    const handleSelect = (option) => {
        setSelectedSort(option.label);
        option.action();
        setOpen(false);
    };

    // ✅ Initial load
    useEffect(() => {
        getNewEvents();
        getAllNewEvents();
    }, []);

    // ✅ SEARCH (Debounced)
    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchText.trim() === "") {
                getAllNewEvents();
            } else {
                searchEvents(searchText);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [searchText]);

    // Close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen px-18 py-8 bg-gray-50">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Event Dashboard</h2>
            </div>

            {/* NEWEST EVENTS */}
            <div className="w-full mb-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Newest Events
                </h2>

                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {newEvents && newEvents.length > 0 ? (
                        newEvents.map((event) => (
                            <div
                                key={event._id}
                                className="min-w-[280px] max-w-[280px] snap-start rounded-xl overflow-hidden border border-gray-300 shadow-md hover:shadow-blue-500/20 transition"
                            >
                                <img src={event.image} alt={event.title} className="w-full h-44 object-cover" />

                                <button className="absolute top-3 right-3 bg-black/40 p-2 rounded-lg hover:bg-black/60 transition">
                                    <FontAwesomeIcon icon={faBookmark} className="text-white text-sm" />
                                </button>

                                <div className="p-4">
                                    <p className="text-blue-400 text-xs font-semibold mb-1">
                                        {new Date(event.date).toDateString()} • {event.startTime}
                                    </p>

                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{event.clubName}</p>

                                    <button
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium"
                                        onClick={() =>
                                            navigate(`/EventDashboard/adview/${event._id}`, { state: event })
                                        }
                                    >
                                        View Event
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No Newest Events within 48 hours</p>
                    )}
                </div>
            </div>

            {/* MAIN EVENTS */}
            <div className="flex">
                <div className="w-full">

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Recommended For You
                        </h2>

                        <div className="flex items-center gap-3">

                            {/* SEARCH */}
                            <div className="relative w-64">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Content"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                />
                            </div>

                            {/* SORT */}
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
                                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                >
                                                    {option.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="relative rounded-xl overflow-hidden border border-gray-300 shadow-md hover:shadow-blue-500/20 transition"
                            >
                                <img src={event.image} alt={event.title} className="w-full h-44 object-cover" />

                                <button
                                    onClick={handleBookmark}
                                    className={`absolute top-3 right-3 p-2 rounded-lg hover:bg-black/60 transition 
                                        ${isBookmarked ? "bg-yellow-300" : "bg-black/40"}`}
                                >
                                    <FontAwesomeIcon icon={faBookmark} className="text-white text-sm" />
                                </button>

                                <div className="p-4">
                                    <p className="text-blue-400 text-xs font-semibold mb-1">
                                        {new Date(event.date).toDateString()} • {event.startTime}
                                    </p>

                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{event.clubName}</p>

                                    <button
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium"
                                        onClick={() =>
                                            navigate(`/EventDashboard/adview/${event._id}`, { state: event })
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