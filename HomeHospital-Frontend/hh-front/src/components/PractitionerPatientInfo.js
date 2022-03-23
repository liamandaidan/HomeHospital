import React, { Component, useState, useEffect, useContext } from "react";
import logo from "../images/heartbeat.png";
import profile from "../images/profilepicture.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import "../styles/PractionerStyles.css";
import patientData2 from "../components/TempVisitRequest.json";
import axios from "axios";
import { HomeHospitalContext } from "./HomeHospitalContext";

export class PractitionerPatientInfo extends Component {
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
			  {patientData2.map((patientDetail, index) => {
		  		return <h3>{patientDetail.name}</h3>
	  		 })}
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div className="practitioner-patientDetails">
                <h4>Patient Details</h4>
                <div class="alert alert-primary" role="alert">
                  #This is temporary, waitlist ID: {this.props.patientDataGiven}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="practitioner-patientContactDetails ">
			  {patientData2.map((patientDetail, index) => {
		  		return (
					<><p>Address: {patientDetail.address}</p>
					<p>Contact Number: {patientDetail.contactNumber}</p>
					<p>Alberta Health Care no: {patientDetail.albertaHealthcareNo}</p>
					<p>Emergency Contact Name: {patientDetail.emergencyContactName}</p>
					<p>Emergency Contact No:{patientDetail.emergencyContactNumber}</p>
					<h5>Symptoms</h5>
					<ul>
						<li>{patientDetail.symptoms}</li>
              		</ul>
					<h5>Additional Info</h5>
						<p>{patientDetail.additionalInfo}</p>
					<h5>Place in queue: {patientDetail.queue}</h5>
					</>
				  )		
	  		 })}
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
