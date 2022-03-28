import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/admin.css";
import { AdminContext } from "./AdminContext";

function AdminMenu() {

  const { displayUsers, setDisplayUsers } = useContext(AdminContext);

  console.log(displayUsers);

  const displayManageUsers = (e) => {
    setDisplayUsers(true);
  }

  return (
    <>
    <Container>
        <Row>
            <Col>
                <h2>Menu</h2>
                <ListGroup className="admin-menu">
                    <ListGroup.Item disabled >Backup and Restore</ListGroup.Item>
                    <ListGroup.Item onClick={displayManageUsers} >Manage Users</ListGroup.Item>
                    <ListGroup.Item disabled >Reports</ListGroup.Item>
                    <ListGroup.Item disabled >System</ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </Container>
    </>
  ); 
}

export default AdminMenu;
