import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import backgroundLogin from "../images/bg.png";
import LoginForm from "../components/LoginForm";
import { HomeHospitalContext } from "../components/HomeHospitalContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID] = patient_id;

  console.log(patientID);

  useEffect(() => {
    if (patientID != null || patientID != undefined) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
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
