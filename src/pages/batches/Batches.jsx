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

const Batches = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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

  const deleteBatch = async (id) => {
    try {
      await axiosClient.delete(`batch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted Successfully");
      getBatches();
    } catch (err) {
      console.log("err", err);
    }
  };

  const revokeBatch = async (id) => {
    try {
      await axiosClient.delete(`batch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast("Batch Revoked Successfully");
      getBatches();
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Batches
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
                      Batch Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch Name
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
                      Batch Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Batch End Date
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
                    batches.map((item) => (
                      <tr key={item.batchId}>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{item.batchId}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchFees}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.startDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchEndDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchStatus}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="flex items-center gap-8">
                            {/* <FaEye
                            className="cursor-pointer"
                            color="black"
                            fontSize={"20px"}
                            onClick={() => navigate(`/course/${item.courseId}`)}
                          /> */}
                            <ImBin
                              className="cursor-pointer"
                              color="red"
                              fontSize={"20px"}
                              onClick={() => deleteBatch(item.batchId)}
                            />
                            <FaRegEdit
                              className="cursor-pointer"
                              color="black"
                              fontSize={"20px"}
                              onClick={() =>
                                navigate(`/edit-batch/${item.batchId}`, {
                                  state: item,
                                })
                              }
                            />
                            <button
                              className="border-2 rounded-md px-4 py-2"
                              onClick={() => revokeBatch(item.batchId)}
                            >
                              Revoke batch
                            </button>
                            <button
                              className="border-2 rounded-md px-4 py-2"
                              onClick={() =>
                                navigate(`/student-by-batch/${item.batchId}`)
                              }
                            >
                              View Students
                            </button>
                            <button
                              className="border-2 rounded-md px-4 py-2"
                              onClick={() =>
                                navigate(`/enquiry-by-batch/${item.batchId}`)
                              }
                            >
                              Enquiries
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

export default Batches;
