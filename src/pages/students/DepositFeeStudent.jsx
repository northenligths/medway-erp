import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { axiosClient } from "../../apiClient";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { feesSchema } from "../../validationSchema/schema";
import { FaArrowLeft } from "react-icons/fa";

const DepositFeeStudent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [feesLoading, setFeesLoading] = useState(false);
  const location = useLocation();
  const studentData = [location.state];
  const token = localStorage.getItem("token");
  const params = useParams();
  const [fees, setFees] = useState({});
  const [students, setStudents] = useState([]);

  const [isVisible, setIsVisible] = useState(true);

  const reloadComponent = () => {
    setIsVisible(false);

    // Reload the component after 3 seconds
    setTimeout(() => {
      setIsVisible(true);
    }, 3000);
  };

  const depositFee = async (values) => {
    try {
      setFeesLoading(true);
      await axiosClient.post(`/fee/student/${params.id} `, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Fees Deposited Successfully");
      reloadComponent();
    } catch (err) {
      console.log("err", err);
      toast.error("Unable to deposit fee");
    }
    setFeesLoading(false);
  };

  return (
    <Layout>
      {isVisible ? (
        <div className="flow-root">
          <div className="-mx-4 -my-6 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <h2 className="font-semibold leading-7 text-gray-900 text-xl text-center ">
              Fee Details
            </h2>
            <div
              className="flex items-center pl-6 gap-1"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="text-red-600" />

              <button className="text-red-600 text-lg font-bold py-2">
                Back
              </button>
            </div>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="border-2 border-gray-500">
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
                      Student Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
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
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Due
                    </th>

                    {/* <th
             scope="col"
             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
           >
             Given Installments
           </th> */}
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
                    {/* <th
             scope="col"
             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
           >
             Total Installments
           </th> */}
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
                    studentData?.map((item, index) => (
                      <tr
                        key={item.batchId}
                        className="border-2 border-gray-500"
                      >
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{index + 1}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {item.studentName}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchName}
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.batchName.batchFees}
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.discountAmount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item?.feesDetails.dueAmount === true
                            ? "Pending"
                            : "Clear"}
                        </td>

                        {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                 {item?.feesDetails.givenInsallments}
               </td> */}
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
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Oval color="white" secondaryColor="black" width={70} height={70} />
        </div>
      )}

      <Formik
        initialValues={{
          amount: "",
          modeOfPayment: "",
          tutionFees: "",
          transactionId: "",
          numberOfInstallment: "",
          paymentDate: "",
        }}
        validationSchema={feesSchema}
        onSubmit={depositFee}
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <div className="mt-4">
              <div className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Deposit Fee
                </h2>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 md:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 relative"
                    >
                      Amount
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2">
                      <input
                        type="text"
                        name="amount"
                        onChange={handleChange}
                        id="first-name"
                        autoComplete="given-name"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.amount && touched.amount ? (
                        <p className="text-sm text-red-500">{errors.amount}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="sm:col-span-3 md:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 relative"
                    >
                      Mode Of Payment
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2">
                      <select
                        id="country"
                        name="modeOfPayment"
                        onChange={handleChange}
                        autoComplete="country-name"
                        className=" px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                      >
                        <option>Select</option>
                        <option value={"cash"}>Cash</option>
                        <option value={"online"}>Online</option>
                      </select>
                      {errors.modeOfPayment && touched.modeOfPayment ? (
                        <p className="text-sm text-red-500">
                          {errors.modeOfPayment}
                        </p>
                      ) : null}
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
                        onChange={handleChange}
                        id="last-name"
                        autoComplete="family-name"
                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid md:grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 md:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 relative"
                    >
                      Payment Date
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2">
                      <input
                        type="date"
                        name="paymentDate"
                        onChange={handleChange}
                        id="last-name"
                        autoComplete="family-name"
                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.paymentDate && touched.paymentDate ? (
                        <p className="text-sm text-red-500">
                          {errors.paymentDate}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="sm:col-span-3 md:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 relative"
                    >
                      Tution Fees
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2">
                      <input
                        type="text"
                        name="tutionFees"
                        onChange={handleChange}
                        id="last-name"
                        autoComplete="family-name"
                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.tutionFees && touched.tutionFees ? (
                        <p className="text-sm text-red-500">
                          {errors.tutionFees}
                        </p>
                      ) : null}
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
                        onChange={handleChange}
                        id="last-name"
                        autoComplete="family-name"
                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                {feesLoading ? (
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
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default DepositFeeStudent;
