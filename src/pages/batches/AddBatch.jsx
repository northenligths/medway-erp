import { useState } from "react";
import Layout from "../../components/layout";
import { Oval } from "react-loader-spinner";
import { axiosClient } from "../../apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const AddBatch = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const params = useParams();
  const [batches, setBatches] = useState({
    batchName: "",
    startDate: "",
    batchEndDate: "",
    batchFees: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBatches((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const addBatch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.post(`/batch/courseId/${params.id}`, batches, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Batch Created Successfully");
      navigate("/all-batches");
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to create new batch");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <form onSubmit={addBatch}>
        <div className="space-y-2">
          <div className="flex items-center gap-1" onClick={() => navigate(-1)}>
            <FaArrowLeft className="text-red-600" />

            <button className="text-red-600 text-lg font-bold py-2">
              Back
            </button>
          </div>

          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Batch
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Batch Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="batchName"
                    value={batches.batchName}
                    required
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="startDate"
                    value={batches.startDate}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1 md:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="batchEndDate"
                    value={batches.batchEndDate}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 md:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Batch Fees
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="batchFees"
                    type="text"
                    value={batches.batchFees}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              "Add Batch"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddBatch;
