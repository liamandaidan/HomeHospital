import React, { useEffect } from "react";
import Table from "react-bootstrap/table";
import axios from "axios";

function SymptomsTable() {
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/visitRequest/allRequests", {
        patientID: "62282b4e396f393a00115f5d",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Symptoms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>Cough</th>
          </tr>
          <tr>
            <th>2</th>
            <th>Fever</th>
          </tr>
          <tr>
            <th>3</th>
            <th>Chills</th>
          </tr>
        </tbody>
      </Table>
      <div>
        <Button
          className="submit-btn btn-light"
          onClick={alert("added a symptom!")}
        >
          <span>Submit Symptoms</span>
        </Button>
      </div>
    </>
  );
}

export default SymptomsTable;
