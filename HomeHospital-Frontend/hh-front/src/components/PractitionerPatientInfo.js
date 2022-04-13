import React, { useState, useEffect, useContext } from "react";
import profile from "../images/img_avatar.png";
import hbar from "../images/hb2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/SymptomForm.css";
import "../styles/PractionerStyles.css";
import axios from "axios";
import { PractitionerContext } from "./PractitionerContext";
import { Button } from "react-bootstrap";

function PractitionerPatientInfo({ patientDataGiven }) {
  //useContext here
  const { _id, additionalInfo, symptomsInfo,hidden } = useContext(PractitionerContext);

  //grab states for useContext grabs data from other route in PractitionerWaitlist.jsx for additional info, symptoms and id.
  const [patientAdditionalInfo, setPatientAdditionalInfo] = additionalInfo;
  const [patientId] = _id;
  const [symptomDetails, setSymptomDetails] = symptomsInfo;
  const [checkIn, setCheckedIn] = useState(patientDataGiven);
  //empty states for patientInfo route data in the useEffect
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
      phoneNumber: "",
    },
    emergencyContact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    //don't create a request until patientId is defined
    const clearInfo = () => {
      setPatientInfo({
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
          phoneNumber: "",
        },
        emergencyContact: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
        },
      }
      );
	  setPatientAdditionalInfo(" ");
	  setSymptomDetails([]);
    };

    if (typeof patientId !== "undefined") {
      axios
        .get(
          `http://localhost:4000/api/requestManager/patientInfo/${patientId}`
        )
        .then((res) => {
          setPatientInfo(res.data);
        })
        .catch((err) => {
          clearInfo();
          //console.log(err);
        });
    } else {
      clearInfo();
    }
  }, [patientId, checkIn]);

  const handleChange = (e) => {
    patientDataGiven = "WOW";
  };

  const [hiddenDetail, setHiddenDetail] = hidden;
  
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
		  <img src={profile} alt="profilePic" className="profilepic"></img>
          </Col>
          <Col md={8}>
            {/**
             * Displays patients name
             * */}
            <div className="practitioner-patientRequestDetails"> 
			<h3>
                {patientInfo.user.firstName} {patientInfo.user.lastName}
            </h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="practitioner-patientDetails">
			  <h4>Patient Details</h4> 
            </div>
          </Col>
        </Row>
        <Row>
          {/**
           * Displays patient address,phone#,emergency contact,healthcare#,
           * makes use of useContext for additionalInfo,Symptoms(description,severity) data grabbed from PractitionerWaitlist
           */}
		   {!hiddenDetail ? 
			   <Col className="practitioner-patientContactDetails ">
			   <p>Address: {patientInfo.user.address.streetAddress}</p>
			   <p>Phone Number: {patientInfo.user.phoneNumber}</p>
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
			   {symptomDetails.map((data, i) => (
				 <div key={i}>
				   <ul>
					 <li>
					   {data.description} (Severity: {data.severity})
					 </li>
				   </ul>
				 </div>
			   ))}
			 </Col> : null
		   }
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
