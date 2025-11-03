import clubDashboardImage from '../assets/clubDashboard.png'
import clubLogo from '../assets/clubLogo.png'


export default function ClubProfile(){
    return (
        <div>
            <h2 className="text-3xl font-bold m-2 w-9/10 mx-auto">Club Profile</h2>
            <div className="min-h-screen w-9/10 my-10 mx-auto">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold">Welcome back, Club name!</h2>
                    <p className="text-xl">Manage your club's profile, create new advertisements, and track your campaigns.</p>
                </div>
                <div className="flex">
                    <div className="md:w-1/2 w-full border-1 me-4 border-gray-300 rounded-2xl">
                        <div className="w-9/10 mx-auto my-5">
                            <h2 className="text-xl font-bold">Club Profile</h2>
                            <div className="flex w-2/3 my-3">
                                <div className="flex-1">
                                    <img src={clubLogo} alt="" className=""/>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="">
                                        <p className="text-xl">Club Name</p>
                                        <div className="px-4 py-1 text-blue-600 rounded-2xl text-center" style={{backgroundColor:'#BBDEFB'}}>
                                            Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="">
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">Description</p>
                                            <p className="font-semibold">The Uni-plaza Student Union is dedicated to
                                                fostering a vibrant and inclusive campus community.
                                                We organize a wide range of events,
                                                from academic workshops to social gatherings, aiming
                                                to enrich student life and provide opportunities
                                                for growth and connection. Join us to make a difference!</p>
                                        </div>
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">University</p>
                                            <p className="font-semibold">University of Kelaniya</p>
                                        </div>
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">Official Email</p>
                                            <p className="font-semibold">contact@uniplaza-union.com</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Representative Information</h2>
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">Name</p>
                                            <p className="font-semibold">John Perera</p>
                                        </div>
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">Role</p>
                                            <p className="font-semibold">Event Head</p>
                                        </div>
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">Email</p>
                                            <p className="font-semibold">contact@uniplaza-union.com</p>
                                        </div>
                                        <div className="block my-5">
                                            <p className="text-gray-500 text-lg">Phone</p>
                                            <p className="font-semibold">071 734 2934</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex hidden">
                        <img src={clubDashboardImage} alt="" className="opacity-70 rounded-2xl w-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}