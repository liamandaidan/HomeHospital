import React from "react";

import profile from "../images/profilepicture.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";

function PatientInfo() {
  return (
    <>
      <Container className="patient-container">
        <Row>
          <Col className="text-center">
            <img src={profile} alt="profilePic" className="profilepic" />
          </Col>
          <Col md={8}>
            <div className="patient-info-requestDetails">
              <h3>Linda Belcher</h3>
              <p>Visit request #45</p>
              <p>Scheduled for March 15, 2022</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="patient-info-personalDetails">
              <h4>Confirmed Patient Details </h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="patient-contactDetails">
            <p>Contact number: (403) 123-1234</p>
            <p>Alberta Health Care no: 123456-12</p>
            <p>Emergency contact name: Bob Belcher</p>
            <p>Contact contanct number: (403) 222-1111</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="edit">
              <a href="">Edit details</a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <img src={hbar} alt="heartbeat bar" className="hb-bar" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PatientInfo;
