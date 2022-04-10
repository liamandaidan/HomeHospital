import React, { useState, useEffect, useContext } from "react";
// import logo from "../images/heartbeat.png";
import profile from "../images/img_avatar.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import "../styles/PractionerStyles.css";
import axios from "axios";
import { PractitionerContext } from "./PractitionerContext";

function PractitionerPatientInfo() {
  const { _id, additionalInfo, symptomsInfo } = useContext(PractitionerContext);

  const [patientAdditionalInfo, setPatientAdditionalInfo] = additionalInfo;

  const [patientId, setPatientId] = _id;

  const [symptomDetails, setSymptomDetails] = symptomsInfo;

  const [patientInfo, setPatientInfo] = useState({
    HCnumber: "",
    firstName: "",
    lastName: "",
    user: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: {
        streetAddress: "",
      },
	  phoneNumber:"",
    },
    emergencyContact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  // useEffect(() => {
  //   console.log(symptomDetails);
  //   symptomDetails.map((data) => {
  //     console.log(data.description);
  //   });
  // }, [symptomDetails]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/requestManager/patientInfo/${patientId}`)
      .then((res) => {
        console.log(res);
        setPatientInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientId]);

  return (
    <>
      <Container className="patient-container">
        <Row>
          <Row>
            <Col>
              <div className="hbar-div">
                <img
                  src={hbar}
                  alt="heartbeat bar"
                  className="hb-bar-practitioner1"
                />
              </div>
            </Col>
          </Row>
          <Col>
            <img src={profile} alt="profilePic" className="profilepic" />
          </Col>
          <Col md={8}>
            <div className="practitioner-patientRequestDetails">
			<h3>
                {patientInfo.user.firstName} {patientInfo.user.lastName}
              </h3>
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <div className="practitioner-patientDetails">
              <h4>Patient Details</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="practitioner-patientContactDetails ">
		  	  
            <p>Address: {patientInfo.user.address.streetAddress}</p>
			<p>
				Phone Number: {patientInfo.user.phoneNumber}
			</p>
            <p>
              Emergency Contact Name: {patientInfo.emergencyContact.firstName}{" "}
              {patientInfo.emergencyContact.lastName}
            </p>
            <p>
              Emergenct Contact Number:{" "}
              {patientInfo.emergencyContact.phoneNumber}
            </p>
            <p>Alberta Healthcare No: {patientInfo.HCnumber}</p>
            <p>Additional Info: {patientAdditionalInfo}</p>

            <h5>Symptoms</h5>
            {symptomDetails.map((data) => (
              <div>
				  <ul>
					  <li>
					  	{data.description} (Severity: {data.severity})
					  </li>
				  </ul>
                <p></p>
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="hbar-div">
              <img
                src={hbar}
                alt="heartbeat bar"
                className="hb-bar-practitioner2"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PractitionerPatientInfo;
