import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginAdmin from '../Front-Pages/Login-Admin';


function FrontPagesRoutes(){
    <Routes>
        <Route path="/" element={<LoginAdmin/>}/>
        <Route path="/LoginAdmin" element={<LoginAdmin/>}/>
    </Routes>
}

export default FrontPagesRoutes;