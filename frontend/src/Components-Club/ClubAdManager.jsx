import { useEffect, useState } from 'react';
import AdImage from '../assets/adImage.png';
import AdDetailsImage from '../assets/ad_details_image.png';
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

export default function ClubAdManager() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const getActiveEvents = async () => {
    try {
      const response = await api.get('/club/active-events');

      if (response.status === 200 || response.status === 201) {
        setActiveEvents(response.data.events || []);
        console.log(response.data.events);
      }

    } catch (error) {
      alert("Error loading events. Please try again.");
      console.error('Error fetching active events:', error.response?.data || error.message);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await api.get('/club/all-events');
      if (response.status === 200 || response.status === 201) {
        setAllEvents(response.data.events || []);
        console.log(response.data.events);
      }
    } catch (error) {
      alert("Error loading events. Please try again.");
      console.error('Error fetching All events:', error.message);
    }
  }

  useEffect(() => {
    getActiveEvents();
    getAllEvents();
  }, []);

  // const getOverviews = {
  //   tableColumns: [
  //     { id: 1, PostTitle: "Tech Fest 2025: Innovation Showcase", Type: "Event", Tags: ["#IT", "#Innovation", "#Technology"], DateSubmitted: "23 Sep 2025", Status: "Pending", Action: "View" },
  //     { id: 2, PostTitle: "Music Night Fiesta 2025", Type: "Event", Tags: ["#Music", "#Culture", "#Entertainment"], DateSubmitted: "18 Sep 2025", Status: "Pending", Action: "View" },
  //     { id: 3, PostTitle: "AI & Robotics Meetup", Type: "Event", Tags: ["#AI", "#Robotics", "#Technology"], DateSubmitted: "15 Sep 2025", Status: "Approved", Action: "View" },
  //   ]
  // };

  useEffect(() => {
    const hasData = allEvents.length > 0;
    if (!hasData) setSelected(null);
  }, [allEvents]);

  const openAd = (adItem) => {
    setSelected(adItem);
    setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
    setSelected(null);
  };

  // const AdDetails = {
  //   Ads: [
  //     {
  //       Ad_id: 1,
  //       Image: AdDetailsImage,
  //       EventTitle: "Tech Fest 2025: Innovation Showcase",
  //       EventDate: "October 26, 2024",
  //       StartTime: "09:00 AM - 05:00 PM",
  //       StarHall: "University Main Auditorium",
  //       StarLocation: "https://www.google.com/",
  //       University: "University of Kelaniya",
  //       Contact: "contact@uniplaza-union.com",
  //       Description: "Join us for the annual Tech Innovate Summit, a day filled with cutting-edge technology discussions, workshops, and networking opportunities.",
  //       Phone: "071 734 2934",
  //       Tags: ["#IT", "#Innovation", "#Technology"],
  //       RelatedLinks: "Register for event",
  //       Status: "Approved",
  //       Approverfeedback: "Looks good! Event details are clear and poster is high quality. Approved for display."
  //     },
  //     {
  //       Ad_id: 2,
  //       Image: AdDetailsImage,
  //       EventTitle: "Music Night Fiesta 2025",
  //       EventDate: "November 5, 2024",
  //       StartTime: "06:00 PM - 11:00 PM",
  //       StarHall: "University Open Ground",
  //       StarLocation: "https://www.google.com/",
  //       University: "University of Sri Jayawardenepura",
  //       Contact: "events@uniplaza-union.com",
  //       Description: "Celebrate the spirit of music with performances from talented university bands, DJs, and solo artists. Enjoy the rhythm, lights, and vibes of the biggest music night of the year.",
  //       Phone: "071 712 4567",
  //       Tags: ["#Music", "#Culture", "#Entertainment"],
  //       RelatedLinks: "Buy tickets",
  //       Status: "Pending",
  //       Approverfeedback: "Needs poster resolution update before final approval."
  //     },
  //     {
  //       Ad_id: 3,
  //       Image: AdDetailsImage,
  //       EventTitle: "AI & Robotics Meetup",
  //       EventDate: "September 30, 2024",
  //       StartTime: "10:00 AM - 04:00 PM",
  //       StarHall: "Engineering Building, Hall 2",
  //       StarLocation: "https://www.google.com/",
  //       University: "University of Kelaniya",
  //       Contact: "techclub@uniplaza-union.com",
  //       Description: "Join experts and students for a full day of robotics and AI exploration. Participate in live demos, project showcases, and interactive sessions about automation and intelligent systems.",
  //       Phone: "070 542 9821",
  //       Tags: ["#AI", "#Robotics", "#Technology"],
  //       RelatedLinks: "Join Meetup",
  //       Status: "Approved",
  //       Approverfeedback: "Excellent organization and detailed description."
  //     }
  //   ]
  // };

  // const getAdsData = {
  //   AdsData: [
  //     { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
  //     { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
  //   ]
  // };

  return (
    <div className={`relative my-4 pb-10 ${open ? "bg-black/50" : "bg-white"}`}>
      <div className="mt-7 mb-4 w-92/100 mx-auto text-center md:text-left">
        <h2 className="mb-2 text-2xl md:text-3xl font-bold">Event Manager</h2>
        <p className="text-md text-gray-500">Manage your club's profile, create new advertisements, and track your campaigns.</p>
      </div>

      <div className="w-92/100 mx-auto my-5 border border-gray-300 rounded-2xl">
        <div className="w-9/10 mx-auto">
          <div className="my-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Current Active Ads</h2>
            <p className="text-base md:text-xl">Monitor and manage your club's active advertisements.</p>
          </div>
          {activeEvents.length > 0 ? (
            activeEvents.map((item, index) => (
              <div key={index} className="block md:flex my-4 bg-gray-200 rounded-2xl p-4 space-y-4 md:space-y-0 md:space-x-4">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt="" className="rounded-2xl mx-auto w-full md:w-auto" />
                <div className="block mx-4 my-4 text-center md:text-left">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <button className="bg-buttonBlue text-white rounded-2xl py-2 px-4 w-full md:w-auto" onClick={() => {
                    navigate(`/club/events/edit/${item._id}`, { state: item });
                  }}>
                    Edit
                  </button>
                </div>
              </div>
            ))) : (
            <p className="text-gray-500 my-4">
              No active events found
            </p>
          )}
        </div>
      </div>

      <div className="w-9/10 mx-auto my-5 border border-gray-300 rounded-2xl">
        <div className="w-9/10 mx-auto">
          <div className="my-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Ads Overview</h2>
          </div>
          <div className="my-5 overflow-x-auto">
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-gray-300">
                <tr className="text-gray-800 h-10">
                  <th className="w-30 text-center">Post Title</th>
                  <th className="w-10 text-center">Type</th>
                  <th className="w-25 text-center">Tags</th>
                  <th className="w-10 text-center">Date Submitted</th>
                  <th className="w-15 text-center">Status</th>
                  <th className="w-10 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allEvents.length > 0 ? (
                  allEvents.map((item, index) => (
                    <tr key={index} className="h-15 border-b border-gray-200">
                      <td className="w-30 text-center px-2">{item.title}</td>
                      <td className="w-10 text-center">{item.mode}</td>
                      <td className="w-25 text-center">
                        <div className="flex flex-wrap justify-center text-gray-600">
                          {item.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className="m-1 bg-gray-100 p-1 rounded-lg">{tag}</div>
                          ))}
                        </div>
                      </td>
                      <td className="w-10 text-center">{item.createdAt}</td>
                      <td className="w-15 text-center">{item.status}</td>
                      <td className="w-10 text-center">
                        <button
                          className="bg-buttonBlue text-white px-5 py-1 rounded-2xl"
                          onClick={() => openAd(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No Ads found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && selected && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white w-11/12 md:w-9/10 rounded-2xl shadow-lg p-3 md:p-5 max-h-[95vh] overflow-y-auto relative">
            <div className='flex w-full items-center justify-between border-b border-gray-300 pb-2 mb-4'>
              <h2 className="text-2xl md:text-3xl font-bold">Ad Details</h2>
              <button onClick={closeModel} className="text-gray-600 text-2xl hover:text-red-500 font-bold">×</button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 border border-gray-300 shadow-md rounded-lg p-3 md:p-5">
                <h2 className='text-xl font-bold'>{selected.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                  <div>
                    <p className='text-gray-500'>Event Date</p>
                    <p>{selected.date}</p>
                  </div>
                  <div>
                    <p className='text-gray-500'>Start Time</p>
                    <p>{selected.startTime}</p>
                  </div>
                </div>
                <div className='my-5'>
                  <p className='text-gray-500'>Location/Venue</p>
                  <p>{selected.location}</p>
                </div>
                <div className='my-5'>
                  <p className='text-gray-500'>University</p>
                  <p>{selected.university}</p>
                </div>
                <div className='my-5'>
                  <p className='text-gray-500'>Contact Number or Email</p>
                  <p>{selected.email}</p>
                </div>
                <div className='my-5'>
                  <p className='text-gray-500'>Description</p>
                  <p>{selected.description}</p>
                </div>
                <div className='my-5'>
                  <p className='text-gray-500'>Phone</p>
                  <p>{selected.contactNumber}</p>
                </div>
              </div>

              <div className="flex-1 space-y-5 mt-5 md:mt-0">
                <img src={`http://localhost:5000/uploads/${selected.image}`} alt="" className='w-full rounded-2xl shadow-md' />

                <div className='border border-gray-300 shadow-md rounded-lg p-3 md:p-5'>
                  <h3 className='text-lg font-bold mb-3'>Categories & Links</h3>
                  <div className='my-5'>
                    <p className='text-gray-500'>Tags</p>
                    <div className='w-full flex flex-wrap'>
                      {selected.tags && selected.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className='flex h-fit whitespace-nowrap mr-3 mb-2'>
                          <span className='flex bg-gray-300 px-2 rounded-sm'>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='mb-5'>
                    <p className='text-gray-500'>Related Links</p>
                    <p className='text-sky-500'>{selected.relatedLinks?.[0]?.url || "None"}</p>
                  </div>
                </div>

                <div className='border border-gray-300 shadow-md rounded-lg p-3 md:p-5'>
                  <h3 className='text-lg font-bold mb-3'>Approval Information</h3>
                  <div className='my-5'>
                    <p className='mb-2'>Status</p>
                    <span className='bg-blue-200 py-1 px-2 text-blue-600 rounded-xl capitalize'>{selected.status}</span>
                  </div>
                  <div className='mb-5'>
                    <p className='text-gray-500'>Approver feedback</p>
                    <p>{selected.approverFeedback || "Pending review"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
