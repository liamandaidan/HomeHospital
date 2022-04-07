import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { HomeHospitalContext } from "./HomeHospitalContext";

function WaitList() {
  const { requestId, isCurrentRequest } = useContext(HomeHospitalContext);

  const [requestValue, setRequestValue] = useState({ patient: "No One" });
  const [isCurrent, setIsCurrent] = isCurrentRequest;
  const [requestIdValue, setRequestIdValue] = requestId;
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    if (isCurrent) {
      axios
        .get("http://localhost:4000/api/visitRequest/currentRequest")
        .then((response) => {
          console.log("in the current request");
          setRequestValue(response.data);
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(requestIdValue);
      axios
        .get(
          `http://localhost:4000/api/visitRequest/targetRequest/${requestIdValue}`
        )
        .then((response) => {
          console.log("in the existing request");
          setIsCurrent(false);
          setRequestValue(response.data.request);
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="mt-5">
      {isCurrent && <h4>Current Waitlist</h4>}
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
          {spinner && (
            <div className="spinner-div text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
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
    </div>
  );
}

export default WaitList;
