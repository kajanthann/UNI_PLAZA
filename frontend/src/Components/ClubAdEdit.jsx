import CreateAds from "../assets/createAds.png";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function ClubAdEdit() {
    const { state } = useLocation();
    const { adId } = useParams();
    const navigate = useNavigate();

    if (!state) return <p>⚠️ No data received for Ad ID {adId}</p>;

    const [adData, setAdData] = useState(state);
    const [file, setFile] = useState(null);
    const [input, setInput] = useState("");
    const [tags, setTags] = useState(state.Tags || []);
    const [active, setActive] = useState(false);
    const [form, setForm] = useState(true);

    useEffect(() => {
        setAdData((prev) => ({ ...prev, Tags: tags }));
    }, [tags]);

    const handleChange = (e) => {
        setAdData({ ...adData, [e.target.name]: e.target.value });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Tab" || e.key === ",") {
            e.preventDefault();
            const newTag = input.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInput("");
            setActive(true);
        }
    };

    const removeTags = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleForm = () => {
        setForm(!form);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAd = { ...adData, Tags: tags, Image: file || adData.Image };
        console.log("✅ Updated Ad Details:", updatedAd);
        alert("Ad updated successfully!");
        navigate("/Club/ad");
    };

    return (
        <div className="pb-10 my-4">
            <div className="mt-8 mb-4 w-92/100 mx-auto text-center md:text-left">
                <h2 className="mb-2 text-2xl md:text-3xl font-bold">Edit Event</h2>
                <p className="text-md text-gray-500">
                    Update the details for the event and save the changes
                </p>
            </div>

            <div className="w-92/100 mx-auto">
                <div className="border border-gray-400 rounded-2xl mb-10">
                    <div className="w-9/10 mx-auto my-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
                                <div className="flex flex-col">
                                    <label className="flex">
                                        Event Title<span className="text-red-600 text-xl">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="EventTitle"
                                        placeholder="Annual Tech Summit 2024"
                                        onChange={handleChange}
                                        value={adData.EventTitle}
                                        className="p-2 bg-gray-200 rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="flex">
                                        Event Date<span className="text-red-600 text-xl">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="EventDate"
                                        placeholder="October 26, 2024"
                                        onChange={handleChange}
                                        value={adData.EventDate}
                                        className="p-2 bg-gray-200 rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="flex">
                                        Start Time<span className="text-red-600 text-xl">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="StartTime"
                                        placeholder="10.00 AM"
                                        onChange={handleChange}
                                        value={adData.StartTime}
                                        className="p-2 bg-gray-200 rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="flex">
                                        Location / Venue<span className="text-red-600 text-xl">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="StarHall"
                                        placeholder="Grand Convention Hall"
                                        onChange={handleChange}
                                        value={adData.StarHall || ""}
                                        className="p-2 bg-gray-200 rounded-xl mb-3"
                                    />
                                    <input
                                        type="text"
                                        name="StarLocation"
                                        placeholder="https://maps.app.goo.gl/example"
                                        onChange={handleChange}
                                        value={adData.StarLocation || ""}
                                        className="p-2 bg-gray-200 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mb-5">
                                <label className="flex">
                                    University Name<span className="text-red-600 text-xl">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="University"
                                    placeholder="University of Kelaniya"
                                    onChange={handleChange}
                                    value={adData.University}
                                    className="p-2 bg-gray-200 rounded-xl"
                                />
                            </div>

                            <div className="flex flex-col my-5">
                                <label className="flex">
                                    Description of the event
                                    <span className="text-red-600 text-xl">*</span>
                                </label>
                                <textarea
                                    name="Description"
                                    className="p-2 bg-gray-200 rounded-xl"
                                    rows="3"
                                    onChange={handleChange}
                                    value={adData.Description}
                                    placeholder="Join us for the most anticipated technology event of the year! Explore cutting-edge innovations, network with industry leaders, and discover the future of tech."
                                />
                            </div>

                            <div>
                                <h2 className="mb-5">Related Links (optional)</h2>
                                <div className="flex flex-col md:flex-row mb-5 w-full gap-4">
                                    <div className="border border-dashed border-gray-400 p-2 rounded-2xl text-center md:w-1/3 w-full">
                                        Register Now
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <input
                                            type="text"
                                            name="RelatedLinks"
                                            placeholder="https://techsummit24.com/register"
                                            onChange={handleChange}
                                            value={adData.RelatedLinks}
                                            className="p-2 bg-gray-200 rounded-xl w-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row mb-5 w-full gap-4">
                                    <div className="flex flex-col md:w-1/3 w-full">
                                        <label className="flex">
                                            Contact number<span className="text-red-600 text-xl">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="Phone"
                                            placeholder="073 923404-98"
                                            onChange={handleChange}
                                            value={adData.Phone}
                                            className="p-2 bg-gray-200 rounded-xl w-full"
                                        />
                                    </div>

                                    <div className="flex flex-col md:w-2/3 w-full">
                                        <label className="flex">
                                            Upload Poster/Image(s)
                                            <span className="text-red-600 text-xl">*</span>
                                        </label>
                                        <label
                                            htmlFor="poster"
                                            className="block border-2 border-dashed border-gray-300 bg-gray-200 rounded-2xl p-6 text-center text-gray-500 text-sm cursor-pointer hover:bg-gray-100"
                                        >
                                            Drag and drop your event poster here, or click to browse (Max 5MB)
                                        </label>
                                        <input
                                            id="poster"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        {file && (
                                            <p className="text-gray-600 mt-2">Selected file: {file.name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="my-5">
                                    <div className="flex flex-col mb-5">
                                        <label>Email Address</label>
                                        <input
                                            type="text"
                                            name="Contact"
                                            placeholder="club@example.edu"
                                            onChange={handleChange}
                                            value={adData.Contact}
                                            className="p-2 bg-gray-200 rounded-xl"
                                        />
                                    </div>

                                    {/* 🔖 TAGS SECTION */}
                                    <div className="flex flex-col mb-8">
                                        <label>Tags</label>
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type and press Tab..."
                                            onKeyDown={handleKeyDown}
                                            className="p-2 bg-gray-200 rounded-xl"
                                        />
                                        <div
                                            className={`flex flex-wrap items-center gap-2 mt-3 ${
                                                active
                                                    ? "border border-gray-300 rounded-md px-3 py-2 bg-blue-50"
                                                    : "border-0 bg-white"
                                            }`}
                                        >
                                            {tags.map((tag, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-blue-600"
                                                >
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

                                <button
                                    type="submit"
                                    className="bg-buttonBlue w-full text-center text-white py-3 rounded-2xl"
                                >
                                    Submit for Approval
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
