import React from "react";
import { Col, Row } from "react-bootstrap";
import backgroundLogin from "../images/bg.png";
import LoginForm from "../components/LoginForm";
import axios from "axios";

axios.defaults.withCredentials = true;

function Login() {
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
