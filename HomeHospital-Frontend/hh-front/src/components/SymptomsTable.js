import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { HomeHospitalContext } from "./HomeHospitalContext";
/**
 * Table of symptoms from the current request or past requests the user
 * has selected from their homepage
 * @return a table with symptoms entered in the current request
 * @author Lance Gee and Robyn Balanag
 */
function SymptomsTable() {
  const { requestId, isCurrentRequest, longitude, latitude } =
    useContext(HomeHospitalContext);
  const [requestIdValue, setRequestIdValue] = requestId;
  const [isCurrent, setIsCurrent] = isCurrentRequest;
  const [longitudeValue, setLongitudeValue] = longitude;
  const [latitudeValue, setLatitudeValue] = latitude;
  const [symptomsList, setSymptomsList] = useState([]);
  /**
   * Retreive current request details from the database and assign list of symptoms
   * to an array to display in the table. If there is no current request, it will send 
   * the request id to retrive previous request details
   */
  useEffect(() => {
    if (isCurrent) {
      axios
        .get("http://localhost:4000/api/visitRequest/currentRequest")
        .then((response) => {
          //console.log(response);
          setSymptomsList(response.data.symptoms);
          setLatitudeValue(response.data.latitude);
          setLongitudeValue(response.data.longitude);
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
      axios
        .get(
          `http://localhost:4000/api/visitRequest/targetRequest/${requestIdValue}`
        )
        .then((response) => {
          //console.log(response);
          setSymptomsList(response.data.request.symptoms);
          setLatitudeValue(response.data.request.latitude);
          setLongitudeValue(response.data.request.longitude);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, []);

  return (
    <>
      {isCurrent && <h4>Current Symptoms</h4>}
      {!isCurrent && <h4>Past Symptoms</h4>}
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
    </>
  );
}

export default SymptomsTable;
