import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import HHGoogleMap from "../components/HHGoogleMap";
import PatientVital from "../components/PatientVital";
import PatientInfo from "../components/PatientInfo";
import UserNavBar from "../components/UserNavBar";
import WaitList from "../components/WaitList";
import SymptomsTable from "../components/SymptomsTable";

function Request() {
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
              <div style={{ paddingBottom: "50px" }}>
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
            {/* <Row>
              <Col>
                <PatientVital />
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Request;
