import React from "react";
import { Route, Routes } from "react-router-dom";
import MainContent from "../Main-Content/mainContent.jsx";

function FrontPagesRoutes() {
    return (
        <Routes>
            {/* <Route path="/VerifyEmail" element={<MainContent role='' type="VerifyEmail"/>}/> */}
            <Route path="/" element={<MainContent role='' type="Home"/>}/>
            <Route path="/Test" element={<MainContent role='' type="Test"/>}/>
            <Route path="/Home" element={<MainContent role='' type="Home"/>}/>
            <Route path="/LoginClub" element={<MainContent role='' type="LoginClub"/>}/>
            <Route path="/LoginStudent" element={<MainContent role='' type="LoginStudent"/>}/>
            <Route path="/RegisterClub" element={<MainContent role='' type="RegisterClub"/>}/>
            <Route path="/RegisterStudent" element={<MainContent role='' type="RegisterStudent"/>}/>
            <Route path="/EventDashboard" element={<MainContent role='' type="EventDashboard"/>}/>
            <Route path="/EventDashboard/adview/:adId" element={<MainContent role='' type="EventAdView"/>}></Route>
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
