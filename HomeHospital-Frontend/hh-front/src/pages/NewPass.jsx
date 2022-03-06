import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import "../styles/forgotpass.css";
import logo1 from "../images/hb1.png";
import logo2 from "../images/hb2.png";
import { useNavigate } from "react-router-dom";
import bg from "../images/bg.png";

export default function NewPass() {
  let navigate = useNavigate();
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
      }}
    >
      <div className="content">
        <div className="med" />

        <div className="leftBtm">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row>
                <Form.Label className="fp">New Password</Form.Label>
              </Row>
              <Row>
                <Form.Control type="Password" placeholder="Enter password" />
              </Row>
            </Form.Group>
            <Button
              className="col-xs-3"
              variant="secondary"
              type="back"
              onClick={() => {
                navigate("/login");
              }}
            >
              Back
            </Button>
            &nbsp;
            <Button
              className="btnSpace"
              variant="primary"
              type="submit"
              onClick={() => {
                navigate("/*");
              }}
            >
              Submit
            </Button>
          </Form>
        </div>

        <div className="logo1">
          <img src={logo1} className="logo1"></img>
        </div>
        <div className="right">
          <div className="title">
            <p>Home Hospital</p>
          </div>
          <div className="logo2">
            <img src={logo2} className="logo2"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
