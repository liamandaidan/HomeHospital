import React from "react";
import { Row, Col } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";
import backgroundLogin from "../images/sunset.jpg";
import leftImage from "../images/waitingRoom3.png";
import classes from "./Register.module.css";

function Register() {
  return (
    <Row
      style={{
        backgroundImage: `url(${backgroundLogin})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Row>
        <div className={classes.boxWidth}>
          <Row>
            {/* <a href='https://www.freepik.com/vectors/woman'>Woman vector created by pch.vector - www.freepik.com</a> */}
            <Col className={classes.leftSide}>
              <div
                style={{
                  position: "relative",
                  bottom: "0",
                  left: "0",
                  backgroundImage: `url(${leftImage})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%",
                  opacity: "0.90",
                  padding: "0",
                  borderRadius: "0px 0px 0px 50px",
                }}
              ></div>
              <div className={classes.title}>
                <h1>Home Hospital</h1>
                <h3>Login Form</h3>
              </div>
            </Col>
            <Col className={classes.rightSide}>
              <RegistrationForm />
            </Col>
          </Row>
        </div>
        {/* </div> */}
      </Row>
    </Row>
  );
}

export default Register;
