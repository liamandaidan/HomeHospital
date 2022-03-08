import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import bg from "../images/bg.png";
import "../styles/forgotpass.css";
import logo1 from "../images/hb1.png";
import logo2 from "../images/hb2.png";
import Axios from "axios";
export default function ResetForgotPass() {
  //create some hooks and nav
  let navigate = useNavigate();
  let url = window.location.href;
  let [val1, val2] = url.split("?uemail=")[1].split("&tokenstring=");
  //password var
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  //if password is valid
  const [validPassword, setValidPassword] = useState(false);

  // function findInputs() {
  //   let url = window.location.href;
  //   let [val1, val2] = url.split("?uemail=")[1].split("&tokenstring=");
  //   console.log(val1+" "+val2);
  //   //alert(val1 + " " + val2);
  // }

  /**
   * This function will serve to sanitize the password data, and compare the two inputs
   */
  function validatePassword() {
    //pass must be a min length of 5
    if (password === verifyPassword && password.length > 4) {
      document.getElementById("password").classList.remove("is-invalid");
      document.getElementById("password").classList.add("is-valid");
      document.getElementById("passwordVer").classList.remove("is-invalid");
      document.getElementById("passwordVer").classList.add("is-valid");
      setValidPassword(true);
    } else {
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("password").classList.remove("is-valid");
      document.getElementById("passwordVer").classList.add("is-invalid");
      document.getElementById("passwordVer").classList.remove("is-valid");
      setValidPassword(false);
    }
  }
  /**
   * This will submit on click. Assuming that validation has gone through.
   */
  function submitFunc() {
    Axios.post("http://localhost:4000/api/forget", {
      email: val1,
      token: val2,
      newPass: password,
      newPassConfirm: verifyPassword,
    })
      .then((response) => {
        console.log("Sent a password request through");
        //redirect to the alert page
        //navigate("/fa");
      })
      .catch((err) => {
        //incase some unknown error occurs
        alert("Error! + " + err);
      });
  }

  return (
    <div
      className="bgdiv"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        alt: "generic background",
      }}
    >
      <div className="content">
        <div className="med" />
        <div className="leftBtm">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row>
                <Form.Label className="fp">Reset Password</Form.Label>
              </Row>
              <Row>
                <Form.Label className="labels">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  onBlur={validatePassword}
                  required
                  autoFocus
                />
                <Form.Label className="labels">Re-type Password</Form.Label>
                <Form.Control
                  type="password"
                  id="passwordVer"
                  value={verifyPassword}
                  onChange={(event) => setVerifyPassword(event.target.value)}
                  placeholder="Password"
                  onBlur={validatePassword}
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">
                  Please ensure passwords match and meet password criteria.
                </div>
              </Row>
            </Form.Group>

            {/* <Alert varient="" hidden={validPassword}>
                <Alert.Heading>Forgot Password</Alert.Heading>
                <p>
                  If the provided email exists an email will be sent to the
                  address.
                </p>
              </Alert> */}

            <Button
              className="btnSpace"
              variant="primary"
              type="button"
              disabled={!validPassword}
              onClick={submitFunc}
            >
              Submit
            </Button>
          </Form>
        </div>

        <div className="logo1">
          <img src={logo1} className="logo1" alt="Generic logo"></img>
        </div>
        <div className="right">
          <div className="title">
            <p>Home Hospital</p>
          </div>
          <div className="logo2">
            <img src={logo2} className="logo2" alt="Generic img for logo"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
