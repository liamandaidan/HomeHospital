import React, { useState, useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import moment from "moment";
import axios from "axios";
import Image from "react-bootstrap/Image";


import hb1 from "../images/heartbeat-bg.png";
import profile from "../images/profilepicture.png";

import { HomeHospitalContext } from "./HomeHospitalContext";

import "../styles/UserHomepage.css";

function UserHomeDisplay() {
  moment.locale("en");

  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [requestHospitalId, setRequestHospitalId] = useState("");
  const [requestHospitalName, setRequestHospitalName] = useState("");

  //get patient ID from context
  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;


  //import all visits using patient ID
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/visitRequest/allRequests/${patientID}`)
      .then((response) => {
        console.log("this is the all visit: " + response.data.request);
        // setVisit(response.data.request);
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

    // get current visit details
    useEffect(() => {
      axios
        .get(`http://localhost:4000/api/visitRequest/currentRequest/${patientID}`)
        .then((response) => {
          console.log("this is the current visit: " + response.data.request.requestHospitalName);
          setDate(response.data.request.dateTime);
          setRequestHospitalName(response.data.request.requestHospitalName);
          setRequestHospitalId(response.data.request.requestHospitalID);
        })
        .catch((err) => {
          console.log(err);
        });
    
    }, []);


  return (
    <>
      <Container className="container-display">
          <Row>
            <Col sm={{order: 1}} md={3}  ></Col>
            <Col sm={{order: 2}} md={3} > 
                <Image src={profile} className="user-profile-photo" fluid roundedCircle />
            </Col>
            <Col sm={{order: 3}} md={3} >
                <h1>Hi {firstName}!</h1>
              <Card className="card-currentVisit">
                <Card.Body>
                {moment(date).format("dddd, MMMM Do YYYY")}
                  <p>{requestHospitalName}</p>

                </Card.Body>
              </Card>
            </Col>
            <Col sm={{order: 4}} md={3} >

            </Col>
          </Row>
          <Image src={hb1} className="heartbeat-logo-1" fluid />
      </Container>
    </>
  );
}

export default UserHomeDisplay;


        {/* <Row>
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
        </Row> */}
