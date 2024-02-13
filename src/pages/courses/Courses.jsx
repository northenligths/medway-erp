import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { FaEye } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getCourses = async () => {
    setLoading(true);
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

  const deleteCourse = async (id) => {
    try {
      await axiosClient.delete(`removeCourse/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getCourses();
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Courses
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => navigate("/add-course")}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Course
            </button>
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
                      Course Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Course Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Course Details
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Course Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Actions
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
                    courses.map((item) => (
                      <tr key={item.courseId}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {item.courseId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="mt-1 text-gray-500">
                            {item.courseName}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="mt-1 text-gray-500">
                            {item.courseDetails}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.courseStatus}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="flex items-center gap-8">
                            <FaEye
                              className="cursor-pointer"
                              color="black"
                              fontSize={"20px"}
                              onClick={() =>
                                navigate(`/course/${item.courseId}`)
                              }
                            />
                            <ImBin
                              className="cursor-pointer"
                              color="red"
                              fontSize={"20px"}
                              onClick={() => deleteCourse(item.courseId)}
                            />
                            <FaRegEdit
                              className="cursor-pointer"
                              color="black"
                              fontSize={"20px"}
                              onClick={() =>
                                navigate(`/edit-course/${item.courseId}`, {
                                  state: item,
                                })
                              }
                            />
                            <button
                              className="border-2 rounded-md px-4 py-2"
                              onClick={() =>
                                navigate(`/add-batch/${item.courseId}`)
                              }
                            >
                              Add Batch
                            </button>
                            <button
                              className="border-2 rounded-md px-4 py-2"
                              onClick={() =>
                                navigate(`/batch-by-course/${item.courseId}`)
                              }
                            >
                              Batches
                            </button>
                          </div>
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

export default Courses;
