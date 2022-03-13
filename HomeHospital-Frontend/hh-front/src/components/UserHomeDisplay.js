import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import hb1 from "../images/heartbeat-bg.png";
import profile from "../images/profilepicture.png";

import "../styles/UserHomepage.css";

function UserHomeDisplay() {
  return (
    <>
      <Container className="container-display">
        <Row>
          <Col>
            <img
              src={hb1}
              alt="heartbeat-logo-1"
              className="img-fluid heartbeat-logo-1"
            />
            <img
              src={profile}
              alt="profile photo"
              className="user-profile-photo"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomeDisplay;
