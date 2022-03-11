import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/ErrorPage404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Symptoms from "./pages/SymptomsPage";
import Forget from "./pages/ForgotPassPage";
import FA from "./pages/ForgotPassAlert";
import Reset from "./pages/ResetForgotPass";
import HospitalSelectionPage from "./pages/HospitalSelectionPage";
import HomeHospitalContext from "./components/HomeHospitalContext";
import UserHomePage from "./pages/UserHomepage";

function App() {
  useEffect(() => {
    document.title = "HomeHospital";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Error />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/fa" element={<FA />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/hospitals" element={<HospitalSelectionPage />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/userhome" element={<UserHomePage />} />

        <Route
          path="/register"
          element={<Register className="full-height" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
