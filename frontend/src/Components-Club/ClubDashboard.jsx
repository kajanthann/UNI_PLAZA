import AdImage from '../assets/adImage.png'
import AdDetailsImage from '../assets/ad_details_image.png'
import Calendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';


export default function ClubDashboard(){
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) =>{
        navigate(path);
    }
    
    const getOverviews = {
        tableColumns: [
            { id: 1, PostTitle: "Tech Fest 2025: Innovation Showcase", Type: "Event", Tags: ["#IT", "#Innovation", "#Technology"], DateSubmitted: "23 Sep 2025", Status: "Pending", Action: "View" },
            { id: 2, PostTitle: "Music Night Fiesta 2025", Type: "Event", Tags: ["#Music", "#Culture", "#Entertainment"], DateSubmitted: "18 Sep 2025", Status: "Pending", Action: "View" },
            { id: 3, PostTitle: "AI & Robotics Meetup", Type: "Event", Tags: ["#AI", "#Robotics", "#Technology"], DateSubmitted: "15 Sep 2025", Status: "Approved", Action: "View" },
        ]
    };

    useEffect(() => {
        const hasData = getOverviews.tableColumns.length > 0;
        if (!hasData) setSelected(null);
    }, [getOverviews.tableColumns]);
    
    
    const openAd = (adItem) => {
        const adData = AdDetails.Ads.find(a => a.Ad_id === adItem.id);
        setSelected(adData);
        setOpen(true);
    };

    const closeModel = () => {
        setOpen(false);
        setSelected(null);
    };

        const AdDetails = {
            Ads: [
                {
                    Ad_id: 1,
                    Image: AdDetailsImage,
                    EventTitle: "Tech Fest 2025: Innovation Showcase",
                    EventDate: "October 26, 2024",
                    StartTime: "09:00 AM - 05:00 PM",
                    StarLocation: "University Main Auditorium",
                    University: "University of Kelaniya",
                    Contact: "contact@uniplaza-union.com",
                    Description: "Join us for the annual Tech Innovate Summit, a day filled with cutting-edge technology discussions, workshops, and networking opportunities.",
                    Phone: "071 734 2934",
                    Tags: ["#IT", "#Innovation", "#Technology"],
                    RelatedLinks: "Register for event",
                    Status: "Approved",
                    Approverfeedback: "Looks good! Event details are clear and poster is high quality. Approved for display."
                },
                {
                    Ad_id: 2,
                    Image: AdDetailsImage,
                    EventTitle: "Music Night Fiesta 2025",
                    EventDate: "November 5, 2024",
                    StartTime: "06:00 PM - 11:00 PM",
                    StarLocation: "University Open Ground",
                    University: "University of Kelaniya",
                    Contact: "events@uniplaza-union.com",
                    Description: "Celebrate the spirit of music with performances from talented university bands, DJs, and solo artists. Enjoy the rhythm, lights, and vibes of the biggest music night of the year.",
                    Phone: "071 712 4567",
                    Tags: ["#Music", "#Culture", "#Entertainment"],
                    RelatedLinks: "Buy tickets",
                    Status: "Pending",
                    Approverfeedback: "Needs poster resolution update before final approval."
                },
                {
                    Ad_id: 3,
                    Image: AdDetailsImage,
                    EventTitle: "AI & Robotics Meetup",
                    EventDate: "September 30, 2024",
                    StartTime: "10:00 AM - 04:00 PM",
                    StarLocation: "Engineering Building, Hall 2",
                    University: "University of Kelaniya",
                    Contact: "techclub@uniplaza-union.com",
                    Description: "Join experts and students for a full day of robotics and AI exploration. Participate in live demos, project showcases, and interactive sessions about automation and intelligent systems.",
                    Phone: "070 542 9821",
                    Tags: ["#AI", "#Robotics", "#Technology"],
                    RelatedLinks: "Join Meetup",
                    Status: "Approved",
                    Approverfeedback: "Excellent organization and detailed description."
                }
            ]
        };

    const getAdsData = {
            AdsData: [
                { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
                { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
            ]
    };

    


    return (
        <div className={`relative ${open? "bg-black/50" :"bg-white my-4"}`}>
            <h2 className="text-3xl font-bold mb-2 w-92/100 mx-auto">Club Dashboard</h2>
            <div className="w-92/100 mx-auto my-5 border-1 border-gray-300 rounded-2xl">
                <div className="w-9/10 mx-auto">
                    <div className="my-4">
                        <h2 className="text-2xl font-bold mb-2">Current Active Ads</h2>
                        <p className="text-xl">Monitor and manage your club's active advertisements.</p>
                    </div>
                    {getAdsData.AdsData.slice(0, 2).map((item, index) => (
                        <div key={index} className="block md:flex my-4 bg-gray-200 rounded-2xl p-4">
                            <img src={item.Image} alt="" className="rounded-2xl mx-auto" />
                            <div className="block mx-4 my-4">
                                <h2 className="text-lg font-bold">{item.Title}</h2>
                                <p>{item.Description}</p>
                            </div>
                            <div className="flex items-center justify-end">
                                <button className="bg-buttonBlue text-white rounded-2xl py-2 px-4">
                                    {item.Action}
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end my-4 ">
                        <button className="border-2 border-gray-400 text-gray-500 rounded-2xl py-2 px-4" onClick={()=>{handleNavigation('/Clubadmanager')}}>View All</button>
                    </div>
                </div>
            </div>

            <div className="w-9/10 mx-auto my-5 border-1 border-gray-300 rounded-2xl">
                <div className="w-9/10 mx-auto">
                    <div className="my-4">
                        <h2 className="text-2xl font-bold mb-2">Ads Overview</h2>
                    </div>
                    <div className="my-5">
                        <table className="min-w-full">
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
                                {getOverviews.tableColumns.slice(0,2).map((item, index) => (
                                    <tr key={index} className="h-15">
                                        <td className="w-30 justify-center mx-auto">
                                            <div className="mx-5">{item.PostTitle}</div>
                                        </td>
                                        <td className="w-10 text-center">{item.Type}</td>
                                        <td className="w-25">
                                            <div className="flex w-fit mx-auto text-gray-600">
                                                {item.Tags.map((tag, tagIndex) => (
                                                    <div key={tagIndex} className="mx-2 bg-gray-100 p-1 rounded-lg">{tag}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="w-10 text-center">{item.DateSubmitted}</td>
                                        <td className="w-15 text-center">{item.Status}</td>
                                        <td className="w-10 text-center">
                                            <button
                                                className="bg-buttonBlue text-white px-5 py-1 rounded-2xl"
                                                onClick={() => openAd(item)}
                                            >
                                                {item.Action}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end my-4 ">
                            <button className="border-2 border-gray-400 text-gray-500 rounded-2xl py-2 px-4" onClick={()=>{handleNavigation('/Clubadmanager')}}>View All</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-9/10 mx-auto">
                <Calendar/>
            </div>

            {open && selected && (
            <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
                <div className="bg-white w-9/10 rounded-2xl shadow-lg p-5 max-h-[95vh] overflow-y-auto relative">
                <div className='flex w-full items-center justify-between border-b border-gray-300 pb-2 mb-4'>
                    <h2 className="text-3xl font-bold">Ad Details</h2>
                    <button 
                    onClick={closeModel}
                    className="text-gray-600 text-2xl hover:text-red-500 font-bold"
                    >
                    ×
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-6">        
                    <div className="flex-1 border-1 border-gray-300 shadow-md rounded-lg p-5">
                    <h2 className='text-xl font-bold'>{selected.EventTitle}</h2>
                    <div className="grid grid-cols-2 gap-4 my-5">
                        <div>
                        <p className='text-gray-500'>Event Date</p>
                        <p>{selected.EventDate}</p>
                        </div>
                        <div>
                        <p className='text-gray-500'>Start Time</p>
                        <p>{selected.StartTime}</p>
                        </div>
                    </div>
                    <div className='my-10'>
                        <p className='text-gray-500'>Location/Venue</p>
                        <p>{selected.StarLocation}</p>
                    </div>
                    <div className='my-10'>
                        <p className='text-gray-500'>University</p>
                        <p>{selected.University}</p>
                    </div>
                    <div className='my-10'>
                        <p className='text-gray-500'>Contact Number or Email</p>
                        <p>{selected.Contact}</p>
                    </div>
                    <div className='my-10'>
                        <p className='text-gray-500'>Description</p>
                        <p>{selected.Description}</p>
                    </div>
                    <div className='my-10'>
                        <p className='text-gray-500'>Phone</p>
                        <p>{selected.Phone}</p>
                    </div>
                    </div>

                    <div className="flex-1 space-y-5">
                    <img src={selected.Image} alt="" className='w-full rounded-2xl shadow-md' />

                    <div className='border-1 border-gray-300 shadow-md rounded-lg p-5'>
                        <h3 className='text-lg font-bold mb-3'>Categories & Links</h3>
                        <div className='my-5'>
                            <p className='text-gray-500'>Tags</p>
                            <div className='w-full flex flex-wrap'>
                                {selected.Tags.map((tag, tagIndex) => (
                                <div key={tagIndex} className='flex h-fit whitespace-nowrap mr-3 mb-2'>
                                    <span className='flex bg-gray-300 px-2 rounded-sm'>{tag}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>Related Links</p>
                            <p className='text-sky-500'>{selected.RelatedLinks}</p>
                        </div>
                    </div>

                    <div className='border-1 border-gray-300 shadow-md rounded-lg p-5'>
                        <h3 className='text-lg font-bold mb-3'>Approval Information</h3>
                        <div className='my-5'>
                            <p className='mb-2'>Status</p>
                            <span className='bg-blue-200 py-1 px-2 text-blue-600 rounded-xl'>{selected.Status}</span>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>Approver feedback</p>
                            <p>{selected.Approverfeedback}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
    )
}