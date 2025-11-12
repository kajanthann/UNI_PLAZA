import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function StudentEventList() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [open, setOpen] = useState(false);
    const [openClub, setOpenClub] = useState(false);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (
                dropdownClubsRef.current &&
                !dropdownClubsRef.current.contains(event.target)
            ) {
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

    return (
        <div className="min-h-screen px-10 py-8">
            {/* Page Title */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Event Lists</h2>
            </div>

            {/* Main Layout */}
            <div className="flex gap-5">
                {/* Left Side – Event List */}
                <div className="w-3/4">
                    {/* Header Row */}
                    <div className="flex justify-between items-center gap-4 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Recommended For You
                        </h2>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search Content"
                                className="w-full border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-lg
                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                            />
                        </div>

                        {/* Sort Dropdown */}
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

                    {/* Event Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedEvents.map((event, i) => (
                            <div
                                key={i}
                                className="relative rounded-xl overflow-hidden border border-gray-700 shadow-md hover:shadow-blue-500/20 transition"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-44 object-cover"
                                />
                                <button className="absolute top-3 right-3 bg-black/40 p-2 rounded-lg hover:bg-black/60 transition">
                                    <FontAwesomeIcon
                                        icon={faBookmark}
                                        className="text-white text-sm"
                                    />
                                </button>
                                <div className="p-4">
                                    <p className="text-blue-400 text-xs font-semibold mb-1">
                                        {event.date}
                                    </p>
                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{event.host}</p>
                                    <button className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium">
                                        View Event
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side – Filter Sidebar */}
                <div className="w-1/4 mt-10">
                    <form>
                        <div className="px-6 py-8 border border-gray-200 rounded-xl">
                            {/* Category Section */}
                            <div className="flex flex-col mt-5 mx-2">
                                <h2 className="mb-2 text-2xl font-bold">Category</h2>
                                {["Academic", "Social", "Sports"].map((label, i) => (
                                    <div key={i} className="flex text-lg my-2">
                                        <input type="checkbox" className="mr-2" />
                                        <label>{label}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Event Type Section */}
                            <div className="flex flex-col mt-10 mx-2">
                                <h2 className="mb-2 text-2xl font-bold">Event Type</h2>
                                {["Workshop", "Seminar", "Social Gathering", "Performance"].map(
                                    (label, i) => (
                                        <div key={i} className="flex text-lg my-2">
                                            <input type="checkbox" className="mr-2" />
                                            <label>{label}</label>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Clubs Dropdown */}
                            <div className="flex flex-col mt-10 mx-2">
                                <label className="text-xl font-bold mb-2">Clubs</label>
                                <div
                                    className="relative inline-block text-left"
                                    ref={dropdownClubsRef}
                                >
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white transition w-full text-left"
                                        onClick={() => setOpenClub(!openClub)}
                                    >
                                        {selectedClub} ▼
                                    </button>

                                    {openClub && (
                                        <div className="absolute left-0 mt-2 w-full bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 z-50">
                                            <ul className="flex flex-col">
                                                {clubs.map((optionClubs, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSelectClub(optionClubs)}
                                                        className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                                                            selectedClub === optionClubs
                                                                ? "bg-blue-50 font-semibold text-blue-600"
                                                                : ""
                                                        }`}
                                                    >
                                                        {optionClubs}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex mt-10 mx-2 gap-4">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    type="button"
                                    className="w-1/2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
