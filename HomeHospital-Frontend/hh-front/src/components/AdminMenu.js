import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/admin.css";
import { AdminContext } from "./AdminContext";

/**
 * Creates the menu displayed on the administrator page 
 * @returns the admin menu - where the user can select what function they want to render
 * @author Robyn Balanag
 */
function AdminMenu() {

  const { menuSelection , closeWindows } = useContext(AdminContext);

  const [menuChoice, setMenuChoice] = menuSelection;
  const [close, setClose] = closeWindows;

  const showManage = () => {
      setMenuChoice("manage")
      setClose(true);
  
  }


  return (
    <>
    <Container>
        <Row>
            <Col>
                <h2>Menu</h2>
                <ListGroup className="admin-menu">
                    <ListGroup.Item disabled >Backup and Restore</ListGroup.Item>
                    <ListGroup.Item className="adminMenu-item" onClick={showManage}>Manage Users</ListGroup.Item>
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
