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

  //get patient ID from context
  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;

  const one = `http://localhost:4000/api/visitRequest/currentRequest/${patientID}`;
  const two = "http://localhost:4000/api/medicalFacility/viewFacilities";

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);

  //import all visits using patient ID
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/visitRequest/currentRequest/${patientID}`)
      .then((response) => {
        console.log("this is the current visit: " + response.data);
        setVisit(response.data.request);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.all([requestOne, requestTwo])
    // .then(axios.spread((...responses) => {
    //   const responseOne = responses[0];
    //   const responseTwo = responses[1];

    //   setVisit(responseOne.data);
    //   setHospitalList(responseTwo.data);

    //   console.log(responseOne.data,responseTwo.data);
    // })).catch(err => {
    //   console.log(err);
    // })

  }, []);

  console.log(requestHospitalId);

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
              <h1>Hi Linda!</h1>
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomeDisplay;
