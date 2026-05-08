import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ events = [] }) => {
    const today = new Date();

    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const handlePrev = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNext = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const dates = [];
    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let d = 1; d <= daysInMonth; d++) dates.push(d);

    return (
        <div className="bg-white rounded-xl border border-gray-300 p-6 max-w-full my-5 mx-auto shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Event Scheduled Calendar</h2>

            {/* Header */}
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

            {/* Days */}
            <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-2 text-center">
                {dates.map((day, i) => {
                    const dayEvents = events.filter(e => {
                        const d = new Date(e.date);
                        return (
                            day &&
                            d.getDate() === day &&
                            d.getMonth() === month &&
                            d.getFullYear() === year
                        );
                    });

                    return (
                        <div
                            key={i}
                            className="h-15 flex items-center justify-center cursor-pointer relative group"
                        >
                            {/* Date circle */}
                            <div
                                className={`w-10 rounded-full mx-auto 
                                    ${!day
                                        ? "text-gray-300"
                                        : dayEvents.length > 0
                                            ? "bg-blue-200 text-black font-medium"
                                            : "hover:bg-blue-100"
                                    }`}
                            >
                                {day || ""}
                            </div>

                            {/* Tooltip */}
                            {dayEvents.length > 0 && (
                                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 
                                                bg-black text-white text-xs rounded px-2 py-1 
                                                opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                                    {dayEvents.map(e => e.title).join(", ")}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;