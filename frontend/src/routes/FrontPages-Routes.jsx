import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from '../Front-Pages/Home';
import LoginClub from '../Front-Pages/LoginClub';
import LoginStudent from '../Front-Pages/LoginStudent';
import RegisterClub from '../Front-Pages/RegisterClub';
import RegisterStudent from '../Front-Pages/RegisterStudent';
import EventDashboard from '../Front-Pages/EventDashboard';


function FrontPagesRoutes(){
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/LoginClub" element={<LoginClub/>}/>
        <Route path="/LoginStudent" element={<LoginStudent/>}/>
        <Route path="/RegisterClub" element={<RegisterClub/>}/>
        <Route path="/RegisterStudent" element={<RegisterStudent/>}/>
        <Route path="/EventDashboard" element={<EventDashboard/>}/>
    </Routes>
}

export default FrontPagesRoutes;