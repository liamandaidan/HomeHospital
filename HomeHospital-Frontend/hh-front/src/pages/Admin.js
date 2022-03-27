import React from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";
import { Container, Row, Col } from "react-bootstrap";
import ManageUser from "../components/ManageUser";
import "../styles/admin.css";

function Admin() {
  return (
    <>
      <AdminNav />
      <Container className="admin-container">
        <Row>
          <Col sm={3}>
            <AdminMenu />
          </Col>
          <Col sm={8}>
            <div className="manageuser-div">
            <h2>Manage Users</h2>
              <ManageUser />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;
