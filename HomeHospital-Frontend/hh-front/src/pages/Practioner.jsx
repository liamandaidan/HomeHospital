import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PractNav from "../components/PractNavBar.jsx";
import "../styles/PractionerStyles.css";
import PractionerWaitlist from "../components/PractionerWaitlist.jsx";
import PractitionerPatientInfo from "../components/PractitionerPatientInfo.js";
import { PractitionerContext } from "../components/PractitionerContext.js";
import { ToastContainer, toast } from "react-toastify";
/**
 * @name practitioner 
 * @summary This function is used to represent the page belonging to practitioner.
 * @author Ridge Banez, Liam McLaughlin
 * @returns practioner page
 */
export default function Practioner() {
  // useContext
  const { _id } = useContext(PractitionerContext);

  //State used to keep track of the current info in focus.
  const [patientData, setPatientData] = _id;
  const [refreshMsg, setRefreshMsg] = useState("null");
  /**
   * @function childToParent This will update our parent class(Practioner) with recent info.
   * @param {string} childData the ID of a patient passed in from child.
   */
  const childToParent = (childData) => {
    //When a patient is checked in, childData is set to null. We can use this
    //to display our toast.
    if (childData === "null") {
      notify("User has been checked in.");
    }

    setPatientData(childData);
  };
  /**
   * @function refresh This function will update refresh hook passed in from another component. When it does so it will send a notify toast letting the user know that the table was just updated with the newest result.
   * @param {string} childData the message to be passed in.
   */
  const refresh = (childData) => {
    setRefreshMsg(childData);
    notify(childData);
  }

  const cancelToast = (childData) => {
    setRefreshMsg(childData);
    cancel(childData);
  }

  function notify(msg) {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  function cancel(msg) {
    toast.warn(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  /**
   * @summary Html components returned to user.
   */
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
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
              </div>
            </Col>
            <Col md="7">
              <div className="rightContent">
                <Row>
                  <p className="pd">Current Waitlist</p>
                </Row>
                <Row>
                  <PractionerWaitlist refresh={refresh} childToParent={childToParent} cancelToast={cancelToast}/>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
