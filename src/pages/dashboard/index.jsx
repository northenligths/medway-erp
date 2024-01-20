import Layout from "../../components/layout";
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineSubject } from "react-icons/md";

export const Dashboard = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center gap-6">
        <div className="bg-white shadow-md flex items-center justify-center hover:scale-110 transition duration-500 cursor-pointer">
          <div>
            <PiStudentFill className="text-[200px]" />
          </div>
          <div>
            <p className="text-[50px] font-bold">Total Students</p>
            <span className="text-xl font-bold">50</span>
          </div>
        </div>
        <div className="bg-white shadow-md flex items-center justify-center hover:scale-110  transition duration-500 cursor-pointer">
          <div>
            <PiChalkboardTeacherLight className="text-[200px]" />
          </div>
          <div>
            <p className="text-[50px] font-bold">Total Staff</p>
            <span className="text-xl font-bold">50</span>
          </div>
        </div>
        <div className="bg-white shadow-md flex items-center justify-center hover:scale-110  transition duration-500 cursor-pointer">
          <div>
            <RiComputerLine className="text-[200px]" />
          </div>
          <div>
            <p className="text-[50px] font-bold">Total Sections</p>
            <span className="text-xl font-bold">50</span>
          </div>
        </div>
        <div className="bg-white shadow-md flex items-center justify-center hover:scale-110  transition duration-500 cursor-pointer">
          <div>
            <MdOutlineSubject className="text-[200px]" />
          </div>
          <div>
            <p className="text-[50px] font-bold">Total Students</p>
            <span className="text-xl font-bold">50</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};