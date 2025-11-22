import {useState,useEffect} from "react";


export default function Footer({type}){
    const [contentShown, setContentShown] = useState(false);

    useEffect(() => {
        if (
            type === "LoginClub" ||
            type === "LoginStudent" ||
            type === "RegisterClub" ||
            type === "RegisterStudent"
        ) {
            setContentShown(false);
        } else {
            setContentShown(true);
        }
    }, [type]);

    console.log("Footer contentShown:", contentShown, "Type:", type);

    return (
        <footer id="Footer" className="bg-navyblue text-white">
            {contentShown && (
            <>
            <div className="container mx-auto py-6">
                <div className="md:flex grid grid-cols-2 gap-10 ml-10 mx-auto">
                <section className="md:flex-1">
                    <h2 className="text-2xl mb-4">Company Info</h2>
                    <div className="text-gray-400">
                        <p className="leading-9">About Us</p>
                        <p className="leading-9">Contact Us</p>
                        <p className="leading-9">FAQs</p>
                        <p className="leading-9">Terms of Service</p>
                        <p className="leading-9">Privacy Policy</p>
                    </div>
                </section>

                <section className="md:flex-1">
                    <h2 className="text-2xl mb-4">Help</h2>
                    <div className="text-gray-400">
                        <p className="leading-9">Account Support</p>
                        <p className="leading-9">Listing Events</p>
                    </div>
                </section>

                <section className="md:flex-1">
                    <h2 className="text-2xl mb-4">Categories</h2>
                    <div className="text-gray-400">
                        <p className="leading-9">Concerts & Gigs</p>
                        <p className="leading-9">Festivals & Lifestyle</p>
                        <p className="leading-9">Business & Networking</p>
                        <p className="leading-9">Performing Arts</p>
                        <p className="leading-9">Sports & Outdoors</p>
                        <p className="leading-9">Exhibitions</p>
                        <p className="leading-9">Workshops, Conferences & Classes</p>
                    </div>
                </section>

                <section className="md:flex-1">
                    <h2 className="text-2xl mb-4">Follow Us</h2>
                    <div className="text-gray-400">
                        <p className="leading-9">Facebook</p>
                        <p className="leading-9">Instagram</p>
                        <p className="leading-9">Twitter</p>
                        <p className="leading-9">Youtube</p>
                    </div>
                </section>
            </div>
            </div>
            <hr className="text-linecolor"/>
            </>
            )}
            <div className="flex justify-center py-4 text-gray-400">
                &copy;2023 Eventify. All rights reserved.
            </div>
        </footer>
    )
}