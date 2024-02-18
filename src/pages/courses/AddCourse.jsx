import { useState } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [courses, setCourses] = useState({
    courseName: "",
    courseDetails: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourses((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.post("/course", courses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course Created Successfully");
      navigate("/all-courses");
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to create new course");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <form onSubmit={addCourse}>
        <div className="space-y-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add New Course
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="courseName"
                    value={courses.courseName}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course Details
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="courseDetails"
                    value={courses.courseDetails}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? (
              <Oval
                color="white"
                secondaryColor="black"
                width={25}
                height={25}
              />
            ) : (
              "Add Course"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddCourse;
