import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen,faLock,faBell,faTrash,faShareSquare} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";

export default function ClubSettings() {

    const [isToggled, setIsToggled] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const Settings = [
            {icon:faUserPen,name:"Club Profile",bar:faShareSquare},
            {icon:faLock,name:"Account & Security",bar:faShareSquare},
            {icon:faBell,name:"Notifications",bar:""},
            {icon:faTrash,name:"Delete Account",bar:""},
    ];

    const handleToggle = () => {
        const newValue = !isToggled;
        setIsToggled(newValue);
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="w-93/100 my-5 mx-auto">
                <h2 className="text-3xl font-bold mb-5">Club Settings</h2>
                <div className="mx-auto p-8 rounded-2xl border border-gray-200 shadow-md" style={{}}>
                    {Settings.map((item,index)=>(
                        <div key={index} className={`flex w-full mb-5 ${(item.name === "Delete Account")?"bg-red-100 hover:bg-red-200 text-red-600 border border-red-400":"bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-400"} p-4 items-center rounded-xl cursor-pointer`}>
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
                                            {/*<input type="checkbox" checked={isToggled} onChange={handleToggle}*/}
                                            {/*       onClick={(e) => e.stopPropagation()}/>*/}
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
            </div>
        </div>
    )
}