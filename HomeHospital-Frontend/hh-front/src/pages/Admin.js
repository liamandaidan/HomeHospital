import React from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";
import { Container, Row, Col } from "react-bootstrap";
import ManageUser from "../components/ManageUser";
import AdminLanding from "../components/AdminLanding";
import "../styles/admin.css";
import { AdminProvider } from "../components/AdminContext";
/**
 * Lading page for the administrator
 * @returns admin component
 * @author Robyn Balanag
 */
function Admin() {
  return (
    <>
      <div className="admin-page">
        <AdminProvider>
          <AdminNav />
          <Container className="admin-container">
            <Row>
              <Col sm={3}>
                <AdminMenu />
              </Col>
              <Col sm={8}>
                <AdminLanding />
                <ManageUser />
              </Col>
            </Row>
          </Container>
        </AdminProvider>
      </div>
    </>
  );
}

export default Admin;
