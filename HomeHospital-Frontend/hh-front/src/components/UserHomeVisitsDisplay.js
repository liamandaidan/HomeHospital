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
import { Button, Modal, Spinner } from "react-bootstrap";

axios.defaults.withCredentials = true;

function UserHomeVisitsDisplay() {
  const navigate = useNavigate();

  // useContext to get new Request value
  const {
    newRequest,
    requestId,
    isCurrentRequest,
    requestButtonOn,
    cancelSuccess,
  } = useContext(HomeHospitalContext);
  const [newRequestValue, setNewRequestValue] = newRequest;
  const [reqButton, setReqButton] = requestButtonOn;
  const [requestIdValue, setRequestIdValue] = requestId;
  const [isCurrent, setIsCurrent] = isCurrentRequest;
  const [cancelSuccessValue, setCancelSuccessValue] = cancelSuccess;

  moment.locale("en");

  const [visitList, setVisitList] = useState([]);
  const [currentList, setCurrentList] = useState();
  const [spinner, setSpinner] = useState(true);
  const [currentSpinner, setCurrentSpinner] = useState(true);
  const [noRequest, setNoRequest] = useState(false);
  const [noCurrent, setNoCurrent] = useState(false);
  const [modalState, setModalState] = useState(false);

  function pastRequest() {
    axios
      .get("http://localhost:4000/api/visitRequest/allRequests", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.request);
        if (response.status === 200) {
          console.log("200 Success!");
          console.log(response.data);
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
          setReqButton(false);
        }
      })
      .catch((err) => {
        setNoCurrent(true);
        setCurrentSpinner(false);
        setReqButton(true);
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
    setReqButton(false);
    navigate(`/request/${request._id}`);
  }

  function handlePastRequest(request) {
    setIsCurrent(false);
    setRequestIdValue(request);
    setNewRequestValue(false);
    navigate(`/request/${request}`);
  }

  function handleCancelRequest() {
    setModalState(true);
  }

  function cancelRequest() {
    axios
      .delete("http://localhost:4000/api/visitRequest/cancel", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsCurrent(false);
          setNoCurrent(true);
          setModalState(false);
          setReqButton(false);
          setCancelSuccessValue(true);
          window.location.reload();
        }
      })
      .catch((err) => {
        setNoCurrent(true);
        setCurrentSpinner(false);
        console.log(err);
      });
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

  const AlertModal = (props) => {
    return (
      <>
        <Modal {...props} centered>
          <Modal.Header className="modal-title">
            <Modal.Title>Cancel Request</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-content">
            <p>
              Are you sure you want to cancel your request? If you cancel this
              request you will need to fill out a new request and will lose the
              current spot that you are in right now!
            </p>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button
              className="ack-btn"
              onClick={() => cancelRequest()}
              variant="primary"
            >
              Cancel Request
            </Button>
            <div>
              <Button
                variant="link"
                className="cancel-lnk"
                onClick={props.onHide}
              >
                Go Back
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

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
              <div className="spinner-div text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {!currentSpinner && !noCurrent && (
              <Table
                striped
                hover
                responsive
                className="visit-table table-fixed"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th className="text-center">Cancel</th>
                    <th className="text-center">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      {moment(currentList.dateTime).format(
                        "dddd, MMMM Do YYYY"
                      )}
                    </td>
                    <td>Emergency Room Visit</td>
                    <td>{currentList.requestHospitalName}</td>
                    <td>{currentList.waitListTime}</td>
                    <td className="text-center">
                      <Button
                        variant="link"
                        className="cancelRequest-btn"
                        onClick={() => handleCancelRequest()}
                      >
                        cancel request
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="link"
                        className="newRequest-btn"
                        onClick={() => handleCurrentRequest(currentList)}
                      >
                        view request
                      </Button>
                    </td>
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
              <div className="spinner-div text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {!spinner && !noRequest && visitList.length > 0 && (
              <Table
                striped
                hover
                responsive
                className="visit-table table-fixed"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Location</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">View</th>
                  </tr>
                </thead>
                <tbody>
                  {visitList.map((visit, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {moment(visit.request.dateTime).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </td>
                      <td>Emergency Room Visit</td>
                      <td>{visit.request.requestHospitalName}</td>
                      <td className="text-success text-center">Complete</td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="newRequest-btn"
                          onClick={() => handlePastRequest(visit._id)}
                        >
                          view request
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default UserHomeVisitsDisplay;
