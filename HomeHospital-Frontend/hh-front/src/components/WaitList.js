import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "./HomeHospitalContext";

function WaitList() {
  const { requestId, isCurrentRequest, requestButtonOn, cancelSuccess } =
    useContext(HomeHospitalContext);

  const navigate = useNavigate();

  const [requestValue, setRequestValue] = useState({ patient: "No One" });
  const [isCurrent, setIsCurrent] = isCurrentRequest;
  const [requestIdValue, setRequestIdValue] = requestId;
  const [spinner, setSpinner] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [reqButton, setReqButton] = requestButtonOn;
  const [cancelSuccessValue, setCancelSuccessValue] = cancelSuccess;

  useEffect(() => {
    if (isCurrent) {
      axios
        .get("http://localhost:4000/api/visitRequest/currentRequest")
        .then((response) => {
          // console.log("in the current request");
          setRequestValue(response.data);
          setSpinner(false);
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log(requestIdValue);
      axios
        .get(
          `http://localhost:4000/api/visitRequest/targetRequest/${requestIdValue}`
        )
        .then((response) => {
          // console.log("in the existing request");
          setIsCurrent(false);
          setRequestValue(response.data.request);
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
          setModalState(false);
          setReqButton(false);
          setCancelSuccessValue(true);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <Button
              variant="link"
              className="cancel-lnk"
              onClick={props.onHide}
            >
              Go Back
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div className="mt-5">
      {isCurrent && <h4>Current Waitlist</h4>}
      {spinner && (
        <div className="spinner-div text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!isCurrent && <h4>Past Request</h4>}
      <Table striped bordered hover>
        <thead>
          {isCurrent && (
            <tr className="text-center">
              <th>Req#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Hospital</th>
              <th>Cancel</th>
            </tr>
          )}
          {!isCurrent && (
            <tr className="text-center">
              <th>Req#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Hospital</th>
              <th>Status</th>
            </tr>
          )}
        </thead>

        <tbody>
          {isCurrent && !spinner && (
            <tr className="text-center">
              <td>{requestValue._id}</td>
              <td>{requestValue.patientFirstName}</td>
              <td>{requestValue.patientLastName}</td>
              <td>{requestValue.requestHospitalName}</td>
              <td>
                <Button
                  variant="outline-danger"
                  className="rounded-pill btn-sm"
                  onClick={() => handleCancelRequest()}
                >
                  Cancel Request
                </Button>
              </td>
            </tr>
          )}
          {!isCurrent && !spinner && (
            <tr className="text-center">
              <td>{requestValue._id}</td>
              <td>{requestValue.patientFirstName}</td>
              <td>{requestValue.patientLastName}</td>
              <td>{requestValue.requestHospitalName}</td>
              <td>
                <h6 className="text-success">Completed</h6>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </div>
  );
}

export default WaitList;
