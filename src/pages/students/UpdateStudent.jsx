import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { enquirySchema } from "../../validationSchema/schema";

const UpdateStudent = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [batchId, setBatchId] = useState(
    location.state.batchName.batchId || null
  );
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(
    location.state.batchName.courseName.courseId
  );

  const updateStudent = async (values) => {
    try {
      setLoading(true);
      await axiosClient.put(
        `/student/${params.id}/batch/${batchId}
      `,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Student Updated Successfully");
      navigate("/students");
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to update student");
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
    getBatches();
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
      <Formik
        enableReinitialize={true}
        initialValues={{
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
          professonalCourse: location.state.batchName.courseName.courseName,
          leadSource: location.state.leadSource,
        }}
        validationSchema={enquirySchema}
        onSubmit={updateStudent}
      >
        {({ errors, touched, handleChange, values }) => {
          console.log(values);
          return (
            <Form>
              <div className="space-y-12 shadow-lg px-4 rounded-lg border py-4">
                <div className="flex items-center justify-center">
                  <h2 className="pb-4 font-semibold leading-7 text-gray-900 md:text-[30px]">
                    Edit Student Details
                  </h2>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Student name
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="mt-2">
                        <input
                          type="text"
                          name="studentName"
                          id="first-name"
                          value={values.studentName}
                          onChange={handleChange}
                          autoComplete="given-name"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.studentName && touched.studentName ? (
                          <p className="text-sm text-red-500">
                            {errors.studentName}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="sm:col-span-3 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Father&apos;s name
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="mt-2">
                        <input
                          type="text"
                          name="fatherName"
                          id="last-name"
                          onChange={handleChange}
                          value={values.fatherName}
                          autoComplete="family-name"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.fatherName && touched.fatherName ? (
                          <p className="text-sm text-red-500">
                            {errors.fatherName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:col-span-3 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Mother name
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="motherName"
                          value={values.motherName}
                          onChange={handleChange}
                          id="last-name"
                          autoComplete="family-name"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.motherName && touched.motherName ? (
                          <p className="text-sm text-red-500">
                            {errors.motherName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2 sm:col-start-1 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Contact No.
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="contactNo"
                          value={values.contactNo}
                          onChange={handleChange}
                          id="city"
                          autoComplete="address-level2"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.contactNo && touched.contactNo ? (
                          <p className="text-sm text-red-500">
                            {errors.contactNo}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1  md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Email
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="emailId"
                          value={values.emailId}
                          placeholder="Email must be unique**"
                          onChange={handleChange}
                          id="city"
                          autoComplete="address-level2"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.emailId && touched.emailId ? (
                          <p className="text-sm text-red-500">
                            {errors.emailId}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:col-start-1 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Date of Birth
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="dateOfBirth"
                          onChange={handleChange}
                          value={values.dateOfBirth}
                          id="city"
                          autoComplete="address-level2"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.dateOfBirth && touched.dateOfBirth ? (
                          <p className="text-sm text-red-500">
                            {errors.dateOfBirth}
                          </p>
                        ) : null}
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
                          id="street-address"
                          onChange={handleChange}
                          value={values.Address}
                          autoComplete="street-address"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          onChange={handleChange}
                          value={values.gender}
                          autoComplete="country-name"
                          className=" px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                        >
                          <option>Select</option>
                          <option value={"male"}>Male</option>
                          <option value={"female"}>Female</option>
                        </select>
                        {errors.gender && touched.gender ? (
                          <p className="text-sm text-red-500">
                            {errors.gender}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium pl-2 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="flex items-center justify-between md:gap-10">
                        <div className="py-2">
                          <label
                            htmlFor="country"
                            className="block text-xs font-medium pl-2 text-gray-900"
                          >
                            General
                          </label>
                          <div className="mt-2">
                            <input
                              id="country"
                              onChange={handleChange}
                              type="radio"
                              name="category"
                              value="general"
                              checked={
                                values.category === "general" ? true : false
                              }
                              autoComplete="country-name"
                              className=" px-2 block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="py-2">
                          <label
                            htmlFor="country"
                            className="block text-xs font-medium pl-2 text-gray-900"
                          >
                            OBC
                          </label>
                          <div className="mt-2">
                            <input
                              id="country"
                              type="radio"
                              onChange={handleChange}
                              checked={values.category === "obc" ? true : false}
                              name="category"
                              value="obc"
                              autoComplete="country-name"
                              className=" px-2 block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="py-2">
                          <label
                            htmlFor="country"
                            className="block text-xs font-medium pl-2 text-gray-900"
                          >
                            SC/ST
                          </label>
                          <div className="mt-2">
                            <input
                              id="country"
                              onChange={handleChange}
                              checked={
                                values.category === "SC/ST" ? true : false
                              }
                              type="radio"
                              name="category"
                              value="SC/ST"
                              autoComplete="country-name"
                              className=" px-2 block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="py-2">
                          <label
                            htmlFor="country"
                            className="block text-xs font-medium pl-2 text-gray-900"
                          >
                            Others
                          </label>
                          <div className="mt-2">
                            <input
                              id="country"
                              onChange={handleChange}
                              type="radio"
                              name="category"
                              checked={
                                values.category === "others" ? true : false
                              }
                              value="others"
                              autoComplete="country-name"
                              className=" px-2 block w-full py-1.5 h-6 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      {errors.category && touched.category ? (
                        <p className="text-sm text-red-500 whitespace-nowrap">
                          {errors.category}
                        </p>
                      ) : null}
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
                          name="professonalCourse"
                          onChange={(e) => {
                            setCourseId(e.target.value);
                          }}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          {location.state.batchName.courseName ? (
                            <option
                              value={
                                location.state.batchName.courseName.courseId
                              }
                            >
                              {location.state.batchName.courseName.courseName}
                            </option>
                          ) : (
                            <option>Select</option>
                          )}

                          {courses
                            .filter((item) => {
                              return (
                                item.courseId !==
                                location.state.batchName.courseName.courseId
                              );
                            })
                            .map((item) => (
                              <option key={item.courseId} value={item.courseId}>
                                {item.courseName}
                              </option>
                            ))}
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
                          onChange={(e) => setBatchId(e.target.value)}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          {location.state.batchName.batchName ? (
                            <option
                              value={location.state.batchName.batchName.batchId}
                            >
                              {location.state.batchName.batchName}
                            </option>
                          ) : (
                            <option>Select</option>
                          )}
                          {batches
                            .filter((item) => {
                              return (
                                item.batchId !==
                                location.state.batchName.batchId
                              );
                            })
                            .map((item) => (
                              <option key={item.batchId} value={item.batchId}>
                                {item.batchName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Highest Qualification
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="professonalCourse"
                          onChange={handleChange}
                          value={values.professonalCourse}
                          id="last-name"
                          autoComplete="family-name"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.professonalCourse &&
                        touched.professonalCourse ? (
                          <p className="text-sm text-red-500">
                            {errors.professonalCourse}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 md:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        School name
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          onChange={handleChange}
                          value={values.schoolName}
                          name="schoolName"
                          id="last-name"
                          autoComplete="family-name"
                          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.schoolName && touched.schoolName ? (
                          <p className="text-sm text-red-500">
                            {errors.schoolName}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="sm:col-span-4 md:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Board name
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="boardName"
                          value={values.boardName}
                          type="text"
                          onChange={handleChange}
                          autoComplete="email"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.boardName && touched.boardName ? (
                          <p className="text-sm text-red-500">
                            {errors.boardName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:col-start-1  md:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Year
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          onChange={handleChange}
                          value={values.year}
                          name="year"
                          id="city"
                          autoComplete="address-level2"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                        />
                        {errors.year && touched.year ? (
                          <p className="text-sm text-red-500">{errors.year}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:col-span-3 md:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Percentage
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          onChange={handleChange}
                          value={values.percentage}
                          name="percentage"
                          id="last-name"
                          autoComplete="family-name"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.percentage && touched.percentage ? (
                          <p className="text-sm text-red-500">
                            {errors.percentage}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        University name
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="universityName"
                          onChange={handleChange}
                          value={values.universityName}
                          id="region"
                          autoComplete="address-level1"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.universityName && touched.universityName ? (
                          <p className="text-sm text-red-500">
                            {errors.universityName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:col-span-2  md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Lead Source
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="leadSource"
                          onChange={handleChange}
                          autoComplete="country-name"
                          className=" px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                        >
                          {values.leadSource ? (
                            <option value={values.leadSource}>
                              {values.leadSource}
                            </option>
                          ) : (
                            <option>Select</option>
                          )}
                          <option value={"Google"}>Google</option>
                          <option value={"Facebook"}>Facebook</option>
                          <option value={"Others"}>Others</option>
                        </select>
                        {errors.leadSource && touched.leadSource ? (
                          <p className="text-sm text-red-500">
                            {errors.leadSource}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:col-span-3 md:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Country
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          onChange={handleChange}
                          value={values.country}
                          name="country"
                          id="last-name"
                          autoComplete="family-name"
                          className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.country && touched.country ? (
                          <p className="text-sm text-red-500">
                            {errors.country}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? (
                    <Oval
                      color="white"
                      secondaryColor="black"
                      width={25}
                      height={25}
                    />
                  ) : (
                    "Update Student"
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default UpdateStudent;
