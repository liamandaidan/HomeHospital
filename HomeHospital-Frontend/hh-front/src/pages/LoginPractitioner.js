import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import backgroundLogin from "../images/bg.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeHospitalContext } from "../components/HomeHospitalContext";
import LoginFormPractitioner from "../components/LoginFormPractitioner";

axios.defaults.withCredentials = true;
/**
 * @name Practitioner Login page 
 * @summary create a login form for the practitioner
 * @returns login page for the practitioner 
 */
function LoginPractitioner() {


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
          <LoginFormPractitioner />
        </Col>
      </Row>
    </div>
  );
}

export default LoginPractitioner;
