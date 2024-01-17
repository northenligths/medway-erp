import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaRegSun,
  FaWrench,
  FaStickyNote,
  FaRegChartBar,
  FaRegCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
  FaBolt,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Sidebar = ({ open, setOpen }) => {
  return open ? (
    <div className="bg-[#4E73DF] px-[25px] h-screen">
      <div className="md:px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3] ">
        <h1 className="text-white md:text-[20px] leading-[24px] font-extrabold cursor-pointer">
          Medway ERP
        </h1>
        {open ? (
          <RxCross1
            className="text-white md:text-[50px] text-[30px]"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <GiHamburgerMenu fontSize={"50px"} className="text-white" />
        )}
      </div>
      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer">
        <FaTachometerAlt color="white" />
        <p className="text-[14px] leading-[20px] font-bold text-white">
          Dashboard
        </p>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">
          {" "}
          INTERFACE
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaRegSun color="white" />{" "}
            <p className="text-[14px] leading-[20px] font-normal text-white">
              Components
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaWrench color="white" />{" "}
            <p className="text-[14px] leading-[20px] font-normal text-white">
              Utilities
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">
          {" "}
          ADDONS
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaStickyNote color="white" />{" "}
            <p className="text-[14px] leading-[20px] font-normal text-white">
              Pages
            </p>
          </div>
          <FaChevronRight color="white" />
        </div>
        <div className="flex items-center gap-[10px] py-[15px]  cursor-pointer">
          <FaRegChartBar color="white" />{" "}
          <p className="text-[14px] leading-[20px] font-normal text-white">
            Charts
          </p>
        </div>
        <div className="flex items-center gap-[10px] py-[15px] cursor-pointer">
          <FaRegCalendarAlt color="white" />{" "}
          <p className="text-[14px] leading-[20px] font-normal text-white">
            Tables
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Sidebar;
