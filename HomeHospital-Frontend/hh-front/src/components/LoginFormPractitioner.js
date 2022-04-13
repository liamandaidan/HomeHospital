import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/heartbeat_logo_long.png";
import classes from "./LoginFormPractitioner.module.css";
import axios from "axios";
import { PractitionerContext } from "./PractitionerContext";

axios.defaults.withCredentials = true;

function LoginFormPractitioner() {
  let navigate = useNavigate();

  const { firstName, lastName, roleName } = useContext(PractitionerContext);
  const [firstNameValue, setFirstNameValue] = firstName;
  const [lastNameValue, setLastNameValue] = lastName;
  const [roleNameValue, setRoleNameValue] = roleName;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  const handleShow = () => setModalShow(true);
  /**
   * Here we provide regex for the email before going to backend.
   */
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
  /**
   * Here we validate that the password is legal.
   */
  function validatePassword() {
    if (!password.length > 8 || password.length == 0) {
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
   * This will provide the post request to the server with a users credentials.
   */
  const loginUser = () => {
    axios
      .post("http://localhost:4000/api/loginP", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("You have logged in successfully");
        console.log(response);
        setFirstNameValue(response.data.practitionerDetails.firstName);
        setLastNameValue(response.data.practitionerDetails.lastName);
        setRoleNameValue(response.data.practitionerDetails.role);
        navigate("/practitioner");
      })
      .catch((err) => {
        console.log(err);
        handleShow();
      });
  };
  /**
   * The main feature of this is to provide login utility.
   * This will need to be changed if a practioner account differs from a patient. Right now they are the same.
   */
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       setLoggedIn(true);
  //       navigate("/practitioner");
  //     })
  //     .catch((err) => {
  //       setLoggedIn(false);
  //     });
  // }, [loggedIn]);

  /**
   * This will handle errors
   * @param {*} props
   * @returns
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
   * As long as email and passwords are valid this will allow access to the submission of the form.
   */
  useEffect(() => {
    if (validEmail) {
      setValidForm(true);
    }
  }, [validEmail, validPassword]);

  // if (loggedIn === undefined || loggedIn === null) {
  //   return (
  //     <div className={`${classes.spinner} text-center`}>
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

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
                <h2 className={classes.headerTop}>Practitioner</h2>
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
                  Please enter a valid password
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
              <Col className={` mt-3 ${classes.smallFont}`}>
                {/* <Link to="/register">Register</Link> */}
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
      </Container>
    </React.Fragment>
  );
}

export default LoginFormPractitioner;
