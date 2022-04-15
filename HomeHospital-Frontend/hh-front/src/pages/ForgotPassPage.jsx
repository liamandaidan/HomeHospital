import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import bg from "../images/bg.png";
import "../styles/forgotpass.css";
import logo1 from "../images/hb1.png";
import logo2 from "../images/hb2.png";
import Axios from "axios";
/**
 * @name ForgotPassPage
 * @summary This function will be responsible for handling html and methods used for forgot password page.
 * @author Liam McLaughlin
 * @returns rendered forgot password page to user.
 */
export default function ForgotPassPage() {
  //create some hooks and nav
  let navigate = useNavigate();
  //email var
  const [email, setEmail] = useState("");
  //if email is valid
  const [validEmail, setValidEmail] = useState(false);

  /**
   * @function backFunc On Click this function will nav the user back to the login page.
   */
  function backFunc() {
    navigate("/login");
  }
  /**
   * @function validateEmail This function will provide validation of email to ensure that data is correct.
   * The html also validates, but this is safest practice!
   */
  function validateEmail() {
    const pattern = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+).*|[[\t -Z^-~]*])"
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
   * @function submitFunc This will submit on click. Assuming that validation has gone through.
   */
  function submitFunc() {
    Axios.post("http://localhost:4000/api/forget", {
      email: email,
    })
      .then((response) => {
        //console.log("Sent a email request through");
        //redirect to the alert page
        navigate("/fa");
      })
      .catch((err) => {
        //incase some unknown error occurs
        //console.log("Error! + " + err);
      });
    navigate("/fa");
  }
  /**
   * Returns html to parent component.
   */
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
            <Form.Group className="mb-3" >
              <Row>
                <Form.Label className="fp">Forgot Password?</Form.Label>
              </Row>
              <Row>
                <Form.Control
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="yourName@gmail.com"
                  onBlur={validateEmail}
                  required
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">
                  Please enter a valid Email.
                </div>
              </Row>
            </Form.Group>
            <Button
              className="col-xs-3"
              variant="secondary"
              type="back"
              onClick={backFunc}
            >
              Back
            </Button>
            &nbsp;
            <Button
              className="btnSpace"
              variant="primary"
              type="button"
              disabled={!validEmail}
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
