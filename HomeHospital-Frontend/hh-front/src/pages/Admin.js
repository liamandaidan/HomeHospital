import React, { useContext } from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";
import { Container, Row, Col } from "react-bootstrap";
import ManageUser from "../components/ManageUser";
import "../styles/admin.css";
import { AdminProvider } from "../components/AdminContext";
// import { AdminContext } from "../components/AdminContext";

function Admin() {

  // const { displayUsers } = useContext(AdminContext);
  // console.log(displayUsers);
  // const [userDisplay, setUserDisplay] = displayUsers;

  return (
    <>
      <AdminNav />
      <Container className="admin-container">
        <AdminProvider>
          <Row>
            <Col sm={3}>
              <AdminMenu />
            </Col>
            <Col sm={8}>
              {/* <div className="manageuser-div">
                <h2>Manage Users</h2> */}
                <ManageUser />
              {/* </div> */}
            </Col>
          </Row>
        </AdminProvider>
      </Container>
    </>
  );
}

export default Admin;
