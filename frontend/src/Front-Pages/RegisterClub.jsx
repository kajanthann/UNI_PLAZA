
export default function RegisterClub(){
    return (
        <div className="md:w-7/10 mx-auto my-7">
            <h2 className="mb-7 text-3xl font-bold md:w-full w-9/10 mx-auto">Welcome to Uni-plaza Club Portal !</h2>
            <div className="flex md:gap-6">
                <div className="hidden md:flex md:w-1/4 bg-buttonBlue rounded-2xl">
                    <div className="w-17/20 mx-auto text-white flex flex-col justify-center items-center h-screen">
                        <div className="">
                            <h2 className="text-2xl font-bold mb-4">Connect your Club</h2>
                            <h2 className="text-2xl font-bold mb-8">Grow your community</h2>
                            <p className="leading-7 mb-4">Uni-plaza Club Portal is designed to
                                empower university organizations.
                                Easily manage your club's presence,
                                attract new members, and organize
                                events with our intuitive tools.</p>
                            <ul className="list-inside list-disc leading-7">
                                <li>Reach a wider student audience</li>
                                <li>Simplify event promotion</li>
                                <li>Engage your members effectively</li>
                                <li>Access exclusive campus resources</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-9/10 md:w-3/4 border-1 rounded-2xl">
                    <div className="w-9/10 mx-auto my-5">
                        <h2 className="text-xl font-bold mb-4 text-center">Club/Community Registration</h2>
                        <p className="mb-5">Register your university club or community to unlock full access to the Uni-plaza platform.</p>
                        <form action="">
                            <h2 className="text-lg font-bold mb-4">Club Information</h2>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="block">
                                        <label className="block">Club/Community Name*</label>
                                        <input type="text" placeholder="Innovation Club" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>

                                    <div className="block">
                                        <label className="block">Affiliated university*</label>
                                        <input type="text" placeholder="University of ######" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>
                            </div>
                            <div className="mb-4">
                                <label>Official Club Email Address (Optional)</label>
                                <input type="text" className="bg-gray-200 p-2 w-full rounded-xl" placeholder="club@example.edu"/>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-2">Representative Information</h2>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div className="block">
                                        <label className="block">Full Name*</label>
                                        <input type="text" placeholder="John Doe" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>

                                    <div className="block">
                                        <label className="block">Email*</label>
                                        <input type="text" placeholder="jane.doe@example.com" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>
                                    <div className="block">
                                        <label className="block">Role*</label>
                                        <input type="text" placeholder="President, Secretary, Head of Events" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>
                                    <div className="block">
                                        <label className="block">Phone number*</label>
                                        <input type="text" placeholder="+1 (555) 123-4567" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-2">Branding</h2>
                                <div className="mb-4">
                                    <label>Club Logo/Banner Image Upload *</label>
                                    <input type="text" className="bg-gray-200 p-2 w-full rounded-xl" placeholder="Upload your club logo or banner (Max 2MB)"/>
                                </div>
                                <div className="mb-4">
                                    <label>Brief Description*</label>
                                    <textarea name="" id="" cols="" rows="3" placeholder="Share your club's mission, values, and regular activities. This will appear on your public profile."
                                    className="bg-gray-200 p-2 w-full rounded-xl"/>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h2 className="text-lg font-bold mb-4">Account Setup</h2>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div className="block">
                                        <label className="block">Create a password*</label>
                                        <input type="password" placeholder="Enter a strong Password" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>

                                    <div className="block">
                                        <label className="block">Confirm Password*</label>
                                        <input type="text" placeholder="Confirm Your Password" className="bg-gray-200 p-2 w-full rounded-xl"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="bg-buttonBlue text-center text-white w-full p-2 rounded-2xl mt-2">Register Club</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}