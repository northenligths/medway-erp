import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddStudent = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();
  const [batchId, setBatchId] = useState();
  const [courses, setCourses] = useState([]);
  console.log(batchId, "batchId");
  const [student, setStudent] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    contactNo: "",
    emailId: "",
    category: "",
    dateOfBirth: "",
    gender: "male",
    schoolName: "",
    boardName: "",
    percentage: "",
    year: "",
    Address: "",
    country: "",
    universityName: "",
    professonalCourse: "",
    leadSource: "facebook",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.post(
        `/student/batch/${batchId}
      `,
        student,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Student Added Successfully");
      //   navigate("/all-batches");
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to add new student");
    }
    setLoading(false);
  };

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

  const getBatches = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/batch", {
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
    getBatches();
    getCourses();
  }, []);

  return (
    <Layout>
      <form onSubmit={addStudent}>
        <div className="space-y-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Enquiry
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Student name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="studentName"
                    value={student.studentName}
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
                  Father's name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fatherName"
                    value={student.fatherName}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    type="text"
                    name="motherName"
                    value={student.motherName}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    type="text"
                    name="country"
                    value={student.country}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2  lg:col-span-2 md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Lead Source
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="leadSource"
                    value={student.leadSource}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={"facebook"}>Facebook</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2  lg:col-span-2 md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="category"
                    value={student.category}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                  {/* <option value={}>Day Scholar</option> */}
                  {/* <option>Google</option> */}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1  lg:col-span-2 md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Exam Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="year"
                    value={student.year}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1  lg:col-span-2 md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={student.dateOfBirth}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 lg:col-span-2 md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="gender"
                    value={student.gender}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1  lg:col-span-2 md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="emailId"
                    value={student.emailId}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 md:col-span-4">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  University Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="universityName"
                    value={student.universityName}
                    onChange={handleChange}
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full md:col-span-4">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    name="Address"
                    value={student.Address}
                    onChange={handleChange}
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-4">
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
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Select</option>
                    {batches.map((item) => {
                      console.log(item.id);
                      return (
                        <option key={item.batchId} value={item.batchId}>
                          {item.batchName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Courses
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="professonalCourse"
                    value={student.professonalCourse}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Select</option>
                    {courses.map((item) => {
                      return (
                        <option key={item.courseId} value={item.courseName}>
                          {item.courseName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="percentage"
                    value={student.percentage}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    type="text"
                    name="schoolName"
                    value={student.schoolName}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    type="text"
                    name="contactNo"
                    value={student.contactNo}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    id="email"
                    name="boardName"
                    value={student.boardName}
                    onChange={handleChange}
                    type="text"
                    autoComplete="email"
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
              "Add Student"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddStudent;
