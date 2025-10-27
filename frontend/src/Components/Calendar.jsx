import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
    const [month, setMonth] = useState(7);
    const [year, setYear] = useState(2025);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const events = [13, 26];

    const handlePrev = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else setMonth(month - 1);
    };

    const handleNext = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else setMonth(month + 1);
    };

    const dates = [];
    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let d = 1; d <= daysInMonth; d++) dates.push(d);

    return (
        <div className="bg-white rounded-xl border border-gray-300 p-6 max-w-full my-5 mx-auto shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Event Scheduled Calendar</h2>

            <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-3 rounded-lg mb-4">
                <button onClick={handlePrev}>
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-semibold">
          {months[month]} {year}
        </span>
                <button onClick={handleNext}>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {dates.map((day, i) => (
                    <div
                        key={i}
                        className={`h-15 flex items-center justify-center cursor-pointer
              
            `}
                    >
                        <div className={`w-10 rounded-full mx-auto ${!day ? "text-gray-300"
                            : events.includes(day)
                                ? "bg-blue-200 text-black font-medium"
                                : "hover:bg-blue-100"}`}>
                            {day || ""}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
