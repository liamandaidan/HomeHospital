import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PatientInfo from "../components/PatientInfo.js";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import UserNav from "../components/UserNavBar.js";
import HospitalForm from "../components/HospitalForm.jsx";
import logo from "../images/heartbeat.png";
import ProgressBar from "react-bootstrap/ProgressBar";

import "../styles/HospitalSelectionStyles.css";

export default function HospitalSelectionForm() {
  return (
    <div>
      <UserNav />
      <Container className="main-container">
        <Row>
          <Col>
            <div className="breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
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
                now={50}
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
