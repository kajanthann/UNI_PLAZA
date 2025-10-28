import AdDetailsImage from '../assets/ad_details_image.png'

export default function EventDashboard(){
    return (
        <div>
            <div className='flex w-9/10 mx-auto items-center'>
                <h2 className="flex justify-start text-3xl font-bold m-2 w-4/5">Ad Details</h2>
                <button className='flex justify-end w-1/5'>X</button>
            </div>
            <div className="flex w-9/10 mx-auto my-5">
                <div className="flex-1 border-1 border-gray-300 mr-7 shadow-md rounded-lg">
                    <div className="w-9/10 mx-auto my-5">
                        <h2 className='text-xl font-bold'>Tech Fest 2025: Innovation Showcase</h2>
                        <div className="grid grid-cols-2 gap-4 my-5">
                            <div>
                                <p className='text-gray-500'>Event Date</p>
                                <p>October 26, 2024</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Start Time</p>
                                <p>09:00 AM - 05:00 PM</p>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>Location/Venue</p>
                            <p>University Main Auditorium</p>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>University</p>
                            <p>University of Kelaniya</p>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>Contact Number or Email</p>
                            <p>contact@uniplaza-union.com</p>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>Description</p>
                            <p>Join us for the annual Tech Innovate Summit, a day filled with cutting-edge technology discussions, workshops, and networking opportunities. Learn from industry leaders, explore new innovations, and connect with fellow tech enthusiasts. This year's focus is on AI in healthcare and sustainable tech solutions. Expect interactive demos, inspiring keynotes, and a startup pitch competition. Don't miss this opportunity to advance your knowledge and career!</p>
                        </div>
                        <div className='mb-5'>
                            <p className='text-gray-500'>Phone</p>
                            <p>071 734 2934</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div>
                        <div>
                            <img src={AdDetailsImage} alt="" className='w-full rounded-2xl shadow-md' />
                        </div>
                        <div className='border-1 border-gray-300 my-5 shadow-md rounded-lg'>
                            <div className='w-9/10 mx-auto my-5'>
                                <h3 className='text-lg font-bold'>Categories & Links</h3>
                                <div className='my-5'>
                                    <p className='text-gray-500'>Tags</p>
                                    <div className='w-4/5'>
                                        <div className='flex h-fit whitespace-nowrap'>
                                            <span className='flex bg-gray-300 mx-auto items-center px-2 rounded-sm'>IT</span>
                                            <span className= 'flex bg-gray-300 mx-auto items-center px-2 rounded-sm'>Professional Development</span>
                                            <span className='flex bg-gray-300 mx-auto items-center px-2 rounded-sm'>Technology</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <p className='text-gray-500'>Related Links</p>
                                    <p className='text-sky-500'>Register for event</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className='border-1 border-gray-300 shadow-md  rounded-lg'>
                            <div  className='w-9/10 mx-auto my-5'>
                                <h3 className='text-lg font-bold'>Approval Information</h3>
                                <div className='my-5'>
                                    <p className='mb-2'>Status</p>
                                    <span className='bg-blue-200 py-1 px-2 text-blue-600 rounded-xl'>Approved</span>
                                </div>
                                <div className='mb-5'>
                                    <p className='text-gray-500'>Approver feedback</p>
                                    <p>Looks good! Event details are clear and poster is high quality. Approved for display.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}