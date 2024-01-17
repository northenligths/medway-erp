import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/Dashboard";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="h-screen md:w-52 w-40 z-50 relative">
        <Sidebar open={open} setOpen={setOpen} />
      </div>
      <div className="absolute top-0 left-0 w-full z-0">
        <Navbar open={open} setOpen={setOpen} />
        <Dashboard />
      </div>
    </div>
  );
};

export default Layout;
