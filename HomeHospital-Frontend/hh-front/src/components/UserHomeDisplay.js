import React, { useState, useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import moment from "moment";
import axios from "axios";

import hb1 from "../images/heartbeat-bg.png";
import profile from "../images/profilepicture.png";

import { HomeHospitalContext } from "./HomeHospitalContext";

import "../styles/UserHomepage.css";

function UserHomeDisplay() {
  moment.locale("en");

  const [visit, setVisit] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [requestHospitalId, setRequestHospitalId] = useState();
  const [date, setDate] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //get patient ID from context
  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;


  //import all visits using patient ID
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/visitRequest/allRequests/${patientID}`)
      .then((response) => {
        console.log("this is the all visit: " + response.data.request);
        setVisit(response.data.request);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }, []);

  // get the patient data
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        patientId: patientID,
      })
      .then((response) => {
        setFirstName(response.data.data.user.firstName);
        setLastName(response.data.data.user.lastName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(requestHospitalId);

  return (
    <>
      <Container className="container-display">
        <Row>
          <Col>
            <img
              src={hb1}
              alt="heartbeat-logo-1"
              className="img-fluid heartbeat-logo-1"
            />
            <img
              src={profile}
              alt="profile photo"
              className="user-profile-photo"
            />
            <span className="greetings">
              <h1>
                Hi {firstName}!
              </h1>
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomeDisplay;
