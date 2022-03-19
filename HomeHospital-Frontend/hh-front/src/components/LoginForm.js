import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/heartbeat_logo_long.png";
import classes from "./LoginForm.module.css";
import Axios from "axios";
import { HomeHospitalContext } from "./HomeHospitalContext";

function LoginForm() {
  let navigate = useNavigate();

  const { patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleShow = () => setModalShow(true);

  function validateEmail() {
    const pattern = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,}$");
    if (!pattern.test(email)) {
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("email").classList.remove("is-valid");
      setValidEmail(false);
    } else {
      document.getElementById("email").classList.remove("is-invalid");
      document.getElementById("email").classList.add("is-valid");
      setValidEmail(true);
    }
  }

  function validatePassword() {
    if (!password.length > 10) {
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("password").classList.remove("is-valid");
      setvalidPassword(false);
    } else {
      document.getElementById("password").classList.remove("is-invalid");
      document.getElementById("password").classList.add("is-valid");
      setvalidPassword(true);
    }
  }

  const loginUser = () => {
    Axios.post("http://localhost:4000/api/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        // setPatientID(response.data.patientId);
        console.log(response);
        console.log("You have logged in successfully");
        navigate("/home");
      })
      .catch((err) => {
        handleShow();
        console.log("Error:" + err);
      });
  };

  function ErrorModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email or Password is Incorrect.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  useEffect(() => {
    if (validEmail && validPassword) {
      setValidForm(true);
    }
  }, [validEmail, validPassword]);

  return (
    <React.Fragment>
      <ErrorModal show={modalShow} onHide={() => setModalShow(false)} />
      <Container>
        <div className={classes.loginBox}>
          <div className={classes.innerBox}>
            <div>
              <div
                style={{
                  backgroundImage: `url(${logo})`,
                  backgroundSize: "cover",
                  width: "240px",
                  height: "200px",
                  marginLeft: "35px",
                }}
              >
                <h1 className={classes.header}>LOGIN</h1>
              </div>
            </div>
            <div style={{ marginTop: "-25px" }}>
              <label htmlFor="firstName" className="form-label">
                Email
              </label>
              <input
                onBlur={validateEmail}
                type="text"
                className={`form-control shadow-none `}
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="yourName@gmail.com"
                pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z]+[\.][a-zA-Z]{2,}$"
                autoFocus
              />
              <div className="valid-feedback"></div>
              <div className="invalid-feedback">Please enter a valid Email</div>
              <div className={classes.container}>
                <label htmlFor="password" className="form-label mt-3 ">
                  Password
                </label>
                <input
                  onBlur={validatePassword}
                  type="password"
                  className={`form-control bg-transparent  shadow-none `}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength={10}
                  required
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">
                  Password must be minimum of 10 characters
                </div>
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button
                  type="button"
                  disabled={!validForm}
                  variant="warning"
                  onClick={loginUser}
                >
                  Login
                </Button>
              </div>
            </div>
            <Row>
              <Col>
                <Form.Check
                  className={`mt-3 ${classes.smallFont}`}
                  type="switch"
                  id="custom-switch"
                  label="Remember Me"
                />
              </Col>
              <Col className={`ms-5 mt-3 ${classes.smallFont}`}>
                <Link className={classes.teal} to="/forget">
                  Forgot Password
                </Link>
                <div style={{ paddingTop: "5px" }}>
                  <Link className={classes.teal} to="/">
                    Cancel
                  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={`${classes.smallFont}`}>
                <Link to="/register">Register</Link>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default LoginForm;
