import React, { useState } from "react";
import { FaSearch, FaEnvelope, FaRegBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ open, setOpen }) => {
  const [profile, setProfile] = useState(false);

  const showProfile = () => {
    setProfile(!profile);
  };

  return (
    <div className="">
      <div className="flex items-center justify-center h-[70px] shadow-lg md:px-[25px] ">
        <div className="flex items-center justify-center rounded-[5px] gap-8 pr-[10px]">
          <GiHamburgerMenu
            fontSize={"30px"}
            onClick={() => {
              console.log("clicked");
              setOpen(!open);
            }}
          />
          <div className="flex items-center">
            <input
              type="text"
              className=" bg-[#F8F9FC] h-[40px] w-[120px] outline-none pl-[10px] md:w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
              placeholder="Search for..."
            />
            <div className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
              <FaSearch color="white" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[20px] ">
          <div
            className="flex items-center gap-[15px] relative"
            onClick={showProfile}
          >
            <p className="hidden">Douglas McGee</p>
            <div className="md:h-[50px] h-[40px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40">
              {/* <img src={profile} alt="" /> */}
            </div>

            {profile && (
              <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                <p className="cursor-pointer hover:text-[blue] font-semibold">
                  Profile
                </p>
                <p className="cursor-pointer hover:text-[blue] font-semibold">
                  Settings
                </p>
                <p className="cursor-pointer hover:text-[blue] font-semibold">
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
