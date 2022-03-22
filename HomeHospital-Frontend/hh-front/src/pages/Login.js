import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import backgroundLogin from "../images/bg.png";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       if (response.status === "Error") {
  //         navigate("/login");
  //       } else {
  //         navigate("/home");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
