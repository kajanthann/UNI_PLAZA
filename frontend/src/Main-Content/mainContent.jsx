import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import Home from '../Front-Pages/Home.jsx'
import LoginStudent from '../Front-Pages/LoginStudent.jsx';
import LoginClub from "../Front-Pages/LoginClub.jsx";
import RegisterClub from "../Front-Pages/RegisterClub.jsx";
import RegisterStudent from "../Front-Pages/RegisterStudent.jsx";
import EventDashboard from "../Front-Pages/EventDashboard.jsx";
import Slider from '../Components/Slidebar.jsx'
import Test from '../Components/Test.jsx'
import VerifyEmail from "../Components/VerifyEmail.jsx";
import {useState} from 'react'

// Club Details
import ClubAds from '../Components-Club/ClubAds.jsx'
import ClubDashboard from '../Components-Club/ClubDashboard.jsx'
import ClubAdManager from '../Components-Club/ClubAdManager.jsx'
import ClubNotifications from '../Components-Club/ClubNotifications.jsx'
import ClubSettings from '../Components-Club/ClubSettings.jsx'
import ClubProfile from '../Components-Club/ClubProfile.jsx'
import ClubAdEdit from "../Components-Club/ClubAdEdit.jsx";

// Student Details
import StudentDashboard from '../Components-Student/StudentDashboard.jsx'
import StudentEventList from '../Components-Student/StudentEventList.jsx'
import StudentEventManager from '../Components-Student/StudentEventManager.jsx'
import StudentNotifications from '../Components-Student/StudentNotifications.jsx'
import StudentSettings from '../Components-Student/StudentSettings.jsx'
import StudentProfile from '../Components-Student/StudentProfile.jsx'


function MainContent({name,image,role,type}){
    const [messages] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
        {role ? (
        <div>
            <div>
                <Header name={name} image={image} role={role} type={type} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            </div>
            <div className="flex min-h-screen">
                <div>
                    <Slider messages={messages} role={role} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                </div>
                <div className="w-full">
                    {role === 'Club' && (
                        <>
                            {type === 'ClubDashboard' && <ClubDashboard/>}
                            {type === 'ClubAds' && <ClubAds/>}
                            {type === 'ClubNotifications' && <ClubNotifications/>}
                            {type === 'ClubSettings'&& <ClubSettings/>}
                            {type === 'ClubProfile' && <ClubProfile image={image}/>}
                            {type === 'ClubAdManager' && <ClubAdManager/>}
                            {type === 'ClubAdEdit' && <ClubAdEdit/>}
                        </>
                    )
                    }
                    {role === 'Student' && (
                        <>
                            {type === 'StudentDashboard' && <StudentDashboard/>}
                            {type === 'StudentEventList' && <StudentEventList/>}
                            {type === 'StudentNotifications' && <StudentNotifications/>}
                            {type === 'StudentSettings'&& <StudentSettings/>}
                            {type === 'StudentProfile' && <StudentProfile image={image}/>}
                            {type === 'StudentEventManager' && <StudentEventManager/>}
                        </>
                    )
                    }
                </div>

            </div>
        </div>
        ) : (
        <div>
            <div>
                <Header name={name} image={image} role={role} type={type} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            </div>
            <div>
                <>
                    {/* {type === 'VerifyEmail' && <VerifyEmail/>} */}
                    {type === 'Test' && <Test/>}
                    {type === 'Home' && <Home/>}
                    {type === 'LoginClub' && <LoginClub/>}
                    {type === 'LoginStudent' && <LoginStudent/>}
                    {type === 'RegisterClub'&& <RegisterClub/>}
                    {type === 'RegisterStudent' && <RegisterStudent/>}
                    {type === 'EventDashboard' && <EventDashboard/>}
                </>
            </div>
        </div>
        )}
        <Footer type={type}/>
        </>
    )
}

export default MainContent;