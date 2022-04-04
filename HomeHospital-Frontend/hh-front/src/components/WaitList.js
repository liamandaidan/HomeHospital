import React from "react";
import { Button, Table } from "react-bootstrap";

function WaitList() {
  return (
    <div className="mt-5">
      <h4>Current Waitlist</h4>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Hospital</th>
            <th>QR Code</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>9</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>FootHill</td>
            <td>
              <a href="">link</a>
            </td>
            <td>
              <Button variant="outline-info" className="rounded-pill btn-sm">
                Check-In
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default WaitList;
