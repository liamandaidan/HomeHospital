import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PractNav from "../components/PractNavBar.jsx";
import "../styles/PractionerStyles.css";
import PractionerWaitlist from "../components/PractionerWaitlist.jsx";
import PractitionerPatientInfo from "../components/PractitionerPatientInfo.js";
import { PractitionerContext } from "../components/PractitionerContext.js";
import { ToastContainer, toast } from "react-toastify";
export default function Practioner() {
  // useContext
  const { _id } = useContext(PractitionerContext);

  //State used to keep track of the current info in focus.
  const [patientData, setPatientData] = _id;
  const [refreshMsg, setRefreshMsg] = useState("null");
  /**
   * This will update our parent class(Practioner) with recent info.
   * @param {*} childData the ID of a patient passed in from child.
   */
  const childToParent = (childData) => {
    //alert("This is id num: "+childData);
    if(childData == "null"){
      notify("User has been checked in.");
    }
    
    setPatientData(childData);
  };

  const refresh = (childData) => {
    setRefreshMsg(childData);
    notify(childData);
  }

  function notify(msg) {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PractNav />
      <Container className="main-container">
        <div className="practionerView-div">
          <Row>
            <Col md="5">
              <div className="leftContent">
                <p className="pd">Patient Details</p>
                <Row>
                  <PractitionerPatientInfo patientDataGiven={patientData} />
                </Row>
                <Row>
                  <p>
                    <a href="/editPatient">Edit patient file</a>
                  </p>
                </Row>
              </div>
            </Col>
            <Col md="7">
              <div className="rightContent">
                <Row>
                  <p className="pd">Current Waitlist</p>
                </Row>
                <Row>
                  <PractionerWaitlist refresh={refresh} childToParent={childToParent} />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
