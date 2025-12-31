import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function StudentEventManager() {
    const [filter, setFilter] = useState("upcoming");
    const [search, setSearch] = useState("");
    const [state,setState] = useState(null);

    const events = [
        {
            title: "Innovator’s Pitch Night",
            club: "Entrepreneurship Club",
            date: "Mon, Oct 28, 2024 • 7:00 PM",
            location: "Business Hall, Room 301",
            type: "upcoming",
        },
        {
            title: "Fall Semester Code-a-thon",
            club: "Computer Science Society",
            date: "Sat, Nov 02, 2024 • 9:00 AM",
            location: "Online via Zoom",
            type: "upcoming",
        },
        {
            title: "Guest Speaker: Dr. Anya Sharma",
            club: "Physics & Astronomy Club",
            date: "Wed, Nov 06, 2024 • 4:30 PM",
            location: "Science Center Auditorium",
            type: "upcoming",
        },
        {
            title: "Annual Charity Gala",
            club: "Student Philanthropy Council",
            date: "Fri, Nov 15, 2024 • 6:00 PM",
            location: "Grand Ballroom",
            type: "upcoming",
        },
        {
            title: "AI in Medicine Symposium",
            club: "AI & Robotics Society",
            date: "Mon, May 6, 2024 • 10:00 AM",
            location: "Innovation Lab",
            type: "past",
        },
    ];

    const filteredEvents = events.filter(
        (event) =>
            (filter === "all" || event.type === filter) &&
            (event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.club.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-screen px-10 py-10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Event Manager</h2>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold">My Registered Events</h2>
                <p className="text-gray-400 mt-1">
                    Here is a list of all the events you’re scheduled to attend.
                </p>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-xl">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search by event title or club name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-gray-900 border border-gray-600 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex rounded-lg overflow-hidden border border-gray-700">
                    {["upcoming", "past", "all"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-5 py-2 text-sm capitalize transition text-gray-600 ${
                                filter === tab
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:bg-blue-500"
                            }`}
                            onClick={() => setFilter(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 overflow-x-auto shadow-md rounded-2xl border border-gray-700">
                <table className="w-full text-left">
                    <thead className="text-gray-100 bg-gray-400">
                    <tr>
                        <th className="py-3 px-6 font-semibold text-md">Event Title</th>
                        <th className="py-3 px-6 font-semibold text-md">Club</th>
                        <th className="py-3 px-6 font-semibold text-md">Date & Time</th>
                        <th className="py-3 px-6 font-semibold text-md">Location</th>
                        <th className="py-3 px-6 font-semibold text-md">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-700 bg-gray-100 hover:bg-skyblue hover:text-white transition"
                            >
                                <td className="py-4 px-6 font-medium hover:text-white">{event.title}</td>
                                <td className="py-4 px-6 text-gray-500 hover:text-white">{event.club}</td>
                                <td className="py-4 px-6 text-gray-500 hover:text-white">{event.date}</td>
                                <td className="py-4 px-6 text-gray-500 hover:text-white">{event.location}</td>
                                <td className="py-4 px-6">
                                    <button className="text-blue-500 hover:underline hover:text-blue-50 mr-3">
                                        View Details
                                    </button>
                                    <button className="text-red-400 hover:underline hover:text-red-50">
                                        Unregister
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-6 text-gray-400 italic"
                            >
                                No events found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
