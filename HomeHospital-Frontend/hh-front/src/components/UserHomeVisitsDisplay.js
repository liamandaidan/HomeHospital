import React, { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "../styles/UserHomepage.css";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "./HomeHospitalContext";
import { Spinner } from "react-bootstrap";

axios.defaults.withCredentials = true;

function UserHomeVisitsDisplay() {
  const navigate = useNavigate();

  // useContext to get new Request value
  const { newRequest, requestId } = useContext(HomeHospitalContext);
  const [newRequestValue, setNewRequestValue] = newRequest;
  const [requestIdValue, setRequestIdValue] = requestId;

  moment.locale("en");

  const [visitList, setVisitList] = useState([]);
  const [spinner, setSpinner] = useState(true);

  function makeRequest() {
    axios
      .get("http://localhost:4000/api/visitRequest/allRequests", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.request);
        setVisitList(response.data.request);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //import all visits using patient ID
  useEffect(() => {
    setSpinner(true);
    if (newRequestValue) {
      const timer = setTimeout(() => {
        makeRequest();
      }, 500);
    } else {
      makeRequest();
    }
  }, []);

  function handleRequest(requestId) {
    setRequestIdValue(requestId);
    setNewRequestValue(false);
    navigate("/request");
  }

  return (
    <>
      <Container className="container-visits">
        <Row>
          <Col>
            {spinner && (
              <div className="spinner-div">
                <Spinner animation="border" role="status" className="spinner">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {!spinner && (
              <Table
                striped
                bordered
                hover
                responsive
                borderless
                className="visit-table table-fixed"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {visitList.map((visit, index) => (
                    <tr key={index} onClick={() => handleRequest(visit._id)}>
                      <td>{index + 1}</td>
                      <td>
                        {moment(visit.dateTime).format("dddd, MMMM Do YYYY")}
                      </td>
                      <td>Emergency Room Visit</td>
                      <td>{visit.requestHospitalName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomeVisitsDisplay;
