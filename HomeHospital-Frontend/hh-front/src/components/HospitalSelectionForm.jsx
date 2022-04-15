import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PatientInfo from "../components/PatientInfo.js";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import UserNav from "../components/UserNavBar.js";
import HospitalForm from "../components/HospitalForm.jsx";
import logo from "../images/heartbeat.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../styles/HospitalSelectionStyles.css";
import { useNavigate } from "react-router-dom";

/**
 * @name HospitalSelectionForm
 * @summary Component with relation to the selection of the form from a users perspective.
 * @returns html related to the function
 */
export default function HospitalSelectionForm() {
  const navigate = useNavigate();
  /**
   * @function handleOnHome This will navigate the user back to home
   */
  const handleOnHome = () => {
    navigate("/home");
  };
  return (
    <div>
      <UserNav />
      <Container className="main-container">
        <Row>
          <Col>
            <div className="breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item onClick={handleOnHome}>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Hospital</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="progress-div">
              <ProgressBar
                className="symptomsProgress"
                now={30}
                variant="custom"
              />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <div className="hospitalForm-div">
          <Row>
            <Col>
              <HospitalForm />
            </Col>
            <Col>
              <Row>
                <Col className="offset-md-2">
                  <img
                    src={logo}
                    alt="heartbeat-logo"
                    className="heartbeat-logo"
                  />
                </Col>
              </Row>
              <PatientInfo />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
