import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "../styles/forgotpass.css";
import logo1 from "../images/hb1.png";
import logo2 from "../images/hb2.png";
import { useNavigate } from "react-router-dom";
import bg from "../images/bg.png";

export class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      btn: "",
    };
  }
  /*
  This function will handle the email on change
  */
  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let navigate = useNavigate();
    if (this.state.btn.localeCompare("submit")) {
      alert(`${this.state.btn}`);
      navigate("/*");
    } else {
      alert("hello");
    }
    navigate("/login")
  };
  handleBack = (event) => {
    this.setState({
      btn: event.target.value,
    });
  };

  handleSub = (event) => {
    this.setState({
      btn: event.target.value,
    });
  };

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
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Form.Label className="fp">Forgot Password?</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    type="email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                </Row>
              </Form.Group>
              <Button
                className="col-xs-3"
                variant="secondary"
                type="back"
                onClick={this.handleBack}
                value={"back"}
              >
                Back
              </Button>
              &nbsp;
              <Button
                className="btnSpace"
                variant="primary"
                type="submit"
                onClick={this.handleSub}
                value={"submit"}
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
