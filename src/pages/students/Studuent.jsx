import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Student = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [student, setStudent] = useState({
    studentName: location.state.studentName,
    fatherName: location.state.fatherName,
    motherName: location.state.motherName,
    contactNo: location.state.contactNo,
    emailId: location.state.emailId,
    category: location.state.category,
    dateOfBirth: location.state.dateOfBirth,
    gender: location.state.gender,
    schoolName: location.state.schoolName,
    boardName: location.state.boardName,
    percentage: location.state.percentage,
    year: location.state.year,
    Address: location.state.Address,
    country: location.state.country,
    universityName: location.state.universityName,
    professonalCourse: location.state.professonalCourse,
    leadSource: location.state.leadSource,
    batches: location.state.batchName.batchName,
    courses: location.state?.batchName.courseName?.courseName,
  });

  return (
    <Layout>
      <div className="">
        <div className="grid md:grid-cols-12 gap-x-24 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3 md:col-span-9">
            <div className="grid md:grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Student name
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="studentName"
                    value={student.studentName}
                    id="first-name"
                    autoComplete="given-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Father&apos;s name
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="fatherName"
                    value={student.fatherName}
                    id="last-name"
                    autoComplete="family-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mother name
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="motherName"
                    value={student.motherName}
                    id="last-name"
                    autoComplete="family-name"
                    className="  cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="country"
                    value={student.country}
                    id="last-name"
                    autoComplete="family-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2  md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="email"
                    name="emailId"
                    value={student.emailId}
                    id="city"
                    autoComplete="address-level2"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2    md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="date"
                    name="dateOfBirth"
                    value={student.dateOfBirth}
                    id="city"
                    autoComplete="address-level2"
                    className="  cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1 md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact No.
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="contactNo"
                    value={student.contactNo}
                    id="city"
                    autoComplete="address-level2"
                    className="  cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full md:col-span-3">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    readOnly
                    name="Address"
                    value={student.Address}
                    id="street-address"
                    autoComplete="street-address"
                    className="  cursor-not-allowed max-w-[450px] px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3  md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    id="country"
                    name="gender"
                    value={student.gender}
                    autoComplete="country-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2  md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Lead Source
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    id="country"
                    name="leadSource"
                    value={student.leadSource}
                    autoComplete="country-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  University Name
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="universityName"
                    value={student.universityName}
                    id="region"
                    autoComplete="address-level1"
                    className=" cursor-not-allowed  px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2  md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Exam Date
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="date"
                    name="year"
                    value={student.year}
                    id="city"
                    autoComplete="address-level2"
                    className="  cursor-not-allowed  px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Batch
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="gender"
                    readOnly
                    value={student.batches}
                    autoComplete="country-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    id="country"
                    name="professonalCourse"
                    value={student.courses}
                    autoComplete="country-name"
                    className=" cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Percentage
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="percentage"
                    value={student.percentage}
                    id="last-name"
                    autoComplete="family-name"
                    className="  cursor-not-allowed  px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  School Name
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    type="text"
                    name="schoolName"
                    value={student.schoolName}
                    id="last-name"
                    autoComplete="family-name"
                    className="  cursor-not-allowed  px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 md:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Board Name
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    id="email"
                    name="boardName"
                    value={student.boardName}
                    type="text"
                    autoComplete="email"
                    className="  cursor-not-allowed  px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:col-span-3 md:col-span-3 mt-4">
            <div className="cols-span-3 py-4">
              <button
                className="border-2 rounded-lg  py-2  w-[200px] max-w-[200px] bg-blue-600 text-white shadow-lg"
                onClick={() =>
                  navigate(`/deposit-fee/${location.state.studentId}`, {
                    state: location.state,
                  })
                }
              >
                Deposit Fees
              </button>
            </div>
            <div className="cols-span-3 py-4">
              <button
                className="border-2 rounded-md px-4 py-2 w-[200px] max-w-[200px] bg-blue-600 text-white shadow-lg"
                onClick={() =>
                  navigate(`/payment-by-student/${location.state.studentId}`)
                }
              >
                View Payments
              </button>
            </div>
            <div className="cols-span-3 py-4">
              <button
                className="border-2 rounded-md px-4 py-2  w-[200px] max-w-[200px] bg-blue-600 text-white shadow-lg"
                onClick={() =>
                  navigate(
                    `/add-discount-by-student/${location.state.studentId}`
                  )
                }
              >
                Add Discount
              </button>
            </div>
            <div className="cols-span-3 py-4">
              <button
                className="border-2 rounded-md px-4 py-2  w-[200px] max-w-[200px] bg-blue-600 text-white shadow-lg"
                onClick={() =>
                  navigate(`/add-library/${location.state.studentId}`)
                }
              >
                Add Library
              </button>
            </div>
            <div className="cols-span-3 py-4">
              <button
                className="border-2 rounded-md px-4 py-2  w-[200px] max-w-[200px] bg-blue-600 text-white shadow-lg"
                onClick={() =>
                  navigate(`/library-by-student/${location.state.studentId}`)
                }
              >
                View Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Student;
