import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/admin.css";
import { AdminContext } from "./AdminContext";

function AdminMenu() {

  const { menuSelection } = useContext(AdminContext);

  const [menuChoice, setMenuChoice] = menuSelection;


  return (
    <>
    <Container>
        <Row>
            <Col>
                <h2>Menu</h2>
                <ListGroup className="admin-menu">
                    <ListGroup.Item disabled >Backup and Restore</ListGroup.Item>
                    <ListGroup.Item className="adminMenu-item" onClick={(e) => setMenuChoice("manage") } >Manage Users</ListGroup.Item>
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
