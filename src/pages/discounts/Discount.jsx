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

const Discount = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getDiscounts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/discount/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDiscounts([res.data.data]);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDiscounts();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Discount
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
                      Discount Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Discount Remark
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Discount Date
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
                    discounts.map((item) => (
                      <tr key={item.batchId}>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {item.discountAmount}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.discountRemark}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.discountDate}
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

export default Discount;
