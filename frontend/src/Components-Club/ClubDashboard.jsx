import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarCheck,faUsers,faHourglassHalf,faClipboardList,faUtensils,faFileAlt,faPlus,} from "@fortawesome/free-solid-svg-icons";
import Calendar from '../components/Calendar';
import { useNavigate } from "react-router-dom";

export default function ClubDashboard() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path)
    }
  const stats = [
    {
      title: "Active Events",
      value: 4,
      change: "+1 from last week",
      color: "text-green-600",
    },
    {
      title: "New Registrations",
      value: 28,
      change: "+15% from last week",
      color: "text-green-600",
    },
    {
      title: "Pending Approvals",
      value: 2,
      change: "Action required",
      color: "text-yellow-600",
    },
  ];

  const events = [
    {
      name: "Intro to AI Workshop",
      date: "Oct 25, 2023",
      location: "Eng. Building, Rm 201",
      registrations: "45 / 50",
    },
    {
      name: "Annual Hackathon",
      date: "Nov 5–7, 2023",
      location: "Main Auditorium",
      registrations: "112 / 150",
    },
    {
      name: "Guest Speaker: Tech Innovations",
      date: "Nov 15, 2023",
      location: "Lecture Hall C",
      registrations: "89 / 100",
    },
  ];

  const deadlines = [
    {
      icon: faCalendarCheck,
      title: "Venue Booking for Hackathon",
      due: "Due in 2 days",
      color: "text-red-400",
    },
    {
      icon: faUtensils,
      title: "Catering Confirmation",
      due: "Due in 5 days",
      color: "text-yellow-600",
    },
    {
      icon: faFileAlt,
      title: "Submit Annual Report",
      due: "Due in 14 days",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="min-h-screen text-black px-10 py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Robotics Club!</h2>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg flex items-center gap-2 font-medium text-white" onClick={()=>(handleNavigation('/Clubads'))}>
          <FontAwesomeIcon icon={faPlus} />
          Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-blue-100 border border-blue-400 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-gray-500 text-sm">{item.title}</h3>
            <h2 className="text-4xl font-bold mt-1 mb-2">{item.value}</h2>
            <p className={`${item.color} text-sm`}>{item.change}</p>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-violet-100 lg:col-span-2 p-6 rounded-xl shadow-md border border-violet-400">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
            <button className="text-blue-600 hover:underline text-sm" onClick={()=>(handleNavigation('/Clubadmanager'))}>
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
              {events.map((event, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-buttonBlue hover:text-white transition"
                >
                  <td className="py-3 font-medium">{event.name}</td>
                  <td className="py-3 text-gray-500 hover:text-white">{event.date}</td>
                  <td className="py-3 text-gray-500 hover:text-white">{event.location}</td>
                  <td className="py-3 text-gray-500 hover:text-white">{event.registrations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="flex flex-col gap-4">
            {deadlines.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-200 border border-gray-700"
              >
                <FontAwesomeIcon icon={item.icon} className={`${item.color} text-lg`} />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className={`${item.color} text-sm`}>{item.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <Calendar/>
      </div>
    </div>
  );
}
