import React from "react";
import { Button } from "react-bootstrap";
import PatientData from "../components/patientData.json";

export default function PractionerWaitlist({ childToParent }) {
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
          <Button value={data.id} onClick={(e) => childToParent(e.target.value)}>Select</Button>
        </td>
        <td>
          <Button>Check In</Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
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