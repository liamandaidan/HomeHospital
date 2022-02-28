import React from 'react';
import logo from '../img/heartbeat.png';
import profile from '../img/profilepicture.png';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../styles/SymptomForm.css';



function PatientInfo() {
  return (
    <>

    <Container className='patient-container'>
        <Row>
            <Col>
                <img src={logo} alt='heartbeat-logo' className="heartbeat-logo" />
            </Col>
        </Row>
        <Row>
            <Col>
               <img src={profile} alt='profilePic' className='profilepic' />
            </Col>
            <Col md={8}>
                <div className="patient-info-requestDetails">
                    <h3>Linda Belcher</h3>
                    <p>Visit request #45</p>
                    <p>Scheduled for March 15, 2022</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
            <div className="patient-info-personalDetails">
                   <h4>Confirmed Patient Details </h4>
                </div>
            </Col>
        </Row>
        <Row>
            <Col className='patient-contactDetails'>
            <p>Contact number: </p>
            <p>Alberta Health Care no: </p>
            <p>Emergency contact name: </p>
            <p>Contact contanct number: </p>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default PatientInfo