import React, { useContext, useEffect } from "react";
import SymptomsForm from "../components/SymptomsForm.js";
import PatientInfo from "../components/PatientInfo.js";
import BreadcrumbNav from "../components/BreadcrumbNav.js";
import logo from "../images/heartbeat.png";
import UserNavBar from "../components/UserNavBar";
import ProgressBar from "react-bootstrap/ProgressBar";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import { HomeHospitalContext } from "../components/HomeHospitalContext.js";
import { useNavigate } from "react-router-dom";

function SymptomsPage() {
  const navigate = useNavigate();
  const { requestButtonOn } = useContext(HomeHospitalContext);
  const [isThereCurrentRequest, setIsThereCurrentRequest] = requestButtonOn;

  useEffect(() => {
    if (!isThereCurrentRequest) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <UserNavBar />
      <Container className="main-container">
        <Row>
          <Col>
            <BreadcrumbNav />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="progress-div">
              <ProgressBar
                className="symptomsProgress"
                now={90}
                variant="custom"
              />
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
            <Row>
              <Col className="offset-md-2">
                <img
                  src={logo}
                  alt="heartbeat-logo"
                  className="heartbeat-logo"
                />
              </Col>
            </Row>
            <PatientInfo />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SymptomsPage;
