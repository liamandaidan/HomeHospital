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
import { HomeHospitalContext } from "./HomeHospitalContext";
import axios from "axios";

function UserNavBar() {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        patientId: patientID,
      })
      .then((response) => {
        setFirstName(response.data.data.user.firstName);
        setLastName(response.data.data.user.lastName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function requestPage() {
    navigate("/hospitals");
  }

  const handleHome = () => {
    if ((patientID !== null) | (patientID !== undefined)) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const onHospital = () => {
    navigate("/hospitals");
  };

  const handleOnLanding = () => {
    navigate("/");
  };

  const handleLogout = () => {
    setPatientID(null);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className={classes.title} onClick={handleOnLanding}>
          HomeHospital<span>Patient</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={handleHome} className="ms-5">
              Home
            </Nav.Link>
            <Nav.Link onClick={requestPage}>Requests</Nav.Link>
            {/* <Nav.Link href="#action2">Symptoms</Nav.Link> */}
          </Nav>
          <div className="d-flex">
            <img src={avatar} alt="avatar" className={classes.avatar} />
            <h6 className="me-3 mt-2 ps-2">{firstName} {lastName}</h6>
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
              <Dropdown.Item href="#" onClick={onHospital}>
                Hospitals
              </Dropdown.Item>
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

export default UserNavBar;
