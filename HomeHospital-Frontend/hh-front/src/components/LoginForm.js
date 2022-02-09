import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);

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

  useEffect(() => {
    if (validEmail && validPassword) {
      setValidForm(true);
    }
  }, [validEmail, validPassword]);

  return (
    <Container>
      <div className={classes.loginBox}>
        <div className={classes.innerBox}>
          <div>
            <h1 className={classes.header}>Login</h1>
            <label htmlFor="firstName" className="form-label mt-3 text-white">
              Email
            </label>
            <input
              onBlur={validateEmail}
              type="text"
              className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="[A-Za-z- ]+"
              required
              placeholder="yourName@gmail.com"
              pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z]+[\.][a-zA-Z]{2,}$"
              autoFocus
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Please enter a valid Email</div>
          </div>
          <div className={classes.container}>
            <label htmlFor="password" className="form-label mt-3 text-white">
              Password
            </label>
            <input
              onBlur={validatePassword}
              type="password"
              className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={6}
              required
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">
              Password must be minimum of 10 characters
            </div>
          </div>
          <div className="d-grid gap-2 mt-4">
            <Button type="button" disabled={!validForm} variant="warning">
              Login
            </Button>
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
              <Link className={classes.teal} to="">
                Forgot Password
              </Link>
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
  );
}

export default LoginForm;
