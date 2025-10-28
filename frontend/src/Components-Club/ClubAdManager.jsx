import { useEffect, useState } from 'react'
import AdImage from '../assets/adImage.png'
import AdDetailsImage from '../assets/ad_details_image.png'

export default function ClubAdManager() {

    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    // 🟢 Move getOverviews above useEffect
    const getOverviews = {
        tableColumns: [
            { PostTitle: "Tech Fest 2025: Innovation Showcase", Type: "Event", Tags: ["#IT", "#Innovation", "#Technology"], DateSubmitted: "23 Sep 2025", Status: "Pending", Action: "View" },
            { PostTitle: "Tech Fest 2025: Innovation Showcase", Type: "Event", Tags: ["#IT", "#Music", "#Technology"], DateSubmitted: "23 Sep 2025", Status: "Pending", Action: "View" },
            { PostTitle: "Tech Fest 2025: Innovation Showcase", Type: "Event", Tags: ["#IT", "#Innovation", "#Technology"], DateSubmitted: "23 Sep 2025", Status: "Pending", Action: "View" },
            { PostTitle: "Tech Fest 2025: Innovation Showcase", Type: "Event", Tags: ["#IT", "#Music", "#Technology"], DateSubmitted: "23 Sep 2025", Status: "Pending", Action: "View" },
        ]
    };

    useEffect(() => {
        const anySelected = getOverviews.tableColumns.length > 0;
        setSelected(anySelected);
    }, [getOverviews.tableColumns]);

    const openAd = (item) => {
        setSelected(item);
        setOpen(true);
    }

    const closeModel = () => {
        setOpen(false);
    }

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
                Description: "Join us for the annual Tech Innovate Summit, a day filled with cutting-edge technology discussions, workshops, and networking opportunities. Learn from industry leaders, explore new innovations, and connect with fellow tech enthusiasts. This year's focus is on AI in healthcare and sustainable tech solutions. Expect interactive demos, inspiring keynotes, and a startup pitch competition. Don't miss this opportunity to advance your knowledge and career!",
                Phone: "071 734 2934",
                Tags: ["#IT", "#Innovation", "#Technology"],
                RelatedLinks: "Register for event",
                Status: "Approved",
                Approverfeedback: "Looks good! Event details are clear and poster is high quality. Approved for display."
            },
            {
                Ad_id: 2,
                Image: AdDetailsImage,
                EventTitle: "Tech Fest 2025: Innovation Showcase",
                EventDate: "October 26, 2024",
                StartTime: "09:00 AM - 05:00 PM",
                StarLocation: "University Main Auditorium",
                University: "University of Kelaniya",
                Contact: "contact@uniplaza-union.com",
                Description: "Join us for the annual Tech Innovate Summit, a day filled with cutting-edge technology discussions, workshops, and networking opportunities. Learn from industry leaders, explore new innovations, and connect with fellow tech enthusiasts. This year's focus is on AI in healthcare and sustainable tech solutions. Expect interactive demos, inspiring keynotes, and a startup pitch competition. Don't miss this opportunity to advance your knowledge and career!",
                Phone: "071 734 2934",
                Tags: ["#IT", "#Innovation", "#Technology"],
                RelatedLinks: "Register for event",
                Status: "Approved",
                Approverfeedback: "Looks good! Event details are clear and poster is high quality. Approved for display."
            },
            {
                Ad_id: 3,
                Image: AdDetailsImage,
                EventTitle: "Tech Fest 2025: Innovation Showcase",
                EventDate: "October 26, 2024",
                StartTime: "09:00 AM - 05:00 PM",
                StarLocation: "University Main Auditorium",
                University: "University of Kelaniya",
                Contact: "contact@uniplaza-union.com",
                Description: "Join us for the annual Tech Innovate Summit, a day filled with cutting-edge technology discussions, workshops, and networking opportunities. Learn from industry leaders, explore new innovations, and connect with fellow tech enthusiasts. This year's focus is on AI in healthcare and sustainable tech solutions. Expect interactive demos, inspiring keynotes, and a startup pitch competition. Don't miss this opportunity to advance your knowledge and career!",
                Phone: "071 734 2934",
                Tags: ["#IT", "#Innovation", "#Technology"],
                RelatedLinks: "Register for event",
                Status: "Approved",
                Approverfeedback: "Looks good! Event details are clear and poster is high quality. Approved for display."
            },
        ]
    };

    const getAdsData = {
        AdsData: [
            { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
            { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
            { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
            { Image: AdImage, Title: "Holy Festival-2025", Description: "Join us for an unforgettable evening of music, dance, and cultural performances celebrating the arrival of holy! Enjoy diverse acts from various student groups and indulge in delicious food from local vendors. Mark your calendars!", Action: "Edit" },
        ]
    };

    return (
        <div>
            <h2 className="text-3xl font-bold m-2 w-9/10 mx-auto">Club Ad Manager</h2>

            {/* Active Ads Section */}
            <div className="w-9/10 mx-auto my-5 border-1 border-gray-300 rounded-2xl">
                <div className="w-9/10 mx-auto">
                    <div className="my-4">
                        <h2 className="text-2xl font-bold mb-2">Current Active Ads</h2>
                        <p className="text-xl">Monitor and manage your club's active advertisements.</p>
                    </div>
                    {getAdsData.AdsData.map((item, index) => (
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
                </div>
            </div>

            {/* Ads Overview Table */}
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
                                {getOverviews.tableColumns.map((item, index) => (
                                    <tr key={index} className="mb-2">
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
                                            <button className="bg-buttonBlue text-white px-5 py-1 rounded-2xl" onClick={() => openAd(item)}>{item.Action}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Ad Details Overlay */}
            {open && (
                <div>
                    <div className='flex w-9/10 mx-auto items-center'>
                        <h2 className="flex justify-start text-3xl font-bold m-2 w-4/5">Ad Details</h2>
                        <button className='flex justify-end w-1/5' onClick={closeModel}>X</button>
                    </div>

                    {AdDetails.Ads.map((item, index) => (
                        <div className="flex w-9/10 mx-auto my-5" key={index}>
                            <div className="flex-1 border-1 border-gray-300 mr-7 shadow-md rounded-lg">
                                <div className="w-9/10 mx-auto my-5">
                                    <h2 className='text-xl font-bold'>{item.EventTitle}</h2>
                                    <div className="grid grid-cols-2 gap-4 my-5">
                                        <div>
                                            <p className='text-gray-500'>Event Date</p>
                                            <p>{item.EventDate}</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-500'>Start Time</p>
                                            <p>{item.StartTime}</p>
                                        </div>
                                    </div>
                                    <div className='mb-5'>
                                        <p className='text-gray-500'>Location/Venue</p>
                                        <p>{item.StarLocation}</p>
                                    </div>
                                    <div className='mb-5'>
                                        <p className='text-gray-500'>University</p>
                                        <p>{item.University}</p>
                                    </div>
                                    <div className='mb-5'>
                                        <p className='text-gray-500'>Contact Number or Email</p>
                                        <p>{item.Contact}</p>
                                    </div>
                                    <div className='mb-5'>
                                        <p className='text-gray-500'>Description</p>
                                        <p>{item.Description}</p>
                                    </div>
                                    <div className='mb-5'>
                                        <p className='text-gray-500'>Phone</p>
                                        <p>{item.Phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div>
                                    <img src={item.Image} alt="" className='w-full rounded-2xl shadow-md' />
                                </div>

                                <div className='border-1 border-gray-300 my-5 shadow-md rounded-lg'>
                                    <div className='w-9/10 mx-auto my-5'>
                                        <h3 className='text-lg font-bold'>Categories & Links</h3>
                                        <div className='my-5'>
                                            <p className='text-gray-500'>Tags</p>
                                            <div className='w-4/5'>
                                                {item.Tags.map((tag, tagIndex) => (
                                                    <div className='flex h-fit whitespace-nowrap' key={tagIndex}>
                                                        <span className='flex bg-gray-300 mx-auto items-center px-2 rounded-sm'>{tag}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='mb-5'>
                                            <p className='text-gray-500'>Related Links</p>
                                            <p className='text-sky-500'>{item.RelatedLinks}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='border-1 border-gray-300 shadow-md rounded-lg'>
                                    <div className='w-9/10 mx-auto my-5'>
                                        <h3 className='text-lg font-bold'>Approval Information</h3>
                                        <div className='my-5'>
                                            <p className='mb-2'>Status</p>
                                            <span className='bg-blue-200 py-1 px-2 text-blue-600 rounded-xl'>{item.Status}</span>
                                        </div>
                                        <div className='mb-5'>
                                            <p className='text-gray-500'>Approver feedback</p>
                                            <p>{item.Approverfeedback}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
