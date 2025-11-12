import clubDashboardImage from '../assets/clubDashboard.png'
import clubLogo from '../assets/clubLogo.png'

export default function ClubProfile({image}) {
    return (
        <div className="min-h-screen my-4 pb-10">
            <div className="mt-7 mb-4 w-92/100 mx-auto text-center md:text-left">
                <h2 className="mb-2 text-2xl md:text-3xl font-bold">Profile</h2>
                <p className="text-md text-gray-500">Manage your club's profile</p>
            </div>

            <div className="w-92/100 my-10 mx-auto">
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="relative md:w-1/2 w-full border border-gray-300 rounded-2xl">

                    <div className="absolute flex md:hidden w-full h-full">
                        <img
                            src={clubDashboardImage}
                            alt="Dashboard Mobile"
                            className="opacity-20 rounded-2xl w-full"
                        />
                    </div>

                        <div className="w-9/10 mx-auto my-5">
                            <h2 className="text-lg md:text-xl font-bold text-left">Club Information</h2>

                            <div className="flex sm:flex-row items-center justify-center sm:justify-start w-full sm:w-2/3 my-3 mx-auto sm:mx-0">
                                <div className="ml-10 flex-1 flex justify-center sm:justify-start mb-4 sm:mb-0">
                                    <img src={image} alt="Club Logo" className="object-cover rounded-2xl w-24 h-24 sm:w-32 md:w-auto" />
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center text-center sm:text-left">
                                    <p className="text-lg md:text-xl font-semibold">Club Name</p>
                                    <div
                                        className="px-4 py-1 text-blue-600 rounded-2xl text-sm md:text-base text-center"
                                        style={{ backgroundColor: '#BBDEFB' }}
                                    >
                                        Active
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col my-5">
                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">Description</p>
                                    <p className="font-semibold text-sm md:text-base text-justify">
                                        The Uni-plaza Student Union is dedicated to fostering a vibrant and inclusive campus community.
                                        We organize a wide range of events, from academic workshops to social gatherings, aiming
                                        to enrich student life and provide opportunities for growth and connection. Join us to make
                                        a difference!
                                    </p>
                                </div>
                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">University</p>
                                    <p className="font-semibold text-sm md:text-base">University of Kelaniya</p>
                                </div>
                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">Official Email</p>
                                    <p className="font-semibold text-sm md:text-base">contact@uniplaza-union.com</p>
                                </div>
                            </div>

                            <div className="my-5">
                                <h2 className="text-lg md:text-xl font-bold text-left">Representative Information</h2>

                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">Name</p>
                                    <p className="font-semibold text-sm md:text-base">John Perera</p>
                                </div>
                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">Role</p>
                                    <p className="font-semibold text-sm md:text-base">Event Head</p>
                                </div>
                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">Email</p>
                                    <p className="font-semibold text-sm md:text-base">contact@uniplaza-union.com</p>
                                </div>
                                <div className="block my-5">
                                    <p className="text-gray-500 text-base md:text-lg">Phone</p>
                                    <p className="font-semibold text-sm md:text-base">071 734 2934</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex hidden justify-center items-center">
                        <img
                            src={clubDashboardImage}
                            alt="Dashboard Preview"
                            className="opacity-70 rounded-2xl w-full"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}
