import React from 'react'
import Navigation from "../components/Navigation.js";
import PatientInfo from "../components/PatientInfo.js";
import BreadcrumbNav from "../components/BreadcrumbNav.js";
import ProgressNav from "../components/ProgressNav.js";
import "../styles/main.css";

import { Container, Row, Col } from "react-bootstrap";


function HospitalSelectionPage() {
  return (
	<>
	<Navigation />
	<Container className="main-container">
        <Row>
          <Col>
            <BreadcrumbNav />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="progress-div">
              <ProgressNav />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <PatientInfo />
          </Col>
        </Row>
      </Container>
	</>
  )
}

export default HospitalSelectionPage