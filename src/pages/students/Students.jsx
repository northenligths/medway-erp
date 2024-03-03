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
const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const token = localStorage.getItem("token");

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

  const deleteStudent = async (id) => {
    try {
      await axiosClient.delete(`student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted Successfully");
      getStudents();
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to delete please try again");
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Students
            </h1>
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
                      Lead Source
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Library Status
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch Fees
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Due
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Percentage
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Given Installments
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Library Fees
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Payable Fees
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tution Fees
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Installments
                    </th> */}
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
                          {item.leadSource}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.libraryStatus}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.startDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchEndDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchFees}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchStatus}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.discountAmount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.dueAmount === true
                            ? "Pending"
                            : "Clear"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.percentage}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.givenInsallments}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.libraryFees}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.payableFees}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.remTutionFees}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.totalInstallments}
                        </td> */}
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <>
                            <div className="mt-10 grid md:grid-cols-12 gap-x-3 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3 md:col-span-4">
                                <ImBin
                                  className="cursor-pointer"
                                  color="red"
                                  fontSize={"20px"}
                                  onClick={() => deleteStudent(item.studentId)}
                                />
                              </div>
                              <div className="sm:col-span-3 md:col-span-4">
                                <FaRegEdit
                                  className="cursor-pointer"
                                  color="black"
                                  fontSize={"20px"}
                                  onClick={() =>
                                    navigate(
                                      `/update-student/${item.studentId}`,
                                      {
                                        state: item,
                                      }
                                    )
                                  }
                                />
                              </div>
                              <div className="sm:col-span-3 md:col-span-4">
                                <FaEye
                                  className="cursor-pointer"
                                  color="black"
                                  fontSize={"20px"}
                                  onClick={() =>
                                    navigate(`/student/${item.studentId}`, {
                                      state: item,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            {/* <div className="mt-10 grid md:grid-cols-12 gap-x-8 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3 md:col-span-4">
                                <button
                                  className="border-2 rounded-md px-4 py-2"
                                  onClick={() =>
                                    navigate(`/deposit-fee/${item.studentId}`)
                                  }
                                >
                                  Deposit Fees
                                </button>
                              </div>
                              <div className="sm:col-span-3 md:col-span-4">
                                <button
                                  className="border-2 rounded-md px-4 py-2"
                                  onClick={() =>
                                    navigate(
                                      `/payment-by-student/${item.studentId}`
                                    )
                                  }
                                >
                                  View Payments
                                </button>
                              </div>
                              <div className="sm:col-span-3 md:col-span-4 ml-4">
                                <button
                                  className="border-2 rounded-md px-4 py-2"
                                  onClick={() =>
                                    navigate(
                                      `/add-discount-by-student/${item.studentId}`
                                    )
                                  }
                                >
                                  Add Discount
                                </button>
                              </div>
                            </div> */}
                            {/* <div className=" mt-2 grid md:grid-cols-12 gap-x-2 gap-y-6 sm:grid-cols-6">
                              <div className="sm:col-span-3 md:col-span-4">
                                <button
                                  className="border-2 rounded-md px-4 py-2"
                                  onClick={() =>
                                    navigate(`/add-library/${item.studentId}`)
                                  }
                                >
                                  Add Library
                                </button>
                              </div>
                              <div className="sm:col-span-3 md:col-span-4 ml-3">
                                <button
                                  className="border-2 rounded-md px-4 py-2"
                                  onClick={() =>
                                    navigate(
                                      `/library-by-student/${item.studentId}`
                                    )
                                  }
                                >
                                  View Library
                                </button>
                              </div>
                            </div> */}
                          </>
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

export default Students;
