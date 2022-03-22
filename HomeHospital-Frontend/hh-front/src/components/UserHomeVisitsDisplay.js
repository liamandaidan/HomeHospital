import React, { useState, useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "../styles/UserHomepage.css";
import axios from "axios";
import moment from "moment";
import { HomeHospitalContext } from "./HomeHospitalContext";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function UserHomeVisitsDisplay() {
  const navigate = useNavigate();

  moment.locale("en");

  const [visitList, setVisitList] = useState([]);
  const [date, setDate] = useState();

  //get patient ID from context
  const { request_id } = useContext(HomeHospitalContext);
  const [requestID, setRequestID] = request_id;

  //import all visits using patient ID
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/visitRequest/allRequests", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.request);
        setVisitList(response.data.request);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRequest = () => {
    setRequestID("hello I am the request ID!");
    navigate("/user");
  };

  console.log(visitList);

  return (
    <>
      <Container className="container-visits">
        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              responsive
              borderless
              className="visit-table table-fixed"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {visitList.map((visit, index) => (
                  <tr key={index} onClick={handleRequest}>
                    <td>{index + 1}</td>
                    <td>
                      {moment(visit.dateTime).format("dddd, MMMM Do YYYY")}
                    </td>
                    <td>Emergency Room Visit</td>
                    <td>{visit.requestHospitalName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserHomeVisitsDisplay;
