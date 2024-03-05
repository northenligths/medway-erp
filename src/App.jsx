import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login, Dashboard } from "./pages";
import NewAdmission from "./pages/admission/new";
import ViewAdmission from "./pages/admission/view";
import Enquiry from "./pages/admission/Enquiry";
import Batches from "./pages/batches/Batches";
import AddBatch from "./pages/batches/AddBatch";
import Courses from "./pages/courses/Courses";
import AddCourse from "./pages/courses/AddCourse";
import Course from "./pages/courses/Course";
import EditCourse from "./pages/courses/EditCourse";
import EditBatch from "./pages/batches/EditBatch";
import BatchesByCourse from "./pages/batches/BatchesByCourse";
import StudentByBatch from "./pages/batches/StudentByBatch";
import Students from "./pages/students/Students";
import AddStudent from "./pages/students/AddStudent";
import EnquiryByBatch from "./pages/batches/EnquiryByBatch";
import UpdateStudent from "./pages/students/UpdateStudent";
import DepositFeeStudent from "./pages/students/DepositFeeStudent";
import PaymentByStudent from "./pages/students/PaymentByStudent";
import AddDiscountByStudent from "./pages/students/AddDiscountByStudent";
import Discounts from "./pages/discounts/Discounts";
import StudentsByDiscount from "./pages/discounts/StudentsByDiscount";
import UpdateDiscount from "./pages/discounts/UpdateDiscount";
import Library from "./pages/library/Library";
import AddLibrary from "./pages/students/AddLibrary";
import LibraryByStudent from "./pages/students/LibraryByStuduent";
import AddVoucher from "./pages/vouchers/AddVoucher";
import Vouchers from "./pages/vouchers/Vouchers";
import UpdateVoucher from "./pages/vouchers/UpdateVoucher";
import StudentByPayment from "./pages/students/StudentByPayment";
import Student from "./pages/students/Studuent";
import Discount from "./pages/discounts/Discount";
import Voucher from "./pages/vouchers/Voucher";
import Accounts from "./pages/account/Accounts";
import Account from "./pages/account/Account";
import Staffs from "./pages/staff/Staffs";
import AddStaff from "./pages/staff/AddStaff";
import StudentReports from "./pages/reports/StudentReports";
import EnquiryReports from "./pages/reports/EnquiryReports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-admission" element={<NewAdmission />} />
      <Route path="/view-admission" element={<ViewAdmission />} />
      <Route path="/view-enquiry/:id" element={<Enquiry />} />
      <Route path="/all-batches" element={<Batches />} />
      <Route path="/add-batch/:id" element={<AddBatch />} />
      <Route path="/all-courses" element={<Courses />} />
      <Route path="/course/:id" element={<Course />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/edit-course/:id" element={<EditCourse />} />
      <Route path="/edit-batch/:id" element={<EditBatch />} />
      <Route path="/batch-by-course/:id" element={<BatchesByCourse />} />
      <Route path="/student-by-batch/:id" element={<StudentByBatch />} />
      <Route path="/students" element={<Students />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/enquiry-by-batch/:id" element={<EnquiryByBatch />} />
      <Route path="/update-student/:id" element={<UpdateStudent />} />
      <Route path="/deposit-fee/:id" element={<DepositFeeStudent />} />
      <Route path="/payment-by-student/:id" element={<PaymentByStudent />} />
      <Route
        path="/add-discount-by-student/:id"
        element={<AddDiscountByStudent />}
      />
      <Route
        path="/students-by-discount/:id"
        element={<StudentsByDiscount />}
      />
      <Route path="/discounts" element={<Discounts />} />
      <Route path="/update-discount/:id" element={<UpdateDiscount />} />
      <Route path="/libraries" element={<Library />} />
      <Route path="/add-library/:id" element={<AddLibrary />} />
      <Route path="/library-by-student/:id" element={<LibraryByStudent />} />
      <Route path="/add-vouchers" element={<AddVoucher />} />
      <Route path="/vouchers" element={<Vouchers />} />
      <Route path="/update-voucher" element={<UpdateVoucher />} />
      <Route path="/student-by-payment/:id" element={<StudentByPayment />} />
      <Route path="/student/:id" element={<Student />} />
      <Route path="/discount/:id" element={<Discount />} />
      <Route path="/library/:id" element={<Library />} />
      <Route path="/voucher/:id" element={<Voucher />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/account-by-date/:date" element={<Account />} />
      <Route path="/staffs" element={<Staffs />} />
      <Route path="/add-staff" element={<AddStaff />} />
      <Route path="/student-report" element={<StudentReports />} />
      <Route path="/enquiry-report" element={<EnquiryReports />} />
    </Routes>
  );
}

export default App;
