import React, { useState, useEffect } from "react";
import logo from "../images/heartbeat.png";
import profile from "../images/profilepicture.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import axios from "axios";

function PatientInfo() {
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [HCNumber, setHCNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergFirstName, setEmergFirstName] = useState("");
  const [emergLastName, setEmergLastName] = useState("");
  const [emergPhoneNumber, setEmergPhoneNumber] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        email: email,
      })
      .then((response) => {
        setFirstName(response.data.data.user.firstName);
        setLastName(response.data.data.user.lastName);
        setPhoneNumber(response.data.data.user.phoneNumber);
        setHCNumber(response.data.data.HCnumber);
        setEmergFirstName(response.data.data.emergencyContact.firstName);
        setEmergLastName(response.data.data.emergencyContact.lastName);
        setEmergPhoneNumber(response.data.data.emergencyContact.phoneNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container className="patient-container">
        <Row>
          <Col></Col>
          <Col>
            <img src={profile} alt="profilePic" className="profilepic" />
          </Col>
          <Col md={8}>
            <div className="patient-info-requestDetails">
              <h3>
                {firstName} {lastName}
              </h3>
              <p>Visit request #45</p>
              <p>Scheduled for March 15, 2022</p>
            </div>
          </Col>
          <Col></Col>
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
            <p>Contact number: {phoneNumber}</p>
            <p>Alberta Health Care no: {HCNumber}</p>
            <p>
              Emergency contact name: {emergFirstName} {emergLastName}
            </p>
            <p>Contact contanct number: {emergPhoneNumber}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="hbar-div">
              <img src={hbar} alt="heartbeat bar" className="hb-bar" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PatientInfo;
