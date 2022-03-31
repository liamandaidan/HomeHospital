import React, { useState } from "react";
import { Button, Label } from "react-bootstrap";
import PatientData from "../components/patientData.json";

export default function PractionerWaitlist({ childToParent }) {
  const [selectHospital, setSelectHospital] = useState([
    "Rockyview",
    "Childerns",
    "Foothills",
  ]);
  const [hospital, setHospital] = useState("none");
  //this will map our selection of hospitals
  const Add = selectHospital.map((Add) => Add);
  /**
   * This will handle the selection of a hospitals use state and set the hospital.
   * TODO -> figure out how to pass in a key value of hospital ID. I am close.
   * @param {*} e event to be passed in
   */
  const handleHospitalChange = (e) => {
    console.clear();
    console.log(selectHospital[e.target.value]);
    setHospital(selectHospital[e.target.value]);
  };

  /**
   * This will be used to render table rows based off of a dummy json file i created
   */
  const DisplayTableRows = PatientData.map((data) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.first}</td>
        <td>{data.last}</td>
        <td>
          <Button
            value={data.id}
            onClick={(e) => childToParent(e.target.value)}
          >
            Select
          </Button>
        </td>
        <td>
          <Button>Check In</Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="table-structure">
      <div className="select-hospital">
        <div class="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={(e) => handleHospitalChange(e)}
          >
            <option selected hidden>Choose one:</option>
            {Add.map((address, key) => (
              <option key={key} value={key}>
                {address}
              </option>
            ))}
          </select>
          <label for="floatingSelect">Select a Hospital</label>
        </div>
      </div>
      <div className="table-data" hidden={!(hospital !== "none")}>
        <table class="table table-hover">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{DisplayTableRows}</tbody>
        </table>
      </div>
    </div>
  );
}