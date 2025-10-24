import AdImage from '../assets/adImage.png'


export default function ClubDashboard(){
    return (
        <div>
            <h2 className="text-3xl font-bold m-2 w-9/10 mx-auto">Club Dashboard</h2>
            <div className="w-9/10 mx-auto my-5 border-1 border-gray-300 rounded-2xl">
                <div className="w-9/10 mx-auto">
                    <div className="my-4">
                        <h2 className="text-2xl font-bold mb-2">Current Active Ads</h2>
                        <p className="text-xl">Monitor and manage your club's active advertisements.</p>
                    </div>
                    <div className="block md:flex my-4 bg-gray-200 rounded-2xl p-4">
                        <img src={AdImage} alt="" className="rounded-2xl mx-auto"/>
                        <div className="block mx-4 my-4">
                            <h2 className="text-lg font-bold">Holy Festival-2025</h2>
                            <p>Join us for an unforgettable evening of music, dance, and cultural performances
                                celebrating the arrival of holy! Enjoy diverse acts from various student groups and
                                indulge in delicious food from local vendors. Mark your calendars!</p>
                        </div>
                        <div className="flex items-center justify-end">
                            <button className="bg-buttonBlue text-white rounded-2xl py-2 px-4">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="block md:flex my-4 bg-gray-200 rounded-2xl p-4">
                        <img src={AdImage} alt="" className="rounded-2xl mx-auto"/>
                        <div className="block mx-4 my-4">
                            <h2 className="text-lg font-bold">Holy Festival-2025</h2>
                            <p>Join us for an unforgettable evening of music, dance, and cultural performances
                                celebrating the arrival of holy! Enjoy diverse acts from various student groups and
                                indulge in delicious food from local vendors. Mark your calendars!</p>
                        </div>
                        <div className="flex items-center justify-end">
                            <button className="bg-buttonBlue text-white rounded-2xl py-2 px-4">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end my-4 ">
                        <button className="border-2 border-gray-400 text-gray-500 rounded-2xl py-2 px-4">View All</button>
                    </div>
                </div>
            </div>
        </div>
    )
}