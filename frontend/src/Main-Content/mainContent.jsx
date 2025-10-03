import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import Home from '../Front-Pages/Home.jsx'
import LoginStudent from '../Front-Pages/LoginStudent.jsx';
import LoginClub from "../Front-Pages/LoginClub.jsx";
import RegisterClub from "../Front-Pages/RegisterClub.jsx";
import RegisterStudent from "../Front-Pages/RegisterStudent.jsx";
import EventDashboard from "../Front-Pages/EventDashboard.jsx";
import Slider from '../Components/Slidebar.jsx'
import {useState} from 'react'

// Club Details
import ClubAds from '../Components-Club/ClubAds.jsx'
import ClubDashboard from '../Components-Club/ClubDashboard.jsx'
import ClubFeedback from '../Components-Club/ClubFeedback.jsx'
import ClubNotifications from '../Components-Club/ClubNotifications.jsx'
import ClubSettings from '../Components-Club/ClubSettings.jsx'
import ClubProfile from '../Components-Club/ClubProfile.jsx'

// Student Details
import StudentDashboard from '../Components-Student/StudentDashboard.jsx'
import StudentEventList from '../Components-Student/StudentEventList.jsx'
import StudentFeedback from '../Components-Student/StudentFeedback.jsx'
import StudentNotifications from '../Components-Student/StudentNotifications.jsx'
import StudentSettings from '../Components-Student/StudentSettings.jsx'
import StudentProfile from '../Components-Student/StudentProfile.jsx'


function MainContent({name,image,role,type}){
    const [messages] = useState([]);
    return (
        <>
        {role ? (
        <div>
            <div>
                <Header name={name} image={image} role={role} type={type}/>
            </div>
            <div>
                <Slider messages={messages} role={role}/>
            </div>
            <div>
                {role === 'Club' && (
                    <>
                        {type === 'ClubDashboard' && <ClubDashboard/>}
                        {type === 'ClubAds' && <ClubAds/>}
                        {type === 'ClubNotifications' && <ClubNotifications/>}
                        {type === 'ClubSettings'&& <ClubSettings/>}
                        {type === 'ClubProfile' && <ClubProfile/>}
                        {type === 'ClubFeedback' && <ClubFeedback/>}
                    </>
                )
                }
                {role === 'Student' && (
                    <>
                        {type === 'StudentDashboard' && <StudentDashboard/>}
                        {type === 'StudentEventList' && <StudentEventList/>}
                        {type === 'StudentNotifications' && <StudentNotifications/>}
                        {type === 'StudentSettings'&& <StudentSettings/>}
                        {type === 'StudentProfile' && <StudentProfile/>}
                        {type === 'StudentFeedback' && <StudentFeedback/>}
                    </>
                )
                }
            </div>

        </div>
        ) : (
        <div>
            <div>
                <Header name={name} image={image} role={role} type={type}/>
            </div>
            <div>
                <>
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