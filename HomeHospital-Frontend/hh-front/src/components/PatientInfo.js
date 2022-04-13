import React, { useState, useEffect } from "react";
import profile from "../images/profilepicture.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import axios from "axios";
/**
 * Create a component that displays the current patient's information
 * @returns patient information component
 * @author Robyn Balanag
 */
function PatientInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [HCNumber, setHCNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergFirstName, setEmergFirstName] = useState("");
  const [emergLastName, setEmergLastName] = useState("");
  const [emergPhoneNumber, setEmergPhoneNumber] = useState("");
  /**
   * Load patient visit information from the database and 
   * assign values 
   */
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest")
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
  /**
   * Used to format current date
   */
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const formatDate = today.toDateString();
  return (
    <>
      <Container style={{ marginLeft: "-40px" }}>
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
              <p>{formatDate}</p>
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
              Emergency contact name:{" "}
              {emergFirstName == null
                ? "No infomation available"
                : emergFirstName + " " + emergLastName}
            </p>
            <p>Contact number: {" "}
            {emergPhoneNumber == null
                ? "No infomation available"
                : emergPhoneNumber} </p>
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
