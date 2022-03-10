import React, { useState, useEffect } from "react";
import logo from "../images/heartbeat.png";
import profile from "../images/profilepicture.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import axios from 'axios';



function PatientInfo() {

  const [email, setEmail] = useState("robynbalanag@gmail.com");
  const [patient, setPatient] = useState({});



  useEffect(() => {
    axios.post('http://localhost:4000/api/users/PatientInfoVisitRequest', {
      email: email,
    }).then((response) => {
      console.log(response.data);
    }).catch((err) => {
      console.log(err);
    })
   }, [])

  return (
    <>
      <Container className="patient-container">
        <Row>
          <Col>
            <img src={logo} alt="heartbeat-logo" className="heartbeat-logo" />
          </Col>
        </Row>
        <Row>
          <Col>
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
            <img src={hbar} alt="heartbeat bar" className="hb-bar"/>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default PatientInfo;
