import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineSubject } from "react-icons/md";
import { axiosClient } from "../../apiClient";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setData(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  console.log(data);
  return (
    <Layout>
      <div className="grid lg:grid-cols-12 gap-x-6 gap-y-8  sm:grid-cols-6 md:grid-cols-12">
        <div className="bg-[#843cf6] md:col-span-3 lg:col-span-6   flex items-center justify-center hover:scale-110 transition duration-500 cursor-pointer py-4 rounded-xl shadow-lg">
          <div>
            <PiStudentFill className="text-[50px] px-2 text-white" />
          </div>
          <div>
            <p className="md:text-[20px] font-bold text-[20px] px-2 whitespace-nowrap text-white">
              Total Students
            </p>
            <span className="text-xl font-bold px-4 text-white">
              {data?.Students}
            </span>
          </div>
        </div>
        <div className="bg-[#fc5286] md:col-span-3 lg:col-span-6   flex items-center justify-center hover:scale-110 transition duration-500 cursor-pointer py-4 rounded-xl shadow-lg">
          <div>
            <PiChalkboardTeacherLight className="text-[50px] px-2 text-white" />
          </div>
          <div>
            <p className="md:text-[20px] font-bold text-[20px] px-2 whitespace-nowrap text-white">
              Total Staff
            </p>
            <span className="text-xl font-bold px-4 text-white">
              {data?.Staff}
            </span>
          </div>
        </div>
        <div className="bg-[#ffc480] md:col-span-3 lg:col-span-6   flex items-center justify-center hover:scale-110 transition duration-500 cursor-pointer py-4 rounded-xl shadow-lg">
          <div>
            <RiComputerLine className="text-[50px] px-2 text-white" />
          </div>
          <div>
            <p className="md:text-[20px] font-bold text-[20px] px-2 whitespace-nowrap text-white">
              Total Courses
            </p>
            <span className="text-xl font-bold px-4 text-white">
              {data?.Courses}
            </span>
          </div>
        </div>
        <div className="bg-[#0e4cfd] md:col-span-3 lg:col-span-6   flex items-center justify-center hover:scale-110 transition duration-500 cursor-pointer py-4 rounded-xl shadow-lg">
          <div>
            <MdOutlineSubject className="text-[50px] px-2 text-white" />
          </div>
          <div>
            <p className="md:text-[20px] font-bold text-[20px] px-2 whitespace-nowrap text-white">
              Total Batches
            </p>
            <span className="text-xl font-bold px-4 text-white">
              {data?.Batches}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
