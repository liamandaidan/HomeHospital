import React, { useState } from "react";
import { Button, Label } from "react-bootstrap";
import PatientData from "../components/patientData.json";

export default function PractionerWaitlist({ childToParent }) {
  const [selectHospital, setSelectHospital] = useState([
    "Rockyview",
    "Childerns",
    "Foothills",
  ]);
  const handleHospitalChange = (e) => {
   console.log(setSelectHospital(e.target.value));
  };

  const AddSelection = selectHospital.map((AddSelection) => AddSelection);
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
            {AddSelection.map((address, key) => (
              <option key={key} value={key}>
                {address}
              </option>
            ))}
          </select>
          <label for="floatingSelect">Select a Hospital</label>
        </div>
      </div>
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
  );
}
