import React from "react";
import SymptomsForm from "./components/SymptomsForm.js";
import Navigation from "./components/Navigation.js";
import PatientInfo from "./components/PatientInfo.js";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

function App() {
  return (
    <>
      <Navigation />
      <Container className="main-container">
        <Row>
          <Col>
          <div className="breadcrumb-div">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Hospital
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Symptoms</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="progress-div">
            <ProgressBar now={60} />
          </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
          <div className="symptoms-div">
            <SymptomsForm />
          </div>
          </Col>
          <Col>
            <PatientInfo />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
