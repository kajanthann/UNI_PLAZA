import {Route, Routes} from "react-router-dom";
import MainContent from "../Main-Content/mainContent.jsx";
import DefaultStudentImage from "../assets/profile-image.png";


function StudentRoutes(){
    const name ="Azeem";
    const role = "Student";
    const image = DefaultStudentImage;
    return (
        <Routes>
            <Route path="/Student/dashboard" element={<MainContent image={image} name={name} role={role} type="StudentDashboard"/>}></Route>
            <Route path="/Student/evenlist" element={<MainContent image={image} name={name} role={role} type="StudentEventList"/>}></Route>
            <Route path="/Student/notifications" element={<MainContent image={image} name={name} role={role} type="StudentNotifications"/>}></Route>
            <Route path="/Student/settings" element={<MainContent image={image} name={name} role={role} type="StudentSettings"/>}></Route>
            <Route path="/Student/profile" element={<MainContent image={image} name={name} role={role} type="StudentProfile"/>}></Route>
            <Route path="/Student/eventmanager" element={<MainContent image={image} name={name} role={role} type="StudentEventManager"/>}></Route>
        </Routes>
    )
}

export default StudentRoutes;