import React from "react";
import { Container } from "react-bootstrap";
import "./forgotpass.css";
import logo1 from "./img/hb1.png";
import logo2 from "./img/hb2.png";
export default function ForgotPass() {
  return (
    <Container>
      <div className="bgdiv">
        <div className="content">
          <div className="med"/>
          <div className="logo1">
            <img src={logo1} className="logo1"></img>
          </div>
          <div className="right">
            <div className="logo2">
              <img src={logo2} className="logo2"></img>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
