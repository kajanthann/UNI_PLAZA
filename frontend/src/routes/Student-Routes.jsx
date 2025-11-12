import {Route, Routes} from "react-router-dom";
import MainContent from "../Main-Content/mainContent.jsx";
import DefaultStudentimage from "../assets/profile-image.png";


function StudentRoutes(){
    const name ="Azeem";
    const role = "Student";
    const image = DefaultStudentimage;
    return (
        <Routes>
            <Route path="/Studentdashboard" element={<MainContent image={image} name={name} role={role} type="StudentDashboard"/>}></Route>
            <Route path="/Studentevenlist" element={<MainContent image={image} name={name} role={role} type="StudentEventList"/>}></Route>
            <Route path="/Studentnotifications" element={<MainContent image={image} name={name} role={role} type="StudentNotifications"/>}></Route>
            <Route path="/Studentsettings" element={<MainContent image={image} name={name} role={role} type="StudentSettings"/>}></Route>
            <Route path="/Studentprofile" element={<MainContent image={image} name={name} role={role} type="StudentProfile"/>}></Route>
            <Route path="/Studenteventmanager" element={<MainContent image={image} name={name} role={role} type="StudentEventManager"/>}></Route>
        </Routes>
    )
}

export default StudentRoutes;