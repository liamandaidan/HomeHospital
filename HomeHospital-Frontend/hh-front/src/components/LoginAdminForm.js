import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/heartbeat_logo_long.png";
import classes from "./LoginForm.module.css";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

axios.defaults.withCredentials = true;
/**
 * Displays a log in form for the administrator
 * @returns a login form where the email and password are validated before proceeding 
 */
function LoginAdminForm() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  /**
   * Shows the modal if set to true
   */
  const handleShow = () => setModalShow(true);
  /**
   * Validates email entered by user
   */
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
  /**
   * Validates password entered by user 
   */
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
  /**
   * Check back end if email and password match and exists, it will 
   * log the user in
   */
  const loginUser = () => {
    axios
      .post("http://localhost:4000/api/loginA", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("You have logged in successfully");
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        handleShow();
      });
  };
  /**
   * Will load patient information
   */
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(true);
        navigate("/admin");
      })
      .catch((err) => {
        setLoggedIn(false);
      });
  }, [loggedIn]);
  /**
   * Display an error modal if the credentials entered do not match 
   * @param props 
   * @returns error modal componenet
   */
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
  /**
   * Validate user email and password, if both valid will set the 
   * form validity to true
   */
  useEffect(() => {
    if (validEmail && validPassword) {
      setValidForm(true);
    }
  }, [validEmail, validPassword]);
  /**
   * Display a loading animation
   */
  if (loggedIn === undefined || loggedIn === null) {
    return (
      <div className={`${classes.spinner} text-center`}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

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
                <h2 className={classes.headerTop}>Admin</h2>
                <h2 className={classes.header}>Login</h2>
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

export default LoginAdminForm;
