import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { axiosClient } from "../../apiClient";
import { FaEye } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const Staffs = () => {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const getStaffs = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaffs(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  console.log(staffs);

  const deleteStaff = async (id) => {
    try {
      await axiosClient.delete(`/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted Successfully");
      getStaffs();
    } catch (err) {
      console.log("err", err);
    }
  };

  const inactiveStaff = async (id) => {
    try {
      await axiosClient.put(`/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Staff status inactive");
      getStaffs();
    } catch (err) {
      console.log("err", err);
    }
  };

  //   const sortAccountsByDate = async (e) => {
  //     setLoading(true);
  //     try {
  //       const res = await axiosClient.get(
  //         `/account/dates?fromDate=${startDate}&toDate=${endDate}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setAccounts(res.data.data.content);
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //     setLoading(false);
  //   };

  useEffect(() => {
    getStaffs();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto flex items-center justify-between">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Staffs
            </h1>
            {/* <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-xl font-semibold">Sort By Date</h1>
                <div className="flex items-center gap-4">
                  <div className="flex-col flex items-center">
                    <label className="py-2">Start Date</label>
                    <input
                      type="date"
                      className="border-2 px-2 py-1 rounded-lg"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-col flex items-center">
                    <label className="py-2">End Date</label>
                    <input
                      type="date"
                      className="border-2 px-2 py-1 rounded-lg"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="border-2 px-4 rounded-lg py-2"
                    onClick={sortAccountsByDate}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div> */}
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Father or Husband
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Designation
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
                      Aadhar No.
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Address
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date of Joining
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Salary
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
                    staffs.map((item) => (
                      <tr key={item.batchId}>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{item.name}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.fatherOrHusband}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.mobileNumber}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.designation}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.dateOfBirth}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.aadharNo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.subject}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.address}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.dateOfJoining}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.salary}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.staffStatus}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="flex items-center gap-8">
                            <ImBin
                              className="cursor-pointer"
                              color="red"
                              fontSize={"20px"}
                              onClick={() => deleteStaff(item.staffId)}
                            />
                            <FaEye
                              className="cursor-pointer"
                              color="black"
                              fontSize={"20px"}
                              onClick={() =>
                                navigate(`/voucher/${item.voucherId}`)
                              }
                            />
                            <button
                              className="border-2 rounded-md px-4 py-2"
                              onClick={() => inactiveStaff(item.staffId)}
                            >
                              Inactive Staff
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

export default Staffs;
