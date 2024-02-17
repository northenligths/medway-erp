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
const PaymentByStudent = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const params = useParams();
  const token = localStorage.getItem("token");

  const getPayments = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`fee/student/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  const sortByPayment = async (e) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/fee?fromDate=${startDate}&toDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPayments(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  //   const deleteStudent = async (id) => {
  //     try {
  //       await axiosClient.delete(`batch/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       toast("Deleted Successfully");
  //       getStudents();
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto flex items-center justify-between">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Fees
            </h1>

            <div className="flex gap-4 items-center">
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
              <div>
                <button
                  className="border-2 px-4 rounded-lg"
                  onClick={sortByPayment}
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
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Tution Fee
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Transaction Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Mode of Payment
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Number of Installment
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Payment Date
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
                    payments?.map((item) => (
                      <tr key={item.batchId}>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{item.amount}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.tutionFees}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.transactionId}
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {item.modeOfPayment}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.numberOfInstallment}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.paymentDate}
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

export default PaymentByStudent;
