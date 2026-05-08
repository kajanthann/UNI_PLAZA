import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState, useEffect } from "react";

export default function ClubDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [statsData, setStatsData] = useState({
    activeEvents: 0,
    newRegistrations: 0,
    pendingApprovals: 0,
  });

  const [deadlines, setDeadlines] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const handleNavigation = (path) => navigate(path);

  // =========================
  // GET EVENT STATS
  // =========================

  const getEventsDetails = async () => {
    try {

      const res = await api.get("/club/events-details");

      if (res.data.success) {
        setStatsData(res.data.data);
      }

    } catch (err) {
      console.error("Stats Error:", err.response?.data || err.message);
    }
  };

  // =========================
  // GET UPCOMING EVENTS
  // =========================

  const getEvents = async () => {
    try {

      const res = await api.get("/club/upcoming-events");

      if (res.data.success) {
        setEvents(res.data.events || []);
      }

    } catch (err) {
      console.error("Events Error:", err.response?.data || err.message);
    }
  };

  // =========================
  // GET DEADLINES
  // =========================

  const getDeadlines = async () => {
    try {

      const res = await api.get("/club/upcoming-events-deadlines");

      if (res.data.success) {
        setDeadlines(res.data.events || []);
      }

    } catch (err) {
      console.error("Deadlines Error:", err.response?.data || err.message);
    }
  };

  // =========================
  // GET CALENDAR EVENTS
  // =========================

  const getCalendarDates = async () => {
    try {

      const res = await api.get("/club/events-calender");

      if (res.data.success) {
        setCalendarEvents(res.data.events || []);
      }

    } catch (err) {
      console.error("Calendar Error:", err.response?.data || err.message);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    getEventsDetails();
    getEvents();
    getDeadlines();
    getCalendarDates();

  }, []);

  // =========================
  // STATS
  // =========================

  const stats = [
    {
      title: "Active Events",
      value: statsData.activeEvents,
      change: "+ updated",
      color: "text-green-600",
    },
    {
      title: "New Registrations",
      value: statsData.newRegistrations,
      change: "+ updated",
      color: "text-green-600",
    },
    {
      title: "Pending Approvals",
      value: statsData.pendingApprovals,
      change: "Action required",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen text-black px-10 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h2 className="text-3xl font-bold">
          Welcome back, Robotics Club!
        </h2>

        <button
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg flex items-center gap-2 font-medium text-white"
          onClick={() => handleNavigation("/Clubads")}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create New Event
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-blue-100 border border-blue-400 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-gray-500 text-sm">
              {item.title}
            </h3>

            <h2 className="text-4xl font-bold mt-1 mb-2">
              {item.value}
            </h2>

            <p className={`${item.color} text-sm`}>
              {item.change}
            </p>
          </div>
        ))}

      </div>

      {/* EVENTS TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-violet-100 lg:col-span-2 p-6 rounded-xl shadow-md border border-violet-400">

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-lg font-semibold">
              Upcoming Events
            </h3>

            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => handleNavigation("/Clubadmanager")}
            >
              View All
            </button>

          </div>

          <table className="w-full text-left text-sm">

            <thead className="border-b border-gray-600 text-gray-400 uppercase">
              <tr>
                <th className="pb-3 text-blue-700">Event Name</th>
                <th className="pb-3 text-blue-700">Date</th>
                <th className="pb-3 text-blue-700">Location</th>
                <th className="pb-3 text-blue-700">Registrations</th>
              </tr>
            </thead>

            <tbody>

              {events.length > 0 ? (

                events.map((event) => (

                  <tr key={event._id}>

                    <td className="py-3 font-medium">
                      {event.title}
                    </td>

                    <td className="py-3">
                      {event.date
                        ? new Date(event.date).toDateString()
                        : "N/A"}
                    </td>

                    <td className="py-3">
                      {event.location || "N/A"}
                    </td>

                    <td className="py-3">
                      {event.registrationsCount || 0}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4" className="py-5 text-center text-gray-500">
                    No upcoming events
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* DEADLINES */}
        <div className="p-6 rounded-xl shadow-md border border-gray-300">

          <h3 className="text-lg font-semibold mb-4">
            Upcoming Deadlines
          </h3>

          <div className="flex flex-col gap-4">

            {deadlines.length > 0 ? (

              deadlines.map((item, i) => (

                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-200"
                >

                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="text-red-400"
                  />

                  <div>

                    <p className="font-medium">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-600">
                      {item.date
                        ? new Date(item.date).toDateString()
                        : "N/A"}
                    </p>

                  </div>

                </div>

              ))

            ) : (

              <p className="text-gray-500">
                No deadlines available
              </p>

            )}

          </div>

        </div>

      </div>

      {/* CALENDAR */}
      <div className="mt-10">
        <Calendar events={calendarEvents} />
      </div>

    </div>
  );
}