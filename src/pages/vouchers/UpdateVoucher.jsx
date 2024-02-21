import { useState } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateVoucher = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [voucher, setVoucher] = useState({
    voucherType: location.state.voucherType,
    voucherReason: location.state.voucherReason,
    payeeName: location.state.payeeName,
    description: location.state.description,
    voucherDate: location.state.voucherDate,
    amount: location.state.amount,
    voucherName: location.state.voucherName,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoucher((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateVoucher = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.put("/voucher", voucher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Voucher updated Successfully");
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to update voucher");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <form onSubmit={updateVoucher}>
        <div className="space-y-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Voucher
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Voucher Type
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="voucherType"
                    value={voucher.voucherType}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Voucher Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="voucherDate"
                    value={voucher.voucherDate}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Voucher Reason
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="voucherReason"
                    value={voucher.voucherReason}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Voucher Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="voucherName"
                    value={voucher.voucherName}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Payee Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="payeeName"
                    value={voucher.payeeName}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="amount"
                    value={voucher.amount}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    value={voucher.description}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
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
              "Update Voucher"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default UpdateVoucher;
