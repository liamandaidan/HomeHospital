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


export class PractitionerPatientInfo extends Component {
	state = {
		patientsInfo: []
	};

	componentDidMount() {
		axios.get("http://localhost:4000/api/requestManager/hospitalWaitList/6216f18abaa205c9cab2f608")
		.then(res=> {
			console.log(res);
			this.setState({patientsInfo: res.data});
		})
	}

  render() {
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
			   {this.state.patientsInfo.map(patient => <h3>{patient.patientFirstName} {patient.patientLastName}</h3>)}
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div className="practitioner-patientDetails">
                <h4>Patient Details</h4>
                <div>
                  <p>Address: {this.props.patientDataGiven}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="practitioner-patientContactDetails ">
			   {this.state.patientsInfo.map((patient, index) => 
			   <div key={index}>
			   {/* <p>Address: {patient.startAddress.streetAddress}</p> */}
			   <h5>Symptoms:</h5>
				{patient.symptoms.map((p, i)=> (
					<div key={i}>
						<ul>
							<li>{p.description} (Severity: {p.severity})</li>
						</ul>
					</div>
				))}
			   <h5>Additional Info</h5>
				<p>{patient.additionalInfo}</p>
				<h5>Place in queue: </h5>
			   </div>
				)}
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
}

export default PractitionerPatientInfo;
