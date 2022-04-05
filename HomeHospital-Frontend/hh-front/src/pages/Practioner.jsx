import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PractNav from "../components/PractNavBar.jsx";
import "../styles/PractionerStyles.css";
import line from "../images/hb2.png";
import PractionerWaitlist from "../components/PractionerWaitlist.jsx";
import PractitionerPatientInfo from "../components/PractitionerPatientInfo.js";

export default function Practioner() {

  //State used to keep track of the current info in focus.
  const[patientData, setPatientData] = useState("");
  /**
   * This will update our parent class(Practioner) with recent info.
   * @param {*} childData the ID of a patient passed in from child.
   */
  const childToParent = (childData) => {
    //alert("This is id num: "+childData);
    setPatientData(childData);
  }

  
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
                  <PractitionerPatientInfo patientDataGiven={patientData}/>
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
                  <PractionerWaitlist childToParent={childToParent}/>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
