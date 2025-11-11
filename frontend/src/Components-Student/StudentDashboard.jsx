import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Calendar from '../components/Calendar';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const registeredEvents = [
  {
    date: "TUE, DEC 12 • 7:00 PM",
    title: "Winter Music Fest",
    host: "Music Production Club",
    image: "https://picsum.photos/id/1011/800/500", // stage / concert vibe
  },
  {
    date: "THU, DEC 14 • 5:30 PM",
    title: "Hackathon Kick-off",
    host: "Coding Society",
    image: "https://picsum.photos/id/180/800/500", // laptop / code vibe
  },
];

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
];

  return (
    <div className="min-h-screen px-10 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Back, Alex!</h2>
        <p className="text-gray-400">You have 2 upcoming events this week.</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Registered Events</h2>
        <div className="flex rounded-lg overflow-hidden border-1 border-gray-300">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-gray-200 text-gray-400"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "past"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-gray-200 text-gray-400"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-10 hover:text-white">
        {registeredEvents.map((event, i) => (
          <div
            key={i}
            className="flex items-center border border-gray-700 rounded-xl p-4 cursor-pointer hover:bg-blue-200 transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-28 h-20 rounded-lg object-cover mr-4"
            />
            <div>
                <div className="text-black">
                    <p className="text-blue-400 text-xs font-semibold">
                        {event.date}
                    </p>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-gray-500 text-sm">
                        Hosted by {event.host}
                    </p>
                </div>
              
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-5">Recommended For You</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <FontAwesomeIcon icon={faBookmark} className="text-white text-sm" />
            </button>
            <div className="p-4">
              <p className="text-blue-400 text-xs font-semibold mb-1">
                {event.date}
              </p>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{event.host}</p>
              <button className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium">
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    <div>
        <Calendar/>
    </div>
    </div>
  );
}
