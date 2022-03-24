import React from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";
import { Container, Row, Col } from "react-bootstrap"; 
import Backup from "../components/BackupRestore";

function Admin() {
  return (
    <>
      <AdminNav />
      <Container>
          <Row>
              <Col sm={3}>
      <AdminMenu />
              </Col>
              <Col sm={8}>
      <Backup />
              </Col>
          </Row>
      </Container>
    </>
  );
}

export default Admin;
