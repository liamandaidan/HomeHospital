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
  const { newRequest, requestId, isCurrentRequest } =
    useContext(HomeHospitalContext);
  const [newRequestValue, setNewRequestValue] = newRequest;
  const [requestIdValue, setRequestIdValue] = requestId;
  const [isCurrent, setIsCurrent] = isCurrentRequest;

  moment.locale("en");

  const [visitList, setVisitList] = useState([]);
  const [currentList, setCurrentList] = useState();
  const [spinner, setSpinner] = useState(true);
  const [currentSpinner, setCurrentSpinner] = useState(true);
  const [noRequest, setNoRequest] = useState(false);
  const [noCurrent, setNoCurrent] = useState(false);

  function pastRequest() {
    axios
      .get("http://localhost:4000/api/visitRequest/allRequests", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.request);
        if (response.status === 200) {
          console.log("200 Success!");
          setVisitList(response.data);
          setSpinner(false);
        }
      })
      .catch((err) => {
        setNoRequest(true);
        setSpinner(false);
        console.log(err);
      });
  }

  function currentRequest() {
    axios
      .get("http://localhost:4000/api/visitRequest/currentRequest", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.request);
        if (response.status === 200) {
          console.log("200 Success!");
          console.log(response.data);
          setCurrentList(response.data);
          setCurrentSpinner(false);
        }
      })
      .catch((err) => {
        setNoCurrent(true);
        setCurrentSpinner(false);
        console.log(err);
      });
  }

  //import all visits using patient ID
  useEffect(() => {
    setSpinner(true);
    if (newRequestValue) {
      const timer = setTimeout(() => {
        pastRequest();
      }, 500);
    } else {
      pastRequest();
    }
  }, []);

  function handleCurrentRequest(request) {
    setIsCurrent(true);
    setRequestIdValue(request._id);
    setNewRequestValue(false);
    navigate("/request");
  }

  function handlePastRequest(request) {
    setRequestIdValue(request);
    setNewRequestValue(false);
    navigate("/request");
  }

  useEffect(() => {
    setCurrentSpinner(true);
    if (newRequestValue) {
      const timer = setTimeout(() => {
        currentRequest();
      }, 500);
    } else {
      currentRequest();
    }
  }, []);

  return (
    <>
      <Container className=".container-visits">
        <Row className="current">
          <h2>Current Request</h2>
          <Col>
            {noCurrent && (
              <div className="pb-5">
                <h4>No Current Request Available</h4>
              </div>
            )}
            {currentSpinner && (
              <div className="spinner-div">
                <Spinner animation="border" role="status" className="spinner">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {!currentSpinner && !noCurrent && (
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
                  <tr onClick={() => handleCurrentRequest(currentList)}>
                    <td>1</td>
                    <td>
                      {moment(currentList.dateTime).format(
                        "dddd, MMMM Do YYYY"
                      )}
                    </td>
                    <td>Emergency Room currentList</td>
                    <td>{currentList.requestHospitalName}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

        <Row>
          <h2>Past Requests</h2>
          <Col>
            {noRequest && (
              <div>
                <h4>No Past Requests Available</h4>
              </div>
            )}
            {spinner && (
              <div className="spinner-div">
                <Spinner animation="border" role="status" className="spinner">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {!spinner && !noRequest && visitList.length > 0 && (
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
                    <tr
                      key={index}
                      onClick={() => handlePastRequest(visit._id)}
                    >
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
