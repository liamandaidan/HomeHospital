import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Forget from "./components/ForgotPass";

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
        <Route
          path="/register"
          element={<Register className="full-height" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
