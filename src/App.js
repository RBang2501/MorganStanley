import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Dashboard1 from "./components/DashBoard1";
import SideBar from "./components/SideBar";
import AddChild from "./components/AddChild";
import ChildProfile from "./components/ChildProfile";
import ChildrenList from "./components/ChildrenList";
import AddchildXL from "./components/addChildxl";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
    <div className="sm:flex sm:w-full h-full bg-[#C1DDB4]">
        <Router>
          <AuthProvider>
            {user && <SideBar setuser={(value)=>setUser(value)}/>}
            <Routes>
              <Route index element={<Login setuser={(value)=>setUser(value)}/>}></Route>
              <Route exact path="caseManager" element={<Dashboard user={user}/>}/>
              <Route path="caseManager/addChild" element={<AddChild user={user}/>}/>
              <Route path="caseManager/list" element={< ChildrenList user={user}/>} />
              <Route path="caseManager/list/:id" element={<ChildProfile user={user}/>} />
              <Route path="caseManager/addExcel" element={<AddchildXL />}/>
              <Route path="signup" element={<Signup />} />
              <Route path="/groundWorker" element={<Dashboard1 />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;

