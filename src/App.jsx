import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login, Dashboard } from "./pages";
import Layout from "./components/layout";
import NewAdmission from "./pages/admission/new";
import ViewAdmission from "./pages/admission/view";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-admission" element={<NewAdmission />} />
      <Route path="/view-admission" element={<ViewAdmission />} />
    </Routes>
  );
}

export default App;
