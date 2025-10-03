import {Route,Routes} from "react-router-dom";
import MainContent from "../Main-Content/mainContent.jsx";


function ClubRoutes(){
    const name ="Gavel Club";
    const role = "Club";
    return (
        <Routes>
            <Route path="/Clubdashboard" element={<MainContent name={name} role={role} type="ClubDashboard"/>}></Route>
            <Route path="/Clubads" element={<MainContent name={name} role={role} type="ClubAds"/>}></Route>
            <Route path="/Clubnotifications" element={<MainContent name={name} role={role} type="ClubNotifications"/>}></Route>
            <Route path="/Clubsettings" element={<MainContent name={name} role={role} type="Settings"/>}></Route>
            <Route path="/Clubprofile" element={<MainContent name={name} role={role} type="ClubProfile"/>}></Route>
            <Route path="/Clubfeedback" element={<MainContent name={name} role={role} type="ClubFeedback"/>}></Route>
        </Routes>
    )
}

export default ClubRoutes;