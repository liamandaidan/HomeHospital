import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import HHGoogleMap from "../components/HHGoogleMap";
import PatientInfo from "../components/PatientInfo";
import UserNavBar from "../components/UserNavBar";
import WaitList from "../components/WaitList";
import SymptomsTable from "../components/SymptomsTable";

/**
 * @name Request Page
 * @summary This page is rendered when a user clicks on the request button
 * the patient will be able to see either their current request or past requests.
 * @author Lance Gee
 * @returns rendered request component to user.
 */
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
              <HHGoogleMap style={{ paddingBottom: "50px" }} />
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
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Request;
