import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/table";
import axios from "axios";
import Button from "react-bootstrap/Button";

function SymptomsTable() {
  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/visitRequest/currentRequest")
      .then((response) => {
        console.log(response.data.request);
        setSymptomsList(response.data.request.symptoms);
      })
      .catch((err) => {
        console.log(err);
      });
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
