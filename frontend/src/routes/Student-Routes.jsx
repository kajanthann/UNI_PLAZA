import {Route, Routes} from "react-router-dom";
import MainContent from "../Main-Content/mainContent.jsx";


function StudentRoutes(){
    const name ="Azeem";
    const role = "Student";
    return (
        <Routes>
            <Route path="/Studentdashboard" element={<MainContent name={name} role={role} type="StudentDashboard"/>}></Route>
            <Route path="/Studentevenlist" element={<MainContent name={name} role={role} type="StudentEvenList"/>}></Route>
            <Route path="/Studentnotifications" element={<MainContent name={name} role={role} type="StudentNotifications"/>}></Route>
            <Route path="/Studentsettings" element={<MainContent name={name} role={role} type="StudentSettings"/>}></Route>
            <Route path="/Studentprofile" element={<MainContent name={name} role={role} type="StudentProfile"/>}></Route>
            <Route path="/Studentfeedback" element={<MainContent name={name} role={role} type="StudentFeedback"/>}></Route>
        </Routes>
    )
}

export default StudentRoutes;