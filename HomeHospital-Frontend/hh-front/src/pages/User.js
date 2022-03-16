import React, { useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import HHGoogleMap from "../components/HHGoogleMap";
import PatientVital from "../components/PatientVital";
import PatientInfo from "../components/PatientInfo";
import UserNavBar from "../components/UserNavBar";
import classes from "./User.module.css";
import WaitList from "../components/WaitList";
import SymptomsTable from "../components/SymptomsTable";
import { HomeHospitalContext } from "../components/HomeHospitalContext";

function User() {
  const { patient_id, request_id } = useContext(HomeHospitalContext);
  const [patientID] = patient_id;
  const [requestID] = request_id;

  console.log(patientID);
  console.log(requestID);

  return (
    <React.Fragment>
      <UserNavBar />
      <Container>
        <Row>
          <Col>
            <Row>
              <Col className="mt-5">
                <PatientInfo />
              </Col>
            </Row>
            <Row>
              <div>
                <HHGoogleMap />
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <WaitList />
              </Col>
            </Row>
            <Col>
              <SymptomsTable />
            </Col>
            <Row>
              <Col>
                <PatientVital />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default User;
