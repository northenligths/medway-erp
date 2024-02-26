import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewAdmission = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [batchId, setBatchId] = useState();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState();
  const [batches, setBatches] = useState([]);
  const [enquiries, setEnquries] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    contactNo: "",
    emailId: "",
    category: "",
    dateOfBirth: "",
    gender: "",
    schoolName: "",
    boardName: "",
    percentage: "",
    year: "",
    Address: "",
    country: "",
    universityName: "",
    professonalCourse: "",
    leadSource: "",
  });

  const addEnquiry = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.post(
        `/enquiry/batch/${batchId}
      `,
        enquiries,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Enquiry Added Successfully");
      navigate("/view-admission");
    } catch (err) {
      console.log("err", err);
      if (err.response.data.error.contactNo) {
        toast.error(err.response.data.error.contactNo);
      }
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      }
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnquries((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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

  const getBatches = async (courseId) => {
    setLoading(true);
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
    getCourses();
  }, []);

  useEffect(() => {
    if (courseId) {
      getBatches(courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  return (
    <Layout>
      <form onSubmit={addEnquiry}>
        <div className="space-y-12">
          <div className="flex items-center justify-center">
            <h2 className="pb-4 font-semibold leading-7 text-gray-900 md:text-[50px]">
              New Enquiry/Admission Form
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-4">
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
                    value={enquiries.studentName}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-4">
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
                    required
                    value={enquiries.fatherName}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-4">
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
                    value={enquiries.motherName}
                    onChange={handleChange}
                    required
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1 md:col-span-4">
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
                    required
                    value={enquiries.contactNo}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1  md:col-span-4">
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
                    required
                    value={enquiries.emailId}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1 md:col-span-4">
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
                    value={enquiries.dateOfBirth}
                    onChange={handleChange}
                    required
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    value={enquiries.Address}
                    onChange={handleChange}
                    required
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-4">
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
                    value={enquiries.gender}
                    required
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    <option>Select</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between md:gap-14">
                <div className="py-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium pl-2 text-gray-900"
                  >
                    General
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      type="radio"
                      name="category"
                      value="general"
                      onChange={handleChange}
                      required
                      autoComplete="country-name"
                      className="block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium pl-2 text-gray-900"
                  >
                    OBC
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      type="radio"
                      name="category"
                      value="obc"
                      onChange={handleChange}
                      required
                      autoComplete="country-name"
                      className="block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium pl-2 text-gray-900"
                  >
                    SC/ST
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      type="radio"
                      name="category"
                      value="SC/ST"
                      onChange={handleChange}
                      required
                      autoComplete="country-name"
                      className="block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium pl-2 text-gray-900"
                  >
                    Others
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      type="radio"
                      name="category"
                      value="others"
                      onChange={handleChange}
                      required
                      autoComplete="country-name"
                      className="block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2  md:col-span-4">
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
                    className="block w-full py-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
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
                    required
                    onChange={(e) => setBatchId(e.target.value)}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highest Qualification
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="professonalCourse"
                    value={enquiries.professonalCourse}
                    onChange={handleChange}
                    required
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    value={enquiries.schoolName}
                    required
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
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
                    value={enquiries.boardName}
                    onChange={handleChange}
                    type="text"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1  md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Year
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="year"
                    value={enquiries.year}
                    required
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
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
                    type="text"
                    name="percentage"
                    value={enquiries.percentage}
                    onChange={handleChange}
                    required
                    id="last-name"
                    autoComplete="family-name"
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
                    value={enquiries.universityName}
                    required
                    onChange={handleChange}
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2  md:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Lead Source
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="leadSource"
                    value={enquiries.leadSource}
                    required
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-4">
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
                    value={enquiries.country}
                    required
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
              "Add Enquiry"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default NewAdmission;
