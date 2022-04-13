import React, { Component } from "react";
import { Row, Alert, Button } from "react-bootstrap";
import "../styles/forgotpass.css";
import logo1 from "../images/hb1.png";
import logo2 from "../images/hb2.png";
import bg from "../images/bg.png";

export class ForgotPass extends Component {
  
  /**
   * This class will be used return the alert notifying user to check their email.
   * @returns alert component
   */
  
  render() {
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
            <Row>
              <Alert varient="success">
                <Alert.Heading>Forgot Password</Alert.Heading>
                <p>
                  If the provided email exists an email will be sent to the
                  address.
                </p>
                <hr />
                <p>
                  Please follow the instructions within the email provided to
                  recover your password.
                </p>
              </Alert>
            </Row>
              <Button className="signup" href="/">Back To Home Page</Button>
          </div>

          <div className="logo1">
            <img src={logo1} className="logo1" alt="Generic logo"></img>
          </div>
          <div className="right">
            <div className="title">
              <p>Home Hospital</p>
            </div>
            <div className="logo2">
              <img
                src={logo2}
                className="logo2"
                alt="Generic img for logo"
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPass;
