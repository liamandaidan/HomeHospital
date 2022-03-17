import React, { useState, Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PatientInfo from "../components/PatientInfo.js";
import PractNav from "../components/PractNavBar.jsx";
import logo from "../images/heartbeat.png";
import "../styles/PractionerStyles.css";
import line from "../images/hb2.png";
import PractionerWaitlist from "../components/PractionerWaitlist.jsx";
import PractitionerPatientInfo from "../components/PractitionerPatientInfo.js";

export default class Practioner extends Component {
  render() {
    return (
      <div>
        <PractNav />
        <Container className="main-container">
          <div className="practionerView-div">
            <Row>
              <Col md="5">
                <div className="leftContent">
                  <p class="pd">Patient Details</p>
                  <Row>
                    <img
                      src={line}
                      class="rounded float-start"
                      alt="RIP"
                      className="hb2"
                    />
                  </Row>
                  <Row>
                    {/* Patient info shown depending on logic of component selected.
                    PATIENTINFO COMPONENT WILL NEED TO BE REPLACED*/}
                    <PractitionerPatientInfo />
                  </Row>
                  <Row>
                    <p>
                      <a href="/editPatient">Edit patient file</a>
                    </p>
                  </Row>
                </div>
              </Col>
              <Col md="7">
                <div className="rightContent">
                  <Row>
                    <p class="pd">Current Waitlist</p>
                  </Row>
                  <Row>
                    <PractionerWaitlist />
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
