import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import UserNavBar from "../components/UserNavBar";
import classes from "./User.module.css";

function User() {
  return (
    <React.Fragment>
      <UserNavBar />
      <Container>
        <Row>
          <Col>
            <Row className={classes.boxArea}>PROFILE COMPONENT</Row>
            <Row className={classes.boxArea}>MAP COMPONENT</Row>
          </Col>
          <Col>
            <Row className={classes.boxArea}>CURRENT WAITLIST COMPONENT</Row>
            <Row className={classes.boxArea}>SYMPTOMS COMPONENT</Row>
            <Row className={classes.boxArea}>VITALS COMPONENT</Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default User;
