import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DepositFeeStudent = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const params = useParams();

  const [fees, setFees] = useState({
    amount: "",
    modeOfPayment: "",
    tutionFees: "",
    transactionId: "",
    numberOfInstallment: "",
    paymentDate: "",
  });

  const depositFee = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.post(`/fee/student/${params.id} `, fees, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Fees Deposited Successfully");
      //   navigate("/all-batches");
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to deposit fee");
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFees((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <form onSubmit={depositFee}>
        <div className="space-y-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Deposit Fee
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="amount"
                    value={fees.amount}
                    onChange={handleChange}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mode of Payment
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="modeOfPayment"
                    value={fees.modeOfPayment}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Installments
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="numberOfInstallment"
                    value={fees.numberOfInstallment}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Payment Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="paymentDate"
                    value={fees.paymentDate}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tution Fees
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tutionFees"
                    value={fees.tutionFees}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 md:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Transaction Id
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="transactionId"
                    value={fees.transactionId}
                    onChange={handleChange}
                    id="last-name"
                    autoComplete="family-name"
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
              "Deposit Fee"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default DepositFeeStudent;
