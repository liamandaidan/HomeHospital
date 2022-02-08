import React from "react";
import { Col, Row } from "react-bootstrap";
import backgroundLogin from "../images/sunset.jpg";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <React.Fragment>
      <Row
        className="align-items-center"
        style={{
          backgroundImage: `url(${backgroundLogin})`,
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Col className="align-self-center">
          <LoginForm />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Login;
