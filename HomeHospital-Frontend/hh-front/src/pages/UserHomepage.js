import React from "react";
import UserNavBar from "../components/UserNavBar";
import "../styles/UserHomepage.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import UserDisplay from "../components/UserHomeDisplay";
import UserVisitDisplay from "../components/UserHomeVisitsDisplay";

function UserHomepage() {
  return (
    <>
      <UserNavBar />
      <Container>
        <Row>
          <UserDisplay />
        </Row>
        <Row>
          <UserVisitDisplay />
        </Row>
      </Container>
    </>
  );
}

export default UserHomepage;
