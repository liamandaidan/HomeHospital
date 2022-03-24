import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";

function AdminMenu() {
  return (
    <>
    <Container>
        <Row>
            <Col>
                <h2>Menu</h2>
                <ListGroup className="admin-menu">
                    <ListGroup.Item action onClick="alert('you clicked backup!)">Backup and Restore</ListGroup.Item>
                    <ListGroup.Item action onClick="alert('you clicked users!)">Manage Users</ListGroup.Item>
                    <ListGroup.Item action onClick="alert('you clicked reports!)">Reports</ListGroup.Item>
                    <ListGroup.Item action onClick="alert('you clicked system!)">System</ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </Container>
    </>
  ); 
}

export default AdminMenu;
