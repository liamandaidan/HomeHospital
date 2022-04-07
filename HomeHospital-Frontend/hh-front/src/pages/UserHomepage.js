import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";

function UserHomepage() {
  const navigate = useNavigate();

  // useContext to get new Request value
  const { newRequest, requestButtonOn } = useContext(HomeHospitalContext);
  const [newRequestValue, setNewRequestValue] = newRequest;
  const [currentRequestExist, setCurrentRequestExist] = requestButtonOn;

  const createNewRequest = () => {
    setNewRequestValue(false);
    navigate("/hospitals");
  };

  function currentRequest() {
    axios
      .get("http://localhost:4000/api/visitRequest/currentRequest", {
        withCredentials: true,
      })
      .then((response) => {
        setCurrentRequestExist(false);
      })
      .catch((err) => {
        setCurrentRequestExist(true);
        console.log(err);
      });
  }

  useEffect(() => {
    currentRequest();
  }, [currentRequestExist]);

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
              {currentRequestExist && (
                <Button className="newRequest-btn" onClick={createNewRequest}>
                  Create new request
                </Button>
              )}
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
