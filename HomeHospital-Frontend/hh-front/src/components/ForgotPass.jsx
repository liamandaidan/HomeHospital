import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import "./forgotpass.css";
import logo1 from "./img/hb1.png";
import logo2 from "./img/hb2.png";
import Axios from "axios";
export default function ForgotPass() {
  /*
  Here we will create the redirection 
  */
  const handleSubmit = (e) => {
    Axios.post("http://localhost:3001/test", {
    
    }).then((response) => {
      alert("lets go");
    });
  };

  const handleBack = () => {};

  return (
    <Container>
      <div className="bgdiv">
        <div className="content">
          <div className="med" />

          <div className="leftBtm">
            <Row>
              <Col>{/* <p className="fp">Forgot Password?</p> */}</Col>
            </Row>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Form.Label className="fp">Forgot Password?</Form.Label>
                </Row>
                <Row>
                  <Form.Control type="email" placeholder="Enter email" />
                </Row>
              </Form.Group>
              <Button
                className="col-xs-3"
                variant="secondary"
                type="back"
                onSubmit={handleBack}
              >
                Back
              </Button>
              &nbsp;
              <Button
                className="btnSpace"
                variant="primary"
                type="submit"
                onSubmit={handleSubmit}
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
    </Container>
  );
}
