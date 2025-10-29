import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserTie,faTriangleExclamation,faCrown,faCalendar} from '@fortawesome/free-solid-svg-icons';
import AdDetailsImage from '../assets/ad_details_image.png'

export default function ClubNotifications(){

    const Notifications = {
        common: [
            { icon: faUserTie, title: "New Registration for Tech Fest 2025", msg: "John Williamson registered for Tech Fest 2025", time: "09:00 AM", date: "2025-09-29", type: "registration", read: false },
            { icon: faTriangleExclamation, title: "Capacity alert for Code Workshop", msg: "Your event is 90% full", time: "09:00 AM", date: "2025-09-29", type: "capacity", read: false },
            { icon: faCrown, title: "Admin Approved File Screening", msg: "Your event has been approved by Admin", time: "09:00 AM", date: "2025-09-29", type: "admin", read: true },
            { icon: faCalendar, title: "Event Pass Due - Musical Show", msg: "Your event pass is due within a day", time: "09:00 AM", date: "2025-09-29", type: "deadline", read: true },
        ],
        unread: [
            { icon: faUserTie, title: "New Registration for Tech Fest 2025", msg: "John Williamson registered for Tech Fest 2025", time: "09:00 AM", date: "2025-09-29", type: "registration", read: false },
            { icon: faTriangleExclamation, title: "Capacity alert for Code Workshop", msg: "Your event is 90% full", time: "09:00 AM", date: "2025-09-29", type: "capacity", read: false },
        ],
        registrations: [
            { icon: faUserTie, title: "New Registration for Tech Fest 2025", msg: "John Williamson registered for Tech Fest 2025", time: "09:00 AM", date: "2025-09-29", type: "registration", read: false },
        ],
        adminApproval: [
            { icon: faCrown, title: "Admin Approved File Screening", msg: "Your event has been approved by Admin", time: "09:00 AM", date: "2025-09-29", type: "admin", read: true },
        ],
    };


    return (
        <div className="flex flex-col w-full">
            <h2 className="text-3xl font-bold m-2 w-[90%] mx-auto">Club Profile</h2>
            <div className="w-[90%] mx-auto">
                <div className="flex whitespace-nowrap gap-10 text-gray-600 text-lg font-semibold">
                    <div className="cursor-pointer hover:text-blue-600">All Notifications</div>
                    <div className="cursor-pointer hover:text-blue-600">Unread</div>
                    <div className="cursor-pointer hover:text-blue-600">Registration</div>
                    <div className="cursor-pointer hover:text-blue-600">Admin Updates</div>
                </div>
            </div>
        </div>
    )
};