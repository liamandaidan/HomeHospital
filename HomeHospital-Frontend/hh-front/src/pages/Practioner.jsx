import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PatientInfo from "../components/PatientInfo.js";
import PractNav from "../components/PractNavBar.jsx";
import logo from "../images/heartbeat.png";
import "../styles/PractionerStyles.css"

export default function Practioner() {
  return (
    <div>
      <PractNav />
      <Container className="main-container">
        <div className="practionerView-div">
          <Row>
            <Col md="5">
              <div className="leftContent">
                test
                <Row>
                  {/* <PatientInfo /> */}
                </Row>
              </div>
            </Col>
            <Col md="7">
              <div className="rightContent">test</div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
