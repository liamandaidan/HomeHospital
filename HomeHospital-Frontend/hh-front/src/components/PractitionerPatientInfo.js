import React, { Component, useState, useEffect, useContext } from "react";
import logo from "../images/heartbeat.png";
import profile from "../images/profilepicture.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import "../styles/PractionerStyles.css";
import axios from "axios";
import { PractitionerContext } from "./PractitionerContext";

function PractitionerPatientInfo() {
  // state = {
  //   patientsInfo: {},
  // };
  const { _id } = useContext(PractitionerContext);

  const [patientId, setPatientId] = _id;

  const [patientInfo, setPatientInfo] = useState({
    HCnumber: "",
    firstName: "",
    lastName: "",
    emergencyContact: {
      firstName: "",
      lastName: "",
    },
  });

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

  // componentDidUpdate() {
  //   console.log(this.props.patientDataGiven);
  //   axios
  //     .get(
  //       `http://localhost:4000/api/requestManager/patientInfo/${this.props.patientDataGiven}`
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ patientsInfo: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
            <p>{patientInfo.HCnumber}</p>
            <p>{patientInfo.firstName}</p>
            <p>{patientInfo.lastName}</p>
            <p>{patientInfo.emergencyContact.firstName}</p>
            <p>{patientInfo.emergencyContact.lastName}</p>
            {/* <div className="practitioner-patientRequestDetails">
                {this.state.patientsInfo.map((patient, index) => (
                  // console.log(this.state.patientsInfo[patient])
                  <h3>
                    {patient.firstName} {patient.patientLastName}
                  </h3>
                ))}
              </div> */}
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <div className="practitioner-patientDetails">
              <h4>Patient Details</h4>
              <div>{/* <p>Address: {this.props.patientDataGiven}</p> */}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="practitioner-patientContactDetails ">
            {/* {this.state.patientsInfo.map((patient, index) => (
                <div key={index}> */}
            {/* <p>Address: {patient.startAddress.streetAddress}</p> */}
            {/* <h5>Symptoms:</h5>
                  {patient.symptoms.map((p, i) => (
                    <div key={i}> */}
            {/* <ul>
                        <li>
                          {p.description} (Severity: {p.severity})
                        </li>
                      </ul>
                    </div>
                  ))} */}
            {/* <h5>Additional Info</h5>
                  <p>{patient.additionalInfo}</p>
                  <h5>Place in queue: </h5>
                </div> */}
            {/* ))}  */}
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
