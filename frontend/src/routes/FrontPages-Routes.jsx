import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from '../Front-Pages/Home.jsx';
// import LoginClub from '../Front-Pages/LoginClub.jsx';
// import LoginStudent from '../Front-Pages/LoginStudent.jsx';
// import RegisterClub from '../Front-Pages/RegisterClub.jsx';
// import RegisterStudent from '../Front-Pages/RegisterStudent.jsx';
// import EventDashboard from '../Front-Pages/EventDashboard.jsx';
import MainContent from "../Main-Content/mainContent.jsx";

function FrontPagesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainContent role='' type="Home"/>}/>
            <Route path="/Home" element={<MainContent role='' type="Home"/>}/>
            <Route path="/LoginClub" element={<MainContent role='' type="LoginClub"/>}/>
            <Route path="/LoginStudent" element={<MainContent role='' type="LoginStudent"/>}/>
            <Route path="/RegisterClub" element={<MainContent role='' type="RegisterClub"/>}/>
            <Route path="/RegisterStudent" element={<MainContent role='' type="RegisterStudent"/>}/>
            <Route path="/EventDashboard" element={<MainContent role='' type="EventDashboard"/>}/>
            {/*<Route path="/" element={<Home/>} />*/}
            {/*<Route path="/Home" element={<Home/>} />*/}
            {/*<Route path="/LoginClub" element={<LoginClub/>} />*/}
            {/*<Route path="/LoginStudent" element={<LoginStudent/>} />*/}
            {/*<Route path="/RegisterClub" element={<RegisterClub/>} />*/}
            {/*<Route path="/RegisterStudent" element={<RegisterStudent/>} />*/}
            {/*<Route path="/EventDashboard" element={<EventDashboard/>} />*/}
        </Routes>
    );
}

export default FrontPagesRoutes;
