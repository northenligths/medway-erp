import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
}

export default App;
