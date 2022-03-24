import React, { useContext } from "react";
import UserNavBar from "../components/UserNavBar";
import "../styles/UserHomepage.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import UserDisplay from "../components/UserHomeDisplay";
import UserVisitDisplay from "../components/UserHomeVisitsDisplay";
import { useNavigate } from "react-router-dom";
import "../styles/UserHomepage.css";
import { HomeHospitalContext } from "../components/HomeHospitalContext";

function UserHomepage() {
  const navigate = useNavigate();

  // useContext to get new Request value
  const { newRequest } = useContext(HomeHospitalContext);
  const [newRequestValue, setNewRequestValue] = newRequest;

  const createNewRequest = () => {
    setNewRequestValue(false);
    navigate("/hospitals");
  };

  return (
    <>
      <UserNavBar />
      <Container>
        <Row>
          <Col>
            <UserDisplay />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="request-btn-div">
              <Button className="newRequest-btn" onClick={createNewRequest}>
                Create new request
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <UserVisitDisplay />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomepage;
