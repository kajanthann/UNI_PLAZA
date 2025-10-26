import AdImage from '../assets/adImage.png'
import Calendar from '../components/Calendar';


export default function ClubDashboard(){

    const getOverviews = {
        tableColumns: [
            {PostTitle:"Tech Fest 2025: Innovation Showcase",Type:"Event",Tags:["#IT","#Innovation","#Technology"],DateSubmitted:"23 Sep 2025",Status:"Pending",Action:"View"},
            {PostTitle:"Tech Fest 2025: Innovation Showcase",Type:"Event",Tags:["#IT","#Music","#Technology"],DateSubmitted:"23 Sep 2025",Status:"Pending",Action:"View"},
        ]
    }

    const getAdsData ={
        AdsData:[
            {Image:AdImage,Title:"Holy Festival-2025",Description:"Join us for an unforgettable evening of music, dance, and cultural performances\n" +
                    "                                celebrating the arrival of holy! Enjoy diverse acts from various student groups and\n" +
                    "                                indulge in delicious food from local vendors. Mark your calendars!",
                Action:"Edit"
            },
            {Image:AdImage,Title:"Holy Festival-2025",Description:"Join us for an unforgettable evening of music, dance, and cultural performances\n" +
                    "                                celebrating the arrival of holy! Enjoy diverse acts from various student groups and\n" +
                    "                                indulge in delicious food from local vendors. Mark your calendars!",
                Action:"Edit"
            }
        ]
    }


    return (
        <div>
            <h2 className="text-3xl font-bold m-2 w-9/10 mx-auto">Club Dashboard</h2>
            <div className="w-9/10 mx-auto my-5 border-1 border-gray-300 rounded-2xl">
                <div className="w-9/10 mx-auto">
                    <div className="my-4">
                        <h2 className="text-2xl font-bold mb-2">Current Active Ads</h2>
                        <p className="text-xl">Monitor and manage your club's active advertisements.</p>
                    </div>
                    {getAdsData.AdsData.map((item, index) => (
                        <div key={index} className="block md:flex my-4 bg-gray-200 rounded-2xl p-4">
                            <img src={item.Image} alt="" className="rounded-2xl mx-auto"/>
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
                        <button className="border-2 border-gray-400 text-gray-500 rounded-2xl py-2 px-4">View All</button>
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
                            {getOverviews.tableColumns.map(column => (
                                <tr className="mb-2">
                                    <td className="w-30 justify-center mx-auto">
                                        <div className="mx-5">
                                            {column.PostTitle}
                                        </div>
                                    </td>
                                    <td className="w-10 text-center">{column.Type}</td>
                                    <td className="w-25">
                                        <div className="flex w-fit mx-auto text-gray-600">
                                            {column.Tags.map((item,index) => (
                                                <div key={index} className="mx-2 bg-gray-100 p-1 rounded-lg">{item}</div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="w-10 text-center">{column.DateSubmitted}</td>
                                    <td className="w-15 text-center">{column.Status}</td>
                                    <td className="w-10 text-center">
                                        <button className="bg-buttonBlue text-white px-5 py-1 rounded-2xl">{column.Action}</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="w-9/10 mx-auto">
                <Calendar/>
            </div>
        </div>
    )
}