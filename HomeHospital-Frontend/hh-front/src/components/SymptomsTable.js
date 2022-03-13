import React, { useEffect, useContext, useState } from "react";
import Table from "react-bootstrap/table";
import axios from "axios";
import { HomeHospitalContext } from "./HomeHospitalContext";
import Button from "react-bootstrap/Button"


function SymptomsTable() {

  const [symptomsList, setSymptomsList] = useState([]);

  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;

  console.log("this is the patient id: " + patientID);

  useEffect(() => {
    axios.get("http://localhost:4000/api/visitRequest/currentRequest", {
        patientId: patientID,
      })
      .then((response) => {
        setSymptomsList(response.symptoms);
        console.log(response.symptoms);
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
         {symptomsList.map((symptom, index) =>
         <tr key={index}>
           <td>{index + 1}</td>
           <td>{symptom.description}</td>
         </tr>
         )}
        </tbody>
      </Table>
      <div>
        <Button
          className="submit-btn btn-light"
        >
          <span>Add</span>
        </Button>
      </div>
    </>
  );
}

export default SymptomsTable;
