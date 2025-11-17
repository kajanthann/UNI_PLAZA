import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserTie,faTriangleExclamation,faCrown,faCalendar} from '@fortawesome/free-solid-svg-icons';
import AdDetailsImage from '../assets/ad_details_image.png'
import {useState} from "react";

export default function StudentNotifications(){
    const [common,setCommon] = useState(true);
    const [unread, setUnread] = useState(false);
    const [register,setRegister] = useState(false);
    const [adminApprove,setAdminApprove] = useState(false);

    const [openModel, setOpenModel] = useState(false);

    const [selectedNotification, setSelectedNotification] = useState(null);

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
        // adminApproval: [
        //     { icon: faCrown, title: "Admin Approved File Screening", msg: "Your event has been approved by Admin", time: "09:00 AM", date: "2025-09-29", type: "admin", read: true },
        // ],
    };

    const functionChange = (bool1,bool2,bool3,bool4)=>{
        setCommon(bool1);
        setUnread(bool2);
        setRegister(bool3);
        setAdminApprove(bool4);
    }


    return (
        <div className={`relative flex flex-col w-full min-h-screen my-4`}>
            <h2 className="text-3xl font-bold mb-2 w-93/100 mx-auto">Students Notifications</h2>
            <div className="flex w-92/100 mx-auto">
                <div className="w-5/7 mr-4">
                    <div className="flex justify-end my-3">
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-blue-100 p-2 text-skyblue font-semibold rounded-lg">Delete All</button>
                            <button className="bg-blue-100 p-2 text-skyblue font-semibold rounded-lg">Mark All as Read</button>
                        </div>
                    </div>
                    <div className="flex whitespace-nowrap gap-10 text-gray-600 text-lg font-semibold mb-5">
                        <div className={`cursor-pointer hover:text-blue-600 w-1/4 ${common ? "border-b-2 border-buttonBlue text-buttonBlue":"text-black"}`} onClick={()=>(functionChange(true,false,false,false))}>All Notifications</div>
                        <div className={`cursor-pointer hover:text-blue-600 w-1/4 ${unread ? "border-b-2 border-buttonBlue text-buttonBlue":"text-black"}`} onClick={()=>(functionChange(false,true,false,false))}>Unread
                            <span> ({Notifications.unread.length})</span>
                        </div>
                        <div className={`cursor-pointer hover:text-blue-600 w-1/4 ${register ? "border-b-2 border-buttonBlue text-buttonBlue":"text-black"}`} onClick={()=>(functionChange(false,false,true,false))}>Registration
                            <span> ({Notifications.registrations.length})</span>
                        </div>
                        {/*<div className={`cursor-pointer hover:text-blue-600 w-1/4 ${adminApprove ? "border-b-2 border-buttonBlue text-buttonBlue":"text-black"}`} onClick={()=>(functionChange(false,false,false,true))}>Admin Updates*/}
                        {/*    <span> ({Notifications.adminApproval.length})</span>*/}
                        {/*</div>*/}
                    </div>
                    <div className="w-full my-5">
                        {
                            common && (
                                <>
                                    {
                                        Notifications.common.map((item, index) => (
                                            <div key={index} className="flex items-center mb-5 hover:cursor-pointer bg-gray-100 rounded-2xl"
                                                onClick={() => {
                                                        setSelectedNotification(item);
                                                        setOpenModel(true);
                                                    }}>
                                                <div className="w-1/7">
                                                    <div className="w-fit mx-auto">
                                                        <FontAwesomeIcon icon={item.icon} size={"xl"}/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-5/7">
                                                    <span className="font-bold text-lg">{item.title}</span>
                                                    <span>{item.msg}</span>
                                                </div>
                                                <div className="flex w-1/7">
                                                    <span className="flex text-center items-end">{item.time}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }

                        {
                            unread && (
                                <>
                                    {
                                        Notifications.unread.map((item, index) => (
                                            <div key={index} className="flex items-center mb-5 hover:cursor-pointer bg-gray-100 rounded-2xl"
                                                onClick={() => {
                                                            setSelectedNotification(item);
                                                            setOpenModel(true);
                                                        }}>
                                                <div className="w-1/7">
                                                    <div className="w-fit mx-auto">
                                                        <FontAwesomeIcon icon={item.icon} size={"xl"}/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-5/7">
                                                    <span className="font-bold text-lg">{item.title}</span>
                                                    <span>{item.msg}</span>
                                                </div>
                                                <div className="flex w-1/7">
                                                    <span className="flex text-center items-end">{item.time}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }

                        {
                            register && (
                                <>
                                    {
                                        Notifications.registrations.map((item, index) => (
                                            <div key={index} className="flex items-center mb-5 hover:cursor-pointer bg-gray-100 rounded-2xl"
                                                onClick={() => {
                                                            setSelectedNotification(item);
                                                            setOpenModel(true);
                                                        }}>
                                                <div className="w-1/7">
                                                    <div className="w-fit mx-auto">
                                                        <FontAwesomeIcon icon={item.icon} size={"xl"}/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-5/7">
                                                    <span className="font-bold text-lg">{item.title}</span>
                                                    <span>{item.msg}</span>
                                                </div>
                                                <div className="flex w-1/7">
                                                    <span className="flex text-center items-end">{item.time}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }

                        {/*{*/}
                        {/*    adminApprove && (*/}
                        {/*        <>*/}
                        {/*            {*/}
                        {/*                Notifications.adminApproval.map((item, index) => (*/}
                        {/*                    <div key={index} className="flex items-center mb-5 hover:cursor-pointer bg-gray-100 rounded-2xl">*/}
                        {/*                        <div className="w-1/7">*/}
                        {/*                            <div className="w-fit mx-auto">*/}
                        {/*                                <FontAwesomeIcon icon={item.icon} size={"xl"}/>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                        <div className="flex flex-col w-5/7">*/}
                        {/*                            <span className="font-bold text-lg">{item.title}</span>*/}
                        {/*                            <span>{item.msg}</span>*/}
                        {/*                        </div>*/}
                        {/*                        <div className="flex w-1/7">*/}
                        {/*                            <span className="flex text-center items-end">{item.time}</span>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                ))*/}
                        {/*            }*/}
                        {/*        </>*/}
                        {/*    )*/}
                        {/*}*/}

                    </div>
                </div>
                <div  className="w-2/7 border border-gray-300 p-3 rounded-2xl">
                    <h3 className="text-2xl font-bold">Quick Status</h3>
                    <div className="flex my-5 bg-blue-100 border border-blue-400 rounded-xl">
                        <div className="w-fit m-4">
                            <h3 className="text-lg font-bold mb-1">New Registrations</h3>
                            <span className="text-3xl font-bold mb-1">12</span>
                            <p>new students registered in last 24h</p>
                        </div>
                    </div>
                    <div className="flex my-5 bg-blue-100 border border-blue-400 rounded-xl mb-5">
                        <div className="w-fit m-4">
                            <h3 className="text-lg font-bold mb-1">Urgent Issues</h3>
                            <span className="text-3xl font-bold mb-1">1</span>
                            <p>event requires approval</p>
                        </div>
                    </div>
                    <div className="flex my-5 bg-blue-100 border border-blue-400 rounded-xl mb-5">
                        <div className="w-fit m-4">
                            <h3 className="text-lg font-bold mb-1">Upcoming Deadlines</h3>
                            <span className="text-3xl font-bold mb-1">2</span>
                            <p>Days to closes the Tech Workshop registration</p>
                        </div>
                    </div>
                    <div className="flex my-5 bg-blue-100 border border-blue-400 rounded-xl mb-5">
                        <div className="w-fit m-4">
                            <h3 className="text-lg font-bold mb-1">Total Unread</h3>
                            <span className="text-3xl font-bold">25</span>
                        </div>
                    </div>
                </div>
            </div>
            {openModel && selectedNotification && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/55 z-50">
                    <div className="bg-white w-11/12 md:w-1/2 lg:w-3/7 rounded-2xl shadow-lg p-6 relative">

                        <button
                            onClick={() => setOpenModel(false)}
                            className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
                        >
                            ×
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <FontAwesomeIcon icon={selectedNotification.icon} size="xl" className="text-blue-600"/>
                            <h2 className="text-2xl font-bold">{selectedNotification.title}</h2>
                        </div>

                        <p className="text-gray-700 text-lg py-5">{selectedNotification.msg}</p>

                        <div className="flex justify-between mt-5 text-gray-500">
                            <span><strong>Date:</strong> {selectedNotification.date}</span>
                            <span><strong>Time:</strong> {selectedNotification.time}</span>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="text-gray-500  font-medium text-md border-1 border-gray-400 hover:bg-gray-500 hover:text-white py-2 px-4 rounded-md"
                            >
                                Delete Message
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-md py-2 px-4 rounded-md"
                            >
                                Mark as Read
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};