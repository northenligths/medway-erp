import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/Dashboard";

const Layout = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="basis-[12%] h-[100vh]">
          <Sidebar />
        </div>
        <div className="basis-[88%] border h-[100vh]">
          <Navbar />
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Layout;
