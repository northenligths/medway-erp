import * as Yup from "yup";
const loginSchema = Yup.object({});
export default loginSchema;

export const enquirySchema = Yup.object({
  studentName: Yup.string().trim().required("Student Name is required"),
  fatherName: Yup.string().trim().required("Father Name is required"),
  motherName: Yup.string().trim().required("Mother Name is required"),
  contactNo: Yup.number()
    .typeError("Contact Number must be a number")
    .required("Contact Number is required")
    .test(
      "len",
      "Contact Number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),

  emailId: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  category: Yup.string().trim().required("Category is required"),
  dateOfBirth: Yup.date("Invalid date format").required(
    "Date of Birth is required"
  ),
  gender: Yup.string().trim().required("Gender is required"), // Handle non-binary options
  schoolName: Yup.string().trim().required("Required"),
  percentage: Yup.number()
    .transform((value) => (isNaN(value) ? "" : value)) // Handle empty or non-numeric values
    .required("Percentage is required")
    .min(0, "Percentage cannot be negative")
    .max(100, "Percentage cannot be greater than 100"),
  year: Yup.string().trim().required("Year is required"),
  leadSource: Yup.string().trim().required("Lead Source is required"),
  professonalCourse: Yup.string().required("Required"),
  boardName: Yup.string().required("Board Name is required"),
  universityName: Yup.string().required("University Name is required"),
  country: Yup.string().required("Country is required"),
});

export const feesSchema = Yup.object({
  amount: Yup.number().typeError("Amount must be number").required("Required"),
  modeOfPayment: Yup.string().trim().required("Required"),
  tutionFees: Yup.number()
    .typeError("Tution Fees must be number")
    .required("Required"),
  paymentDate: Yup.string().trim().required("Required"),
});
