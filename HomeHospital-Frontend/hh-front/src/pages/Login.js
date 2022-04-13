import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import backgroundLogin from "../images/bg.png";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { HomeHospitalContext } from "../components/HomeHospitalContext";

axios.defaults.withCredentials = true;

function Login() {
  // useContext to get new Request value
  const { regSuccess } = useContext(HomeHospitalContext);
  const [regSuccessValue, setRegSuccessValue] = regSuccess;

  if (regSuccessValue) {
    notify();
    setRegSuccessValue(false);
  }

  // Registration Toast
  function notify() {
    toast.success("Registration Successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Row
        className="align-items-center"
        style={{
          backgroundImage: `url(${backgroundLogin})`,
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Col className="align-self-center">
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
