import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/ErrorPage404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginPractitioner from "./pages/LoginPractitioner";
import Register from "./pages/Register";
import Request from "./pages/Request";
import Symptoms from "./pages/SymptomsPage";
import Forget from "./pages/ForgotPassPage";
import FA from "./pages/ForgotPassAlert";
import Reset from "./pages/ResetForgotPass";
import HospitalSelectionPage from "./pages/HospitalSelectionPage";
import { HomeHospitalProvider } from "./components/HomeHospitalContext";
import UserHomepage from "./pages/UserHomepage";
import RequireAuth from "./components/RequireAuth";
import Practitioner from "./pages/Practioner";
import Admin from "./pages/Admin.js";
import AdminLogin from "./pages/AdminLogin.js";
function App() {
  useEffect(() => {
    document.title = "HomeHospital";
  }, []);

  return (
    <HomeHospitalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/request"
            element={
              <RequireAuth>
                <Request />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Error />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/fa" element={<FA />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/hospitals"
            element={
              <RequireAuth>
                <HospitalSelectionPage />
              </RequireAuth>
            }
          />
          <Route
            path="/symptoms"
            element={
              <RequireAuth>
                <Symptoms />
              </RequireAuth>
            }
          />
          <Route path="/home" element={<UserHomepage />} />
          <Route path="/practitioner" element={<Practitioner />} />
          <Route
            path="/register"
            element={<Register className="full-height" />}
          />
          <Route path="/login-practitioner" element={<LoginPractitioner />} />
        </Routes>
      </Router>
    </HomeHospitalProvider>
  );
}

export default App;
