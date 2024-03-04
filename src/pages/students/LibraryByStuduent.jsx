import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ImBin } from "react-icons/im";
import { FaEye } from "react-icons/fa";

const LibraryByStudent = () => {
  const navigate = useNavigate();
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const token = localStorage.getItem("token");

  const getLibrary = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/library/student/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLibrary([res.data.data]);
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };

  const deleteLibrary = async (id) => {
    try {
      await axiosClient.delete(`library/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted Successfully");
      getLibrary();
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to delete please try again");
    }
  };

  useEffect(() => {
    getLibrary();
  }, []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Library Details
            </h1>
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
                      Library Fees
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
                      Remark
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
                    library.map((item) => (
                      <tr
                        key={item.courseId}
                        className="border-2 border-gray-500"
                      >
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {item.libraryFees}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="mt-1 text-gray-500">
                            {item.startDate}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.anyRemark}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="flex items-center gap-8">
                            <FaEye
                              className="cursor-pointer"
                              color="black"
                              fontSize={"20px"}
                              onClick={() =>
                                navigate(`/library/${item.libraryId}`)
                              }
                            />
                            <ImBin
                              className="cursor-pointer"
                              color="red"
                              fontSize={"20px"}
                              onClick={() => deleteLibrary(item.libraryId)}
                            />
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

export default LibraryByStudent;
