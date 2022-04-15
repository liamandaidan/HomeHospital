import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import classes from "./UserNavBar.module.css";
import avatar from "../images/img_avatar.png";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import axios from "axios";

/**
 * Create a navigation bar for the administrator page 
 * @returns navigation bar with administrator options
 */
function AdminNav() {

  const { menuSelection } = useContext(AdminContext);
  const [menuChoice, setMenuChoice] = menuSelection;
  let navigate = useNavigate();
  /**
   * Deletes cookies when the user logs out 
   */
  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  /**
   * When the user clicks on the HomehospitalAdministrator title on the navigation 
   * bar, it will take them back to the admin landing view
   */
  const handleAdminLanding = () => {
    setMenuChoice("");
  }
  /**
   * Will log out the user and delete cookies
   */
  const handleLogout = () => {
    axios
    .post("http://localhost:4000/api/logout")
    .then((response) => {
      deleteAllCookies();
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      navigate("/");
    });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className={classes.title} onClick={handleAdminLanding}>
          HomeHospital<span>Administrator</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <div className="d-flex">
            <DropdownButton
              variant="btn-outline-light"
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
              }
              id="input-group-dropdown-2"
              align="end"
              className="me-5"
            >
              <Dropdown.Item href="#">Profile</Dropdown.Item>
              <Dropdown.Item href="#">Notifications</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                href="#"
                className="text-danger"
                onClick={handleLogout}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
