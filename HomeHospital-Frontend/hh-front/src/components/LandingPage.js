import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import logo from "../images/heartbeat_logo_long.png";
import classes from "./LandingPage.module.css";
import landingImage from "../images/landingImage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  };

  return (
    <div>
      <Row className={classes.header}>
        <Col>
          <img className={classes.logo} src={logo} alt="logo" />
          <p className={classes.logoTitle}>HomeHospital</p>
        </Col>
        <Col className={classes.columnSpace} md={1}>
          About us
        </Col>
        <Col className={classes.columnSpace} md={1}>
          Products
        </Col>
        <Col className={classes.columnSpace} md={1}>
          Support
        </Col>
        <Col className={classes.columnSpace} md={{ offset: 3 }}>
          <div>
            <Button
              variant="link"
              style={{ paddingRight: "25px", fontSize: "15px" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              className={`rounded-pill shadow ${classes.signup}`}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className={classes.titleBox}>
            <h1 style={{ fontSize: "70px", fontWeight: "bold" }}>
              Why wait at the hospital when you can wait at home
            </h1>
            <br />
            <h6>
              <strong>Stay Safe</strong> /{" "}
              <strong>Monitor Your Symptoms</strong> /{" "}
              <strong>Updated Waitlist</strong> /{" "}
              <strong>Hospital Wait Times</strong>
            </h6>
            <br />
            <br />
            <p>Make the Hospital experience a more comfortable experience!</p>
            <br />
            <br />
            <Button
              className={`rounded-pill shadow ${classes.signup}`}
              onClick={handleRegister}
            >
              Register Now -->
            </Button>
          </div>
          <img
            className={classes.landingImage}
            src={landingImage}
            alt="landingImage"
          />
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
