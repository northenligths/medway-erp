import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { axiosClient } from "../../apiClient";
import { FaEye } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { FaArrowLeft } from "react-icons/fa";

const Account = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const getAccounts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/account/date?accountDate=${params.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccounts([res.data.data]);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  //   const deleteVoucher = async (id) => {
  //     try {
  //       await axiosClient.delete(`/voucher/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       toast.success("Deleted Successfully");
  //       getVouchers();
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   };

  //   const sortVoucherByDate = async (e) => {
  //     setLoading(true);
  //     try {
  //       const res = await axiosClient.get(
  //         `/voucher/dates?fromDate=${startDate}&toDate=${endDate}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setVouchers(res.data.data.content);
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //     setLoading(false);
  //   };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1" onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-red-600" />

          <button className="text-red-600 text-lg font-bold py-2">Back</button>
        </div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto flex items-center justify-between">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Account
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
                    onClick={sortVoucherByDate}
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
                <thead className="border-2 border-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Online Credit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Offline Credit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Online Debit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Offline Debit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Credit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Debit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Balance
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="border-2 border-gray-500">
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
                    accounts.map((item) => (
                      <tr
                        key={item.batchId}
                        className="border-2 border-gray-500"
                      >
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {item.onlineCredit}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.offlineCredit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.totalCredit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.onlineDebit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.offlineDebit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.totalDebit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.totalBalance}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.date}
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

export default Account;
