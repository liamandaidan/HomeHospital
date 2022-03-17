import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PatientInfo from "../components/PatientInfo.js";
import PractNav from "../components/PractNavBar.jsx";
import logo from "../images/heartbeat.png";
import "../styles/PractionerStyles.css";
import line from "../images/hb2.png";

export default function Practioner() {
    // change the state to view visability on patient details
  const [patientDetails, setPatientDetails] = useState(true);

  return (
    <div>
      <PractNav />
      <Container className="main-container">
        <div className="practionerView-div">
          <Row>
            <Col md="5">
              <div className="leftContent" hidden={!patientDetails}>
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
                  <PatientInfo />
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
                    {/* This table class will be automatically generated.
                    Just used as an example for now */}
                  <table class="table table-hover">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>
                          <Button>Check in</Button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>
                          <Button>Check in</Button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>
                          <Button>Check in</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
