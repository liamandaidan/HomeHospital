import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { HomeHospitalContext } from "./HomeHospitalContext";

function SymptomsTable() {
  // context variables
  const { requestId, isCurrentRequest, longitude, latitude } =
    useContext(HomeHospitalContext);
  const [requestIdValue, setRequestIdValue] = requestId;
  const [isCurrent, setIsCurrent] = isCurrentRequest;
  const [longitudeValue, setLongitudeValue] = longitude;
  const [latitudeValue, setLatitudeValue] = latitude;

  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    if (isCurrent) {
      axios
        .get("http://localhost:4000/api/visitRequest/currentRequest")
        .then((response) => {
          console.log(response);
          setSymptomsList(response.data.symptoms);
          setLatitudeValue(response.data.latitude);
          setLongitudeValue(response.data.longitude);
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
          console.log(response);
          setSymptomsList(response.data.request.symptoms);
          setLatitudeValue(response.data.latitude);
          setLongitudeValue(response.data.longitude);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <h4>Current Symptoms</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Symptoms</th>
          </tr>
        </thead>
        <tbody>
          {symptomsList.map((symptom, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{symptom.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="add-btn-div">
        <Button className="submit-btn btn-light">
          <span>Add</span>
        </Button>
      </div>
    </>
  );
}

export default SymptomsTable;
