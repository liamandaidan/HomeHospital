import React from 'react';
import UserNavBar from "../components/UserNavBar";
import hb1 from "../images/mainbg.png"
import profile from "../images/profilepicture.png"
import "../styles/UserHomepage.css"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"



function UserHomepage() {
  return (
      <>
      <UserNavBar />
      <Container>
        <Row>
            <Col>
                <img src={hb1} alt="heartbeat-logo-1" className="heartbeat-logo-1" />
                <img src={profile} alt="profile photo" className="user-profile-photo" />
            </Col>
        </Row>

      </Container>
      </>
  )
}

export default UserHomepage