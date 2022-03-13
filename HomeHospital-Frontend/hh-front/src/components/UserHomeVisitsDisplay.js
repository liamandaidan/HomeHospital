import React, { useState, useContext, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import axios from "axios";

import { HomeHospitalContext } from "./HomeHospitalContext";

function UserHomeVisitsDisplay() {

    const [visitList, setVisitList] = useState([]);

    //get patient ID from context
    const { patient_id } = useContext(HomeHospitalContext);
    const [patientID, setPatientID] = patient_id;

    //import all visits using patient ID 
    useEffect(() => {
        axios.get("http://localhost:4000/api/visitRequest/allRequests", {
            patientId: patientID,
          })
          .then((response) => {
            setVisitList(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

  return (
    <>
      <Container className="container-visits">
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {visitList.map((visit, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{visit.dateTime}</td>
                    <td>Emergency Room Visit</td>
                    <td>{visit.requestHospitalName}</td>
                </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomeVisitsDisplay;
