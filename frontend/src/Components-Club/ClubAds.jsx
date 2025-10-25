import CreateAds from '../assets/createAds.png'
import {useState} from "react";
import {faFile, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginSlider from '../Components/LoginSlider.jsx'

export default function ClubAds(){
    const [file,setFile] = useState(null);
    const [input,setInput] = useState("");
    const [tags,setTags] = useState([]);
    const [active,setActive] = useState(false);

    const handleKeyDown = (e) => {
        if(e.key === "Tab" || e.key === ","){
            e.preventDefault();
            setActive(true);
            const newTags = input.trim().toLocaleUpperCase();
            if(newTags && !tags.includes(newTags)){
                setTags([...tags,newTags]);
            }
            setInput("");
        }
    };

    const removeTags = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold m-2 w-9/10 mx-auto">Club Ads</h2>
            <div className="w-9/10 mx-auto">
                <div className="items-center flex bg-blue-200 my-5 rounded-2xl">
                    <div className="block w-1/2 p-4 mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Create Impactful Ads, Effortlessly</h2>
                        <p className="text-xl">Reach your audience effectively with Uni-plaza.
                            Design and launch Event Ads or general Announcements with ease,
                            all from one powerful platform.</p>
                    </div>
                    <div className="flex justify-end items-center mr-10 p-10 w-1/3">
                        <img src={CreateAds} alt="" className="w-2/3"/>
                    </div>
                </div>
                <div className="border-1 border-gray-400 rounded-2xl mb-10">
                    <div className="w-9/10 mx-auto my-5">
                        <div className="flex w-5/10">
                            {/*<h2 className="mb-5 text-2xl font-bold w-4/10">Create New Content</h2>*/}
                            {/*<div className="w-4/10">*/}
                            {/*    <LoginSlider className="w-2/10"/>*/}
                            {/*</div>*/}
                            <h2 className="mb-5 text-2xl font-bold whitespace-nowrap mr-6 items-center">Create New Content</h2>
                            <LoginSlider className=""/>
                        </div>
                        <div className="flex items-center">
                            <hr className="w-1/2 mx-auto text-blue-300"/>
                            <p className="text-blue-300 flex item-center justify-center">XXXXXXX</p>
                            <hr className="w-1/2 mx-auto text-blue-300 "/>
                        </div>
                        <div className="my-5">
                            <h2 className="text-xl font-bold">Create Event Ad</h2>
                            <p className="text-lg mb-5">Fill in the details for your event advertisement.</p>
                            <form action="">
                                <div className="grid grid-cols-2 gap-6 my-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="" className='flex'>Event Title
                                            <span className='text-red-600 text-xl'>*</span>
                                        </label>
                                        <input type="text" placeholder="Annual Tech Summit 2024" className="p-2 bg-gray-200 rounded-xl"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className='flex'>Event Date
                                            <span className='text-red-600 text-xl'>*</span>
                                        </label>
                                        <input type="text" placeholder="October 26, 2024" className="p-2 bg-gray-200 rounded-xl"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="flex">Start Time
                                            <span className='text-red-600 text-xl'>*</span>
                                        </label>
                                        <input type="text" placeholder="10.00 AM" className="p-2 bg-gray-200 rounded-xl"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className='flex'>Location / Venue
                                            <span className='text-red-600 text-xl'>*</span>
                                        </label>
                                        <input type="text" placeholder="Grand Convention Hall" className="p-2 bg-gray-200 rounded-xl mb-3"/>
                                        <input type="text" placeholder="https://maps.app.goo.gl/example" className="p-2 bg-gray-200 rounded-xl"/>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-5">
                                    <label htmlFor="" className='flex'>University Name
                                        <span className='text-red-600 text-xl'>*</span>
                                    </label>
                                    <input type="text" placeholder="University of Kelaniya" className="p-2 bg-gray-200 rounded-xl"/>
                                </div>
                                <div className="flex flex-col my-5">
                                    <label htmlFor="" className='flex'>Description of the event
                                        <span className='text-red-600 text-xl'>*</span>
                                    </label>
                                    <textarea className="p-2 bg-gray-200 rounded-xl" name="" id="" rows="3" placeholder="Join us for the most anticipated technology event of the year! Explore cutting-edge innovations, network with industry leaders, and discover the future of tech. Featuring keynote speakers from leading companies and interactive workshops."/>
                                </div>
                                <div>
                                    <h2 className="mb-5">Related Links(optional)</h2>
                                    <div className="flex mb-5 w-full">
                                        <div className="border-1 border-dashed border-gray-400 p-2 rounded-2xl me-5 w-1/3 text-center">Register Now</div>
                                        <div className="w-2/3">
                                            <input type="text" placeholder="https://techsummit24.com/register" className="p-2 bg-gray-200 rounded-xl w-full"/>
                                        </div>
                                    </div>
                                    <div className="flex mb-5 w-ful">
                                        <div className="flex flex-col w-1/3 me-5">
                                            <label htmlFor="" className='flex'>Contact number
                                                <span className='text-red-600 text-xl'>*</span>
                                                </label>
                                            <input type="text" placeholder="073 923404-98" className="p-2 bg-gray-200 rounded-xl w-full"/>
                                        </div>
                                        <div className="flex flex-col w-2/3">
                                        <div>
                                            <label htmlFor="" className='flex'>Upload Poster/Image(s)
                                                <span className='text-red-600 text-xl'>*</span>
                                            </label>
                                            <label htmlFor="poster" className="block border-2 border-dashed border-gray-300 bg-gray-200 rounded-2xl p-6 text-center text-gray-500 text-sm cursor-pointer hover:bg-gray-100">Drag and drop your event poster here, or click to browse (Max 5MB)</label>
                                            <input id="poster" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                            {file && <p className="text-gray-600">Selected file: {file.name}</p>}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="my-5">
                                        <div className="flex flex-col mb-5">
                                            <label htmlFor="">Email Address</label>
                                            <input type="text" placeholder="club@example.edu" className="p-2 bg-gray-200 rounded-xl"/>
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <label htmlFor="">Tags</label>
                                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type and press Tab..." onKeyDown={handleKeyDown} className="p-2 bg-gray-200 rounded-xl"/>
                                            <div className={`flex flex-wrap items-center gap-2 mt-3 ${active? 'border border-gray-300 rounded-md px-3 py-2 bg-blue-50 focus-within:ring-1 focus-within:ring-blue-400':'border-0 bg-white'}`}>
                                                {tags.map((tag, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-blue-600">
                                                        <span>{tag}</span>
                                                        <button
                                                        type="button"
                                                        onClick={() => removeTags(tag)}
                                                        className="text-gray-500 hover:text-red-500"
                                                        >
                                                        ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-buttonBlue w-full text center text-white py-3 rounded-2xl">Submit for Approval</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}