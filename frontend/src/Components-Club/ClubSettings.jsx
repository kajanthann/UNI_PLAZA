import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen,faLock,faCircleUser,faBell,faTrash,faShareSquare,faArrowLeft,faShieldHalved,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import clubLogo from "../assets/clubLogo.png";

export default function ClubSettings() {
    const [activeTab, setActiveTab] = useState("");
    const [settingsTab, setSettingsTab] = useState(true);
    const [enabled, setEnabled] = useState(false);
    const [checked, setChecked] = useState(false);

    const Settings = [
        {icon:faUserPen,name:"Club Profile",bar:faShareSquare,onClick: () => (setActiveTab("profile") && setSettingsTab(false))},
        {icon:faCircleUser,name:"Account",bar:faShareSquare,onClick: () => (setActiveTab("account") && setSettingsTab(false))},
        {icon:faLock,name:"Security",bar:faShareSquare,onClick: () => (setActiveTab("security") && setSettingsTab(false))},
        {icon:faBell,name:"Notifications",bar:"",onClick: () => (setEnabled(!enabled) && setSettingsTab(true))},
        {icon:faTrash,name:"Delete Account",bar:"",onClick: () => (setSettingsTab(true))},
    ];

    const Security = [
        {icon:faShieldHalved,name:"Two Factor Authentication",onClick: () => (setChecked(!checked) && setSettingsTab(false))},
        {icon:faRightFromBracket,name:"Logout From All",onClick: () => (setSettingsTab(false))},
    ];

    const [formData, setFormData] = useState({
        clubName:"Gavel Club",
        description:
            "The Uni-plaza Student Union is dedicated to fostering a vibrant and inclusive campus community. We organize a wide range of events, from academic workshops to social gatherings, aiming to enrich student life and provide opportunities for growth and connection. Join us to make a difference!",
        university: "University of Kelaniya",
        officialEmail: "contact@uniplaza-union.com",
        repName: "John Perera",
        repRole: "Event Head",
        repEmail: "contact@uniplaza-union.com",
        repPhone: "071 734 2934",
    });

    const handleBack = () =>{
        setActiveTab("");
        setSettingsTab(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((pre) => ({...pre,[name]:value}));
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="w-93/100 my-5 mx-auto">
                <h2 className="text-3xl font-bold mb-5">Club Settings</h2>
                {activeTab === "" && settingsTab && (
                    <div className="mx-auto p-8 rounded-2xl border border-gray-200 shadow-md" style={{}}>
                        {Settings.map((item,index)=>(
                            <div key={index} className={`flex w-full mb-5 ${(item.name === "Delete Account")?"bg-red-100 hover:bg-red-200 text-red-600 border border-red-400":"bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-400"} p-4 items-center rounded-xl cursor-pointer`}
                                 onClick={item.onClick}>
                                <div className="w-1/9">
                                    <div className="w-fit mx-auto">
                                        <FontAwesomeIcon icon={item.icon} size={"xl"}/>
                                    </div>
                                </div>
                                <span className="w-6/9 text-lg">{item.name}</span>
                                <div className="w-2/9 text-end mr-10">
                                    {(item.name === "Notifications")?
                                        (
                                            <span>
                                                <label className="inline-flex items-center cursor-pointer">
                                              <input
                                                  type="checkbox"
                                                  checked={enabled}
                                                  onChange={() => setEnabled(!enabled)}
                                                  className="sr-only peer"
                                              />
                                              <div
                                                  className="relative w-10 h-5 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300
                                                           after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                                           after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4.5
                                                           after:transition-all peer-checked:after:translate-x-full peer-checked:bg-sky-500"
                                              ></div>
                                            </label>
                                        </span>
                                        ) :
                                        (
                                            <FontAwesomeIcon icon={item.bar} size={"md"}/>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {activeTab === "profile" &&
                (
                    <section className="mb-10">
                        <div className="w-9/10 mx-auto mb-5">
                            <button className="flex font-bold items-center bg-buttonBlue px-3 py-2 text-white rounded-xl" onClick={handleBack}>
                                <FontAwesomeIcon icon={faArrowLeft} size={"sm"}/>
                                <span className="text-md">Back</span>
                            </button>
                        </div>
                        <div className="w-9/10 mx-auto border p-6 border-gray-300 shadow-md rounded-lg">

                            <div className="flex w-full my-5">
                                    {/*<div className="">*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">Description</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*            <textarea name="description" id="" rows="3" value={formData.description} onChange={handleChange}/>*/}
                                    {/*        )*/}
                                    {/*            :*/}
                                    {/*        (*/}
                                    {/*            <p className="font-semibold">The Uni-plaza Student Union is dedicated to*/}
                                    {/*                fostering a vibrant and inclusive campus community.*/}
                                    {/*                We organize a wide range of events,*/}
                                    {/*                from academic workshops to social gatherings, aiming*/}
                                    {/*                to enrich student life and provide opportunities*/}
                                    {/*                for growth and connection. Join us to make a difference!</p>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">University</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*                <input type="text" name="university" value={formData.university} onChange={handleChange}/>*/}
                                    {/*            )*/}
                                    {/*            :*/}
                                    {/*            (*/}
                                    {/*                <p className="font-semibold">University of Kelaniya</p>*/}
                                    {/*            )}*/}

                                    {/*    </div>*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">Official Email</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*                <input type="text" name="officialEmail" value={formData.officialEmail} onChange={handleChange}/>*/}
                                    {/*            )*/}
                                    {/*            :*/}
                                    {/*            (*/}
                                    {/*                <p className="font-semibold">contact@uniplaza-union.com</p>*/}
                                    {/*            )}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    <h2 className="text-xl font-bold">Representative Information</h2>*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">Name</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*                <input type="text" name="repName" value={formData.repName} onChange={handleChange}/>*/}
                                    {/*            )*/}
                                    {/*            :*/}
                                    {/*            (*/}
                                    {/*                <p className="font-semibold">John Perera</p>*/}
                                    {/*            )}*/}

                                    {/*    </div>*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">Role</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*                <input type="text" name="repRole" value={formData.repRole} onChange={handleChange}/>*/}
                                    {/*            )*/}
                                    {/*            :*/}
                                    {/*            (*/}
                                    {/*                <p className="font-semibold">Event Head</p>*/}
                                    {/*            )}*/}
                                    {/*    </div>*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">Email</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*                <input type="text" name="repEmail" value={formData.repEmail} onChange={handleChange}/>*/}
                                    {/*            )*/}
                                    {/*            :*/}
                                    {/*            (*/}
                                    {/*                <p className="font-semibold">contact@uniplaza-union.com</p>*/}
                                    {/*            )*/}
                                    {/*        }*/}
                                    {/*    </div>*/}
                                    {/*    <div className="block my-5">*/}
                                    {/*        <label className="text-gray-500 text-lg">Phone</label>*/}
                                    {/*        {editing ? (*/}
                                    {/*                <input type="text" name="repPhone" value={formData.repPhone} onChange={handleChange}/>*/}
                                    {/*            )*/}
                                    {/*            :*/}
                                    {/*            (*/}
                                    {/*                <p className="font-semibold">071 734 2934</p>*/}
                                    {/*            )*/}
                                    {/*        }*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <form action="" className="w-full">
                                        <div className="w-full">
                                            <h2 className="text-xl font-bold">Club Information</h2>
                                            <div className="flex w-1/2 my-3">
                                                <div className="flex-1">
                                                    <img src={clubLogo} alt="" className="flex mx-auto"/>
                                                </div>
                                                <div className="flex-1 flex flex-col items-center justify-center">
                                                    <div className="flex flex-col my-5">
                                                        <label className="text-gray-500 text-lg">Club Name</label>
                                                        <input type="text" name="clubName"  className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.clubName} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col my-5">
                                                <label className="text-gray-500 text-lg">Description</label>
                                                <textarea name="description" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" id="" rows="3" value={formData.description} onChange={handleChange}/>
                                            </div>
                                            <div className="flex flex-col my-5">
                                                <label className="text-gray-500 text-lg">University</label>
                                                <input type="text" name="university" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.university} onChange={handleChange}/>
                                            </div>
                                            <div className="flex flex-col my-5">
                                                <label className="text-gray-500 text-lg">Official Email</label>
                                                <input type="text" name="officialEmail" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.officialEmail} onChange={handleChange}/>
                                            </div>
                                            <div className="text-end">
                                                <button type="submit" className="bg-buttonBlue text-lg text-white px-8 py-2 rounded-xl">Save Changes</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                    </section>
                )}

            {activeTab === "account" && (
                <section className="mb-10">
                    <div className="w-9/10 mx-auto mb-5">
                        <button className="flex font-bold items-center bg-buttonBlue px-3 py-2 text-white rounded-xl" onClick={handleBack}>
                            <FontAwesomeIcon icon={faArrowLeft} size={"sm"}/>
                            <span className="text-md">Back</span>
                        </button>
                    </div>
                    <div className="w-9/10 mx-auto border p-6 border-gray-300 shadow-md rounded-lg">
                        <div className="flex w-full">
                            <form action="" className="w-full">
                                <div>
                                    <h2 className="text-xl font-bold">Representative Information</h2>
                                    <div className="flex flex-col my-5">
                                        <label className="text-gray-500 text-lg">Name</label>
                                        <input type="text" name="repName" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.repName} onChange={handleChange}/>
                                    </div>
                                    <div className="flex flex-col my-5">
                                        <label className="text-gray-500 text-lg">Role</label>
                                        <input type="text" name="repRole" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.repRole} onChange={handleChange}/>
                                    </div>
                                    <div className="flex flex-col my-5">
                                        <label className="text-gray-500 text-lg">Email</label>
                                        <input type="text" name="repEmail" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.repEmail} onChange={handleChange}/>
                                    </div>
                                    <div className="flex flex-col my-5">
                                        <label className="text-gray-500 text-lg">Phone</label>
                                        <input type="text" name="repPhone" className="border border-gray-400 bg-gray-100 p-2 w-full rounded-xl" value={formData.repPhone} onChange={handleChange}/>
                                    </div>
                                    <div className="text-end">
                                        <button type="submit" className="bg-buttonBlue text-lg text-white px-8 py-2 rounded-xl">Save Changes</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            )
            }

            {activeTab === "security" && (
                <section className="mb-10">
                    <div className="w-9/10 mx-auto mb-5">
                        <button className="flex font-bold items-center bg-buttonBlue px-3 py-2 text-white rounded-xl" onClick={handleBack}>
                            <FontAwesomeIcon icon={faArrowLeft} size={"sm"}/>
                            <span className="text-md">Back</span>
                        </button>
                    </div>
                    <div className="w-9/10 mx-auto p-8 rounded-2xl border border-gray-200 shadow-md" style={{}}>
                        {Security.map((item,index)=>(
                            <div key={index} className={`flex w-full mb-5 ${(item.name === "Delete Account")?"bg-red-100 hover:bg-red-200 text-red-600 border border-red-400":"bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-400"} p-4 items-center rounded-xl cursor-pointer`}
                                 onClick={item.onClick}>
                                <div className="w-1/9">
                                    <div className="w-fit mx-auto">
                                        <FontAwesomeIcon icon={item.icon} size={"xl"}/>
                                    </div>
                                </div>
                                <span className="w-6/9 text-lg">{item.name}</span>
                                <div className="w-2/9 text-end mr-10">
                                    <span>
                                        {(item.name === "Two Factor Authentication") && (
                                            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="text-md" onClick={item.onClick}/>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>

    )
}