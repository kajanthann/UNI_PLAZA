import {Route,Routes} from "react-router-dom";
import MainContent from "../Main-Content/mainContent.jsx";
import DefaultClubImage from '../assets/club-profile-image.png';


function ClubRoutes(){
    const name ="Gavel Club";
    const role = "Club";
    const image = DefaultClubImage;
    return (
        <Routes>
            <Route path="/Club/dashboard" element={<MainContent image={image} name={name} role={role} type="ClubDashboard"/>}></Route>
            <Route path="/Club/ads" element={<MainContent image={image} name={name} role={role} type="ClubAds"/>}></Route>
            <Route path="/Club/notifications" element={<MainContent image={image} name={name} role={role} type="ClubNotifications"/>}></Route>
            <Route path="/Club/settings" element={<MainContent image={image} name={name} role={role} type="ClubSettings"/>}></Route>
            <Route path="/Club/profile" element={<MainContent image={image} name={name} role={role} type="ClubProfile"/>}></Route>
            <Route path="/Club/admanager" element={<MainContent image={image} name={name} role={role} type="ClubAdManager"/>}></Route>
            <Route path="/Club/ad/edit/:adId" element={<MainContent image={image} name={name} role={role} type="ClubAdEdit"/>}></Route>
            <Route path="/Club/notification/details/:msgId" element={<MainContent image={image} name={name} role={role} type="NotificationDetails"/>}></Route>
        </Routes>
    )
}

export default ClubRoutes;