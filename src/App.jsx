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
    </Routes>
  );
}

export default App;
