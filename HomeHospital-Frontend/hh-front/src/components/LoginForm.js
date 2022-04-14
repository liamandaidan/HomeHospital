import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/heartbeat_logo_long.png";
import classes from "./LoginForm.module.css";
import axios from "axios";

axios.defaults.withCredentials = true;
/**
 * @name LoginForm Component
 * @summary The LoginForm component authenticates the login credentials
 * validates the email address and throws any errors.
 * @author Lance Gee
 */
function LoginForm() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  const handleShow = () => setModalShow(true);

  function validateEmail() {
    const pattern = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
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

  const loginUser = () => {
    axios
      .post("http://localhost:4000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log("You have logged in successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        handleShow();
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        setLoggedIn(false);
      });
  }, [loggedIn]);

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
    if (validEmail) {
      setValidForm(true);
    }
  }, [validEmail]);

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
                <h2 className={classes.headerTop}>Patient</h2>
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
            <div className="footer">
              <Row>
                <Col className={` mt-3 ${classes.smallFont}`}>
                  <Link to="/register">Register</Link>
                </Col>
                <Col className={`mt-3 ${classes.smallFont}`}>
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
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default LoginForm;
