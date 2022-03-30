import React, { useContext } from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";
import { Container, Row, Col } from "react-bootstrap";
import ManageUser from "../components/ManageUser";
import AdminLanding from "../components/AdminLanding";
import "../styles/admin.css";
import { AdminProvider } from "../components/AdminContext";
// import { AdminContext } from "../components/AdminContext";

function Admin() {
  //test
  // const { displayUsers } = useContext(AdminContext);
  // console.log(displayUsers);
  // const [userDisplay, setUserDisplay] = displayUsers;


  return (
    <>
    <div className="admin-page">
      <AdminNav />
      <Container className="admin-container">
        <AdminProvider>
          <Row>
            <Col sm={3}>
              <AdminMenu />
            </Col>
            <Col sm={8}>
                <AdminLanding />
                <ManageUser />
            </Col>
          </Row>
        </AdminProvider>
      </Container>
    </div>
    </>
  );
}

export default Admin;
