import React from "react";
import Navbar from "./components/club/Navbar";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/club/Sidebar";
import Dashboard from "./pages/club/Dashboard";
import { useState } from "react";

const App = () => {
  const [state, setState] = useState("student"); // student or club

  return (
    <div>
      { state === "student" && 
      // add student pages here
      <div>
        hello
      </div>
      }
      
      {state === "club" && 

      // Add club pages here
      <div>
        <div className="bg-[#F8F9FA]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default App;
