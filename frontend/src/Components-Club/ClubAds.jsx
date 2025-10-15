import CreateAds from '../assets/createAds.png'

export default function ClubAds(){
    return (
        <div>
            <h2 className="text-3xl font-bold m-2">Club Ads</h2>
            <div className="w-9/10 mx-auto items-center flex bg-blue-200 my-5 rounded-2xl">
                <div className="block w-1/2 p-4 mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Create Impactful Ads, Effortlessly</h2>
                    <p className="text-xl">Reach your audience effectively with Uniplaza.
                        Design and launch Event Ads or general Announcements with ease,
                        all from one powerful platform.</p>
                </div>
                <div className="flex justify-end items-center mr-10 p-10 w-1/3">
                    <img src={CreateAds} alt="" className="w-2/3"/>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}