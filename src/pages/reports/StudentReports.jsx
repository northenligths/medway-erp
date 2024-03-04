import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { axiosClient } from "../../apiClient";
import { ImBin } from "react-icons/im";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
// import ReactExport from "react-export-excel";

const StudentReports = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState();
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState();

  const getStudents = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("student?pageNumber=0&pageSize=20 ", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data.data.content);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  const getCourses = async () => {
    try {
      const res = await axiosClient.get("/course", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  const getBatches = async (courseId) => {
    try {
      const res = await axiosClient.get(`/batch/courseId/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBatches(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStudents();
    getCourses();
  }, []);

  useEffect(() => {
    if (courseId) {
      getBatches(courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const getStudentsById = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/student/batch/${batchId}?pageNumber=0&pageSize=10 `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(res.data.data.content);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  //   const exportExcel = () => {
  //     const excel = new ReactExport();
  //     excel.addSheet("Student Report");
  //     excel.addTable(students);
  //     excel.save("my-report.xlsx");
  //   };
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto flex justify-between">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Student Reports
            </h1>
            {/* <button className="px-4 py-1 bg-blue-600 text-white">Export</button> */}
            <div className="flex gap-10">
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Courses
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    value={courseId}
                    required
                    onChange={(e) => {
                      setCourseId(e.target.value);
                    }}
                    autoComplete="country-name"
                    className=" min-w-[40px] px-2 block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Select</option>
                    {courses.map((item) => {
                      return (
                        <option key={item.courseId} value={item.courseId}>
                          {item.courseName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Batches
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="gender"
                    required
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    autoComplete="country-name"
                    className="  min-w-[40px] px-2 block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Select</option>
                    {batches.length > 0 ? (
                      batches.map((item) => (
                        <option key={item.batchId} value={item.batchId}>
                          {item.batchName}
                        </option>
                      ))
                    ) : (
                      <option>No batches in this course</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="pt-7">
                <button
                  className="border px-4 py-2 rounded-md"
                  onClick={getStudentsById}
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Serial No.
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Student Status
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Student Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Student Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Father Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Mother Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Contact No.
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date of Birth
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Library Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <div className="items-center flex justify-center py-4">
                      {" "}
                      <Oval
                        color="white"
                        secondaryColor="black"
                        width={70}
                        height={70}
                      />{" "}
                    </div>
                  ) : (
                    students?.map((item, index) => (
                      <tr key={item.batchId}>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{index + 1}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {item.studentStatus}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{item.studentId}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.studentName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.fatherName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.motherName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.contactNo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.emailId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.dateOfBirth}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.gender}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.courseName.courseName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.libraryStatus}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentReports;
