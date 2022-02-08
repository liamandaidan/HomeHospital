import React from "react";
import { Container } from "react-bootstrap";

import classes from "./LoginForm.module.css";

function LoginForm() {
  return (
    <Container>
      <div className={classes.loginBox}>
        <h1 className={classes.header}>Login</h1>
        <label htmlFor="firstName" className="form-label mt-3 text-white">
          Email
        </label>
        {/* <input
          type="text"
          className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
          id="clientName"
          name="clientName"
          value={}
          onChange={(e) => setNameValue(e.target.value)}
          pattern="[A-Za-z- ]+"
          required
          placeholder="Enter Your Name"
          autoFocus
        /> */}
      </div>
    </Container>
  );
}

export default LoginForm;
