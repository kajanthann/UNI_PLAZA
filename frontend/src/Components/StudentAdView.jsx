import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendar,faLocationDot,faDollarSign,faChevronRight,} from "@fortawesome/free-solid-svg-icons";
import {faFacebook,faTwitter,faInstagram,} from "@fortawesome/free-brands-svg-icons";
import { useLocation, useParams } from "react-router-dom";

const StudentAdView = () => {
  const { state } = useLocation();
  const { adId } = useParams();

  // Validate state coming from navigation
  if (!state) {
    return <p className="text-white p-5">⚠️ No data received for Ad ID {adId}</p>;
  }

  const [AdData] = useState(state);

  return (
    <div className="min-h-screen text-black px-6 md:px-16 py-10">
      <img
        src={AdData.image}
        alt="Event Banner"
        className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
      />

      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3">

          <h1 className="text-4xl font-bold">{AdData.title}</h1>

          <p className="text-gray-300 mt-3 text-lg">{AdData.description}</p>
          <div className="flex gap-3 mt-4">
            {AdData.tags?.map((t, i) => (
              <span
                key={i}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl mt-8 border border-gray-700">
            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/lego/6.jpg"
                alt="Club Logo"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Hosted by The Coding Club</p>
                <p className="text-sm text-gray-400">View Club Profile</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
          </div>
          <div className="flex gap-10 mt-10 border-b border-gray-700 pb-2">
            <button className="text-white font-semibold border-b-2 border-white pb-1">
              About
            </button>
            <button className="text-gray-700 hover:text-skyblue">Prerequisites</button>
            <button className="text-gray-700 hover:text-skyblue">Contact</button>
          </div>
          <div className="mt-6 text-gray-500 leading-7">
            <h2 className="text-xl font-semibold mb-3">Event Description</h2>
            <p className="mb-4">
              Ready to build your first website? This workshop is designed for absolute beginners…
            </p>
          </div>
        </div>
        <div className="lg:w-1/3 shadow-xl rounded-xl p-6 border border-gray-700 h-fit">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-6">
            Register Now
          </button>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-400 uppercase text-sm mb-1">
                Date & Time
              </h4>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} />
                {AdData.Date}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-400 uppercase text-sm mb-1">
                Location
              </h4>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} />
                {AdData.Location}
              </p>
              <p className="text-blue-400 text-sm cursor-pointer hover:underline">
                View on map
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-400 uppercase text-sm mb-1">
                Price
              </h4>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faDollarSign} />
                Free
              </p>
            </div>
            <div className="pt-4">
              <h4 className="font-semibold mb-3">Share with friends</h4>
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faFacebook} className="text-xl cursor-pointer" />
                <FontAwesomeIcon icon={faTwitter} className="text-xl cursor-pointer" />
                <FontAwesomeIcon icon={faInstagram} className="text-xl cursor-pointer" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdView;
