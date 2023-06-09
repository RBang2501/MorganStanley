import React, {useState} from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const Main=({user,setUser}) =>{
	const [open,setOpen] =useState(false);
	const [openSide, toggle] = useState(true);
	const handleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }

	return(
		<>
		<div className={`flex flex-row w-full`}>
			<div className="flex pd-0">
				<SideBar user={user} setuser={(value)=>setUser(value)} open={open} setOpen={(value)=>setOpen(value)} handdleToggle={()=>handleToggle()} openSide={openSide} toggle={toggle}/>
			</div>
			<div className={`flex flex-col w-full ${open && "blur-sm"}`}>
				<NavBar user={user} open={open} setOpen={(value)=>setOpen(value)} toggle={toggle}/>
				<div className="container mx-auto lg:ms-2 overflow-y-scroll bg-color2">
				<Outlet/>
				</div>
			</div>
		</div>
		</>
	)
}

export default Main;