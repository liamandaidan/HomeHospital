import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import icon from "../images/heartbeat.png";

function Navigation() {
  return (
    <>
      <Navbar bg="light" variant="light" expand="sm">
        <Container>
          <Navbar.Brand href="#home">HomeHospital</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">New Visit</Nav.Link>
          </Nav>
        </Container>
        <Nav className="justify-content-end user-nav" activeKey="/home">
          <NavDropdown title="Username" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">Edit Profile</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">View Visits</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Settings </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
